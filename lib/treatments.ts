export const TREATMENTS: Record<string, { treatment: string; severity: string }> = {
  Healthy: {
    severity: "Low",
    treatment: "Crop looks healthy. Continue regular irrigation and monitor weekly.",
  },
  "Bacterial Spot": {
    severity: "High",
    treatment: "Remove infected leaves. Apply copper-based fungicide. Avoid overhead watering.",
  },
  "Early Blight": {
    severity: "Medium",
    treatment: "Use chlorothalonil spray. Improve air circulation. Remove lower infected leaves.",
  },
  "Late Blight": {
    severity: "High",
    treatment: "Apply mancozeb immediately. Destroy severely infected plants to stop spread.",
  },
  "Leaf Mold": {
    severity: "Medium",
    treatment: "Reduce humidity. Apply fungicide. Increase spacing between plants.",
  },
  "Septoria Leaf Spot": {
    severity: "Medium",
    treatment: "Remove infected foliage. Apply fungicide every 7-10 days until controlled.",
  },
  "Spider Mites": {
    severity: "Medium",
    treatment: "Spray neem oil or insecticidal soap. Increase watering to reduce stress.",
  },
  "Target Spot": {
    severity: "High",
    treatment: "Apply azoxystrobin fungicide. Rotate crops next season.",
  },
  "Yellow Leaf Curl Virus": {
    severity: "High",
    treatment: "Control whitefly vectors with neem spray. Remove and destroy infected plants.",
  },
  "Mosaic Virus": {
    severity: "High",
    treatment: "No cure available. Remove infected plants. Control aphid vectors.",
  },
};

export const DEMO_LABELS = Object.keys(TREATMENTS);

export function getTreatment(label: string) {
  return TREATMENTS[label] ?? {
    severity: "Unknown",
    treatment: "Consult local agricultural officer for proper diagnosis and treatment.",
  };
}
