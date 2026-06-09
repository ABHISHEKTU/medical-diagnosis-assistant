# Medical Image Diagnosis Assistant

AI-powered chest X-ray analysis using CNN, Grad-CAM explainability, and LLM-generated diagnostic reports.

## 🚀 Live Demo
- **Frontend:** https://medical-diagnosis-assistant-gilt.vercel.app
- **Backend API:** https://abhishektu-medical-diagnosis-backend.hf.space/docs
- **Model:** https://huggingface.co/abhishektu/chest-xray-resnet50

## Tech Stack
- PyTorch + ResNet50 (fine-tuned)
- Grad-CAM explainability
- LangChain + FAISS (RAG pipeline)
- Groq/Llama3 LLM
- FastAPI backend
- React + Vite frontend
- MLflow experiment tracking
- Docker + docker-compose

## Results
- Validation Accuracy: 85.9%
- AUC-ROC: 0.94
- Pneumonia Recall: 0.99 (catches 99% of sick patients)

## Quick Start
\\\ash
git clone https://github.com/ABHISHEKTU/medical-diagnosis-assistant
cd medical-diagnosis-assistant
docker-compose up --build
\\\
Frontend: http://localhost:80
Backend: http://localhost:8000/docs

## Project Structure
\\\
medical-diagnosis-assistant/
+-- backend/
�   +-- app/main.py       # FastAPI + CNN + Grad-CAM
�   +-- Dockerfile
�   +-- requirements.txt
+-- frontend/
�   +-- src/App.jsx       # React UI
�   +-- Dockerfile
+-- notebooks/
�   +-- day2_pytorch_basics.ipynb
�   +-- day3_model.ipynb
�   +-- week2_rag.ipynb
�   +-- week4_mlflow.py
+-- docker-compose.yml
+-- README.md
\\\

## Status
- [x] Week 1: CNN + PyTorch + ResNet50 fine-tuning
- [x] Week 2: Grad-CAM explainability + RAG pipeline
- [x] Week 3: FastAPI + React frontend (hospital UI)
- [x] Week 4: MLflow experiment tracking + Docker
