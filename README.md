# 🧠 BemEstar — Mental Health SaaS Platform

> **EN** | [🇧🇷 Versão em Português abaixo](#-sobre-o-projeto-português)

A full-stack SaaS platform designed to support mental health and emotional well-being. Users can track their mood, access guided exercises, and connect with wellness content — all in one place.

🌐 **Live Demo:** [bemestar.vercel.app](https://bemestar.vercel.app)

---

## ✨ Features

- 🔐 Authentication — Secure sign-up/login with Supabase Auth
- 📊 Mood Tracker — Daily mood logging with historical charts
- 🧘 Wellness Content — Curated exercises and mental health resources
- 📱 Responsive Design — Works seamlessly on mobile and desktop
- 🌙 Dark/Light Mode — Theme switching for comfortable use
- ☁️ Cloud Sync — Data persisted in real-time with Supabase

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, TailwindCSS, Shadcn/UI |
| Backend | Node.js, Supabase Edge Functions |
| Database | PostgreSQL (via Supabase) |
| Auth | Supabase Auth |
| Deploy | Vercel |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/jeanoliveirafs/bemestar.git
cd bemestar

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Supabase URL and anon key

# Start the development server
npm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📁 Project Structure

```
bemestar/
├── api/          # Serverless API functions
├── client/       # React frontend application
├── server/       # Server-side logic
├── shared/       # Shared types and utilities
└── src/hooks/    # Custom React hooks
```

---

## 🇧🇷 Sobre o Projeto (Português)

**BemEstar** é uma plataforma SaaS completa focada em saúde mental e bem-estar emocional. Os usuários podem registrar seu humor diário, acessar exercícios guiados e conteúdos de bem-estar — tudo em um só lugar.

### Funcionalidades

- 🔐 **Autenticação** — Login seguro com Supabase Auth
- 📊 **Registro de Humor** — Acompanhe seu estado emocional diariamente
- 🧘 **Conteúdo de Bem-Estar** — Exercícios e recursos de saúde mental
- 📱 **Design Responsivo** — Funciona em celular e desktop
- 🌙 **Modo Escuro/Claro** — Alterne o tema conforme sua preferência

### Como Executar

```bash
git clone https://github.com/jeanoliveirafs/bemestar.git
cd bemestar
npm install
cp .env.example .env
npm run dev
```

---

## 📄 License

MIT License — feel free to use this project as a reference.

---

<p align="center">Made with ❤️ by <a href="https://github.com/jeanoliveirafs">Jean Oliveira</a></p>
