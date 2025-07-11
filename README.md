# Codalyst

Codalyst is a full-stack AI-powered code review platform that helps developers improve their code quality, readability, and best practices using advanced AI models (Google Gemini). It features a modern React frontend and a Node.js/Express backend, providing instant, actionable feedback on code snippets.

---

## 🚀 Features

- **AI Code Review:** Get instant, structured feedback on your code (JS, Python, Java, C++, etc.)
- **Nuanced Feedback:** Ranges from "Fully Correct" to "Needs Major Fixes" with actionable suggestions.
- **Mentor-like Tone:** Encouraging, clear, and beginner-friendly explanations.
- **Learning Resources:** Links to docs, tutorials, and videos based on your code language.
- **Responsive UI:** Works on desktop and mobile devices.
- **Modern Editor:** Syntax highlighting, dark theme, and easy-to-use interface.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), react-simple-code-editor, PrismJS, react-markdown, rehype-highlight
- **Backend:** Node.js, Express, @google/generative-ai
- **AI Model:** Google Gemini 2.5 Flash (configurable)
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📁 Folder Structure

```
Codalyst/
├── BackEnd/
│   ├── src/
│   │   ├── app.js           # Express app setup
│   │   ├── controllers/     # API controllers (AI review)
│   │   ├── routes/          # API routes
│   │   └── services/        # AI service logic
│   └── server.js            # Server entry point
├── Frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React app
│   │   ├── App.css          # App styles
│   │   └── ...
│   ├── index.html           # HTML entry
│   └── ...
├── package.json             # Root dependencies
└── README.md                # Project documentation
```

---

## ⚡ Quick Start

### 1. Clone the repo

```sh
git clone https://github.com/yourusername/codalyst.git
cd codalyst
```

### 2. Setup Backend

```sh
cd BackEnd
npm install
# Add your Google Gemini API key to a .env file:
echo "GOOGLE_GEMINI_KEY=your-key-here" > .env
npm start
```

### 3. Setup Frontend

```sh
cd ../Frontend
npm install
npm run dev
```

### 4. Open in Browser

Visit [https://www.codalyst.live]

---

## 🌐 Deployment

- **Frontend:** Hosted on [Vercel](https://vercel.com/)
- **Backend:** Hosted on [Render](https://render.com/)
- **Domain:** Managed via [Name.com](https://www.name.com/)

---

## 🤝 Contributing

1. Fork the repo and create your branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 🙏 Acknowledgements

- [Google Gemini](https://ai.google.dev/)
- [PrismJS](https://prismjs.com/)
- [react-simple-code-editor](https://github.com/satya164/react-simple-code-editor)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight)

---

> Made with ❤️ by Abhishek
