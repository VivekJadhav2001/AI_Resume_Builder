# 🧠 AI Resume Builder

An AI-powered resume builder that helps users create professional, ATS-friendly resumes with real-time editing, customizable templates, and PDF export. Built with modern frontend technologies for speed, scalability, and great UX.

---

## ✨ Features

- 🤖 AI-assisted resume content creation
- 📝 Rich text editing with TinyMCE
- 🎨 Customizable resume sections & layouts
- 📄 Export resume as PDF
- 🔄 State management with Redux Toolkit
- 🚨 Error handling with Error Boundaries
- 🔔 Toast notifications for better UX

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| Vite | Build tool & dev server |
| Redux Toolkit | State management |
| React Router DOM | Client-side routing |
| Tailwind CSS | Utility-first styling |
| React Icons | Icon library |

### Editor & UI
| Technology | Purpose |
|---|---|
| TinyMCE | Rich text editor |
| React Select | Dropdown/select components |
| React Flow | Flow-based UI elements |

### PDF & Export
| Technology | Purpose |
|---|---|
| @react-pdf/renderer | React-based PDF generation |
| jsPDF | PDF export utility |
| html2canvas | HTML to canvas/image conversion |

### Utilities
| Technology | Purpose |
|---|---|
| Axios | HTTP requests |
| React Toastify | Toast notifications |
| React Error Boundary | Error boundary handling |
| GROQ(LLaMA 3.1) API | AI content generation |

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/VivekJadhav2001/AI_Resume_Builder.git
cd ai-resume-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

App will be available at `http://localhost:5173`

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🗂 Project Structure

```
ai-resume-builder/
│
├── backend/
│   ├── routes/
│   │   └── ai.routes.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── app/
    │   ├── assets/
    │   ├── components/
    │   ├── features/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── constant.js
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    └── README.md
```

---

## 🎯 Use Cases

- Job seekers building professional, polished resumes
- Freshers creating their first resume with AI guidance
- Developers & professionals optimizing resumes for ATS systems
- Anyone looking to generate a resume quickly with AI assistance

---

## 🚀 Future Enhancements

- 🔐 User authentication
- 💾 Cloud resume storage
- 🤖 Advanced AI prompts & suggestions
- 🎯 ATS score analysis
- 🌐 Multi-language support
- 📊 Resume analytics dashboard

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ⭐ Support

If you find this project useful, consider giving it a star on GitHub — it really helps!

[![GitHub Stars](https://img.shields.io/github/stars/sai4u-dev/ai-resume-builder?style=social)](https://github.com/sai4u-dev/ai-resume-builder)
