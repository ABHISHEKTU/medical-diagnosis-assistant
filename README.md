# Medical Image Diagnosis Assistant

AI-powered chest X-ray analysis system combining CNN classification, Grad-CAM explainability, and RAG-based LLM diagnostic report generation.

## Problem

Radiologists face high patient volumes and diagnostic fatigue, particularly for conditions like pneumonia where early detection is critical. This project builds an assistive tool that flags high-risk chest X-rays, visually explains *why* the model made its prediction (via Grad-CAM heatmaps), and generates a structured, LLM-written diagnostic summary grounded in retrieved medical context — reducing the risk of a black-box "just trust the model" output.

## Demo

- **Frontend:** https://medical-diagnosis-assistant-gilt.vercel.app
- **Backend API docs:** https://abhishektu-medical-diagnosis-backend.hf.space/docs
- **Model weights:** https://huggingface.co/abhishektu/chest-xray-resnet50

<!-- Add 1-2 screenshots or a short GIF here showing: (1) X-ray upload, (2) Grad-CAM heatmap output, (3) generated report -->

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
Trained on **[dataset name]**, containing **[N] images** across **[classes]**, split **[train/val/test ratio]**.

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

<!-- Add a LICENSE file (MIT is a common default) and badge here -->

---

**Disclaimer:** This is a research/portfolio project, not a certified medical device. Not intended for clinical diagnostic use.
