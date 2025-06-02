# DivyaLipi-AI

> Sanskrit OCR and Translation of degraded Sanskrit manuscripts using Deep Learning

---

## 📽️ Demo

Check out the live demo and results here:  
🔗 [LinkedIn Demo Post](https://www.linkedin.com/posts/aryan-kahate-657429313_%F0%9D%9F%90%F0%9D%9F%8E-%F0%9D%90%A1%F0%9D%90%A8%F0%9D%90%AE%F0%9D%90%AB%F0%9D%90%AC-%F0%9D%90%A8%F0%9D%90%9F-%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%A5%F0%9D%90%9E%F0%9D%90%A7%F0%9D%90%AD%F0%9D%90%A5%F0%9D%90%9E%F0%9D%90%AC%F0%9D%90%AC-activity-7333020837505036288-Y8Hu?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAE-egmMBSdy0Z8AmGTBbnQU-nWFW4wt3hs0)

---

## 🚧 Commit Structure Notice

Due to computational and GPU hardware limitations, all training, inference testing, and integration steps were performed on a single local machine. This constraint required centralized development, and thus all Git operations (including commits and pushes) originated from the same device.

Advantages of this approach:
- Ensured consistent CUDA and PyTorch environment for model training
- Avoided serialization/deserialization issues with large-scale checkpoints
- Direct and quick access to logs, weights, and intermediate outputs

---

## 🧠 Model Training Details

- Object Detection Backbone: **Ultralytics YOLOv8**
- OCR Engine: **Microsoft TrOCR (Transformer OCR)**
- Auxiliary OCR: **Google Cloud Vision API**
- Image Preprocessing & Feature Extraction: **Torch + TorchVision**

### 🎯 Model Accuracy

- **mAP@0.5**: `0.995` (Mean Average Precision at IoU threshold 0.5)
- **F1 Confidence Curve Score**: `1.00`
- **Confusion Matrix**: Flawless performance on actual Sanskrit manuscript datasets.  
  ➕ Refer to the `results/` folder for sample predictions and benchmarking screenshots.

---

## 🧱 Tech Stack

### 🔍 AI/ML Frameworks
- **Ultralytics YOLOv8**
- **Torch + TorchVision**
- **TrOCR**
- **Google Cloud Vision API**

### 💻 Frontend
- **TypeScript**
- **JavaScript**
- **Vite**
- **Tailwind CSS**

### ⚙️ Backend
- **Python**
- **FastAPI**

---

## 🧩 Repositories

| Layer        | Repository Link                         |
|--------------|------------------------------------------|
| Frontend     | [GitHub: OBZIUS](https://github.com/OBZIUS)          |
| Backend      | [GitHub: NeuralSynth](https://github.com/NeuralSynth) |
| Model Training | [GitHub: NoiceHax](https://github.com/NoiceHax)     |

---

## 📁 Results

- Sample predictions, bounding box overlays, and post-OCR outputs can be found in the [`results/`](./results) directory.

---

## 🧪 Future Improvements

- Migrate training to cloud-based GPUs for higher scalability
- Add multilingual support and improve layout analysis
- Build a full user-facing dashboard for batch PDF/document OCR

---


