import mlflow

mlflow.set_experiment("chest-xray-pneumonia")

# Log our best training run results
runs = [
    {"run": 1, "epochs": 5, "val_acc": 0.841, "auc_roc": 0.94, "recall": 0.99},
    {"run": 2, "epochs": 5, "val_acc": 0.856, "auc_roc": 0.94, "recall": 0.99},
    {"run": 3, "epochs": 5, "val_acc": 0.806, "auc_roc": 0.92, "recall": 0.98},
    {"run": 4, "epochs": 10, "val_acc": 0.859, "auc_roc": 0.94, "recall": 0.99},
]

for r in runs:
    with mlflow.start_run(run_name=f"resnet50_run{r['run']}"):
        mlflow.log_params({
            "model": "resnet50",
            "epochs": r["epochs"],
            "learning_rate": 0.001,
            "batch_size": 32,
            "optimizer": "adam",
            "dataset": "kermany-chest-xray",
            "save_strategy": "best" if r["run"] == 4 else "last"
        })
        mlflow.log_metrics({
            "val_accuracy": r["val_acc"],
            "auc_roc": r["auc_roc"],
            "pneumonia_recall": r["recall"],
        })
        print(f"Run {r['run']} logged — Val: {r['val_acc']}")

print("\nAll runs logged!")
print("Run: mlflow ui")
print("Open: http://127.0.0.1:5000")