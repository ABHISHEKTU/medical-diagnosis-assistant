from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image
import numpy as np
import base64
import io
import cv2

app = FastAPI(title="Medical Diagnosis Assistant")

# CORS — allows React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model on startup
device = torch.device('cpu')
device = torch.device('cpu')
model = models.resnet50(weights=None)
model.fc = nn.Linear(2048, 2)

# Load weights if available
import os
model_path = 'models/chest_xray_resnet50.pth'
if os.path.exists(model_path):
    model.load_state_dict(torch.load(model_path, map_location=device))
    print("Model weights loaded!")
else:
    print("Warning: No model weights found - using random weights")

model.eval()
model.eval()

CLASSES = ["NORMAL", "PNEUMONIA"]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

def generate_gradcam(model, image_tensor, target_class):
    gradients = []
    activations = []

    def forward_hook(module, input, output):
        activations.append(output)

    def backward_hook(module, grad_input, grad_output):
        gradients.append(grad_output[0])

    handle_f = model.layer4.register_forward_hook(forward_hook)
    handle_b = model.layer4.register_full_backward_hook(backward_hook)

    output = model(image_tensor)
    model.zero_grad()
    output[0][target_class].backward()

    handle_f.remove()
    handle_b.remove()

    grads = gradients[0]
    acts = activations[0]
    weights = grads.mean(dim=[2, 3], keepdim=True)
    cam = (weights * acts).sum(dim=1, keepdim=True)
    cam = F.relu(cam)
    cam = cam - cam.min()
    cam = cam / (cam.max() + 1e-8)
    cam = F.interpolate(cam, size=(224, 224), mode='bilinear', align_corners=False)
    return cam.squeeze().detach().cpu().numpy()

def numpy_to_base64(img_array):
    img_uint8 = (img_array * 255).astype(np.uint8)
    img_pil = Image.fromarray(img_uint8)
    buffer = io.BytesIO()
    img_pil.save(buffer, format='PNG')
    return base64.b64encode(buffer.getvalue()).decode()

@app.get("/")
def root():
    return {"message": "Medical Diagnosis Assistant API running"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    # Read image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')
    
    # Preprocess
    image_tensor = transform(image).unsqueeze(0)
    
    # Predict
    with torch.no_grad():
        output = model(image_tensor)
        probs = torch.softmax(output, dim=1)[0]
        pred_class = output.argmax(1).item()
        confidence = probs[pred_class].item()
    
    pred_label = CLASSES[pred_class]
    
    # Grad-CAM
    cam = generate_gradcam(model, image_tensor, pred_class)
    
    # Prepare images for response
    orig_array = np.array(image.resize((224, 224))) / 255.0
    heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB) / 255.0
    overlay = np.clip(0.5 * orig_array + 0.5 * heatmap, 0, 1)
    
    return JSONResponse({
        "prediction": pred_label,
        "confidence": round(confidence * 100, 2),
        "original": numpy_to_base64(orig_array),
        "heatmap": numpy_to_base64(heatmap),
        "overlay": numpy_to_base64(overlay),
    })