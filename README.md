Automated OMR Evaluation & Scoring System

An AI-powered web application that evaluates OMR sheets automatically, applies positive and negative marking, and generates instant scores and analytics.

🚀 Deployment

Live Application: https://ezomr.vercel.app/

Prototype Workspace: https://v0.app/chat/projects/YV0rVkXyX7k

📝 Features

OMR Sheet Upload – Upload scanned or captured OMR sheets for evaluation.

Answer Key Upload – Upload or configure the correct answers as the answer key.

Automated Evaluation – Uses computer vision to detect responses and match them with the answer key.

Positive & Negative Marking – Customizable marking scheme to handle multiple exam patterns.

Instant Scoring & Analytics – Displays score, accuracy, and performance metrics immediately.

User-Friendly Interface – Simple, intuitive UI built with Streamlit.

⚙️ How It Works

Upload your OMR sheet image and the answer key.

Configure positive and negative marks per question.

Run Evaluation – The system automatically scans, grades, and scores the sheet.

View Results – Get instant feedback with total marks and analytics.

🛠️ Tech Stack

Frontend / App: Streamlit

Backend: Python, OpenCV, NumPy, PIL

Deployment: Vercel / Streamlit Cloud

Version Control: GitHub

📦 Installation (Local Development)
# Clone the repo
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Install dependencies
pip install -r requirements.txt

# Run the app
streamlit run app.py

📄 Future Enhancements

Exportable PDF reports.

Multi-sheet batch evaluation.

Advanced analytics dashboard.

🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

REQUIREMENTS
streamlit
opencv-python
numpy
pillow
pandas
