# Medical Image Diagnosis Assistant

AI-powered chest X-ray analysis system combining CNN classification, Grad-CAM explainability, and RAG-based LLM diagnostic report generation.

## Problem

Radiologists face high patient volumes and diagnostic fatigue, particularly for conditions like pneumonia where early detection is critical. This project builds an assistive tool that flags high-risk chest X-rays, visually explains *why* the model made its prediction (via Grad-CAM heatmaps), and generates a structured, LLM-written diagnostic summary grounded in retrieved medical context — reducing the risk of a black-box "just trust the model" output.

## Demo

- **Frontend:** https://medical-diagnosis-assistant-gilt.vercel.app
- **Backend API docs:** https://abhishektu-medical-diagnosis-backend.hf.space/docs
- **Model weights:** https://huggingface.co/abhishektu/chest-xray-resnet50

<img width="1901" height="870" alt="Screenshot 2026-09-08 105821" src="https://github.com/user-attachments/assets/67434b9b-05c0-4962-8fba-aefb6968817d" />
<img width="1897" height="867" alt="08-09-2026(1)" src="https://github.com/user-attachments/assets/8df492d5-66dd-4de6-a882-4f175c6fe95d" />
<img width="1897" height="867" alt="08-09-2026(2)" src="https://github.com/user-attachments/assets/1f026f5d-93cf-4d70-ac17-9001a44a50ce" />


## Try It Yourself

Sample X-rays included for quick testing:
- [Normal chest X-ray](samplesnormal.jpeg)
- [Pneumonia chest X-ray](samplespneumonia.jpeg)

Download and upload either to the [live demo](https://medical-diagnosis-assistant-gilt.vercel.app/) to see the model + Grad-CAM output.

## Architecture

```
┌─────────────┐      ┌──────────────────┐      ┌───────────────────┐
│  React UI   │─────▶│  FastAPI Backend  │─────▶│  ResNet50 + CNN    │
│ (Vite/Vercel)│      │  (HF Spaces)      │      │  Grad-CAM overlay  │
└─────────────┘      └──────────────────┘      └───────────────────┘
                              │
                              ▼
                    ┌──────────────────────┐
                    │  RAG Pipeline         │
                    │  LangChain + FAISS    │
                    │  Groq/Llama3 LLM      │
                    └──────────────────────┘
                              │
                              ▼
                   Structured diagnostic report
```

## Dataset

<!-- Fill in: e.g. NIH ChestX-ray14, Kaggle Chest X-Ray Pneumonia dataset — name, size, split -->
Trained on the Kermany Chest X-Ray dataset, containing 
5,856 images across 2 classes (Normal and Pneumonia), 
split 89% train / 11% test.

## Tech Stack

| Layer | Tools |
|---|---|
| Model | PyTorch, ResNet50 (fine-tuned), Grad-CAM |
| RAG | LangChain, FAISS, Groq/Llama3 |
| Backend | FastAPI |
| Frontend | React, Vite |
| Experiment tracking | MLflow |
| Infra | Docker, docker-compose |

## Results

| Metric | Value |
|---|---|
| Validation Accuracy | 85.9% |
| AUC-ROC | 0.94 |
| Pneumonia Recall | 0.99 |

High recall was prioritized deliberately — in a screening context, missing a true pneumonia case (false negative) is far costlier than a false alarm.

## Features

- Chest X-ray upload and classification via fine-tuned ResNet50
- Grad-CAM heatmap overlay for visual model explainability
- RAG-based diagnostic report generation grounded in retrieved medical reference text
- MLflow experiment tracking for model iterations
- Fully containerized with Docker Compose for one-command local setup

## Quick Start

```bash
git clone https://github.com/ABHISHEKTU/medical-diagnosis-assistant
cd medical-diagnosis-assistant
docker-compose up --build
```

- Frontend: http://localhost:80
- Backend: http://localhost:8000/docs

## Project Structure

```
medical-diagnosis-assistant/
├── backend/
│   ├── app/main.py       # FastAPI + CNN + Grad-CAM
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/App.jsx       # React UI
│   └── Dockerfile
├── notebooks/            # Model development notebooks
├── docker-compose.yml
└── README.md
```

## Limitations & Future Work

- Validation accuracy (85.9%) trained on a limited dataset; broader clinical validation needed before any real-world use
- Currently single-condition focus (pneumonia); multi-label classification for other thoracic conditions is a natural extension
- No authentication/patient-data handling layer — not HIPAA-compliant as-is, by design (research/demo project only)
- Planned: expand RAG knowledge base with more clinical literature, add confidence calibration

## License

This project is licensed under the [MIT License](LICENSE) — free to use, modify, and learn from.

**Disclaimer:** This is a research/portfolio project, not a certified medical device. Not intended for clinical diagnostic use.
