# 🚀 GitGravity — The Student's Step-by-Step Git & GitHub Guide

[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-f97316?style=for-the-badge&logo=hacktoberfest&logoColor=white)](https://hacktoberfest.com/)
[![Built with Google Antigravity](https://img.shields.io/badge/Built%20with-Google%20Antigravity-6366f1?style=for-the-badge&logo=google&logoColor=white)](https://antigravity.dev)
[![Powered by Gemma 4](https://img.shields.io/badge/AI-Gemma%204%20(Open%20Weights)-c084fc?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemma)
[![Python & Web](https://img.shields.io/badge/Stack-Python%20%7C%20HTML5%20%7C%20CSS3%20%7C%20JS-10b981?style=for-the-badge)](https://python.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-38bdf8?style=for-the-badge)](LICENSE)

> **"Master Git & GitHub without the headache — From creating your repository on GitHub to pushing your project into main."**  
> An interactive, visual, zero-jargon open-source web application built in **Python, HTML, and Vanilla CSS** for students and first-time contributors participating in **Hacktoberfest 2026 Hack Day Vijayawada x NIAT-LIMAT**.

---

## 🌟 Why GitGravity?

For student developers, version control is the biggest hurdle to participating in open source:
* *"How do I create a repo on GitHub without breaking local files?"*
* *"What is the difference between Git and GitHub?"*
* *"What does `git commit` and staging actually do?"*
* *"Why shouldn't I work directly on `main`?"*
* *"Help! A merge conflict appeared in my terminal!"*

**GitGravity** demystifies Git through **visual intuition**, **interactive simulation**, and **copy-paste workflows** with real-time parameter customization — understandable and buildable within 2 hours.

---

## ✨ Key Features

### 1. 🤖 Gemma 4 AI Student Git Coach
* An integrated student AI assistant powered by **Gemma 4** (Google's lightweight open-weights model via Gemini API).
* Students can ask questions in plain student language (e.g. *"Why did my push fail?"*, *"What does detached HEAD mean?"*) and receive crystal-clear, non-jargon explanations and actionable Git commands.

### 2. 🗺️ Zero-to-Main Visual Pipeline Roadmap
* A 7-stage interactive visual tracker:
  `[ 1. GitHub.com ] ➔ [ 2. git init ] ➔ [ 3. git add . ] ➔ [ 4. git commit ] ➔ [ 5. git branch -M ] ➔ [ 6. git remote add ] ➔ [ 7. git push origin main 🚀 ]`
* Students can click any stage to navigate directly to instructions and copyable commands.

### 3. 🐙 Interactive GitHub.com "New Repository" Simulator
* Accurately simulates the `github.com/new` web page.
* Type a repository name to automatically update all terminal code snippets across the app.
* **🚨 Critical Warning Banner**: Explains why students must leave *"Add a README"*, *".gitignore"*, and *"License"* UNCHECKED if pushing existing code, preventing the dreaded `fatal: refusing to merge unrelated histories` error.

### 4. ⚡ 1-Click "All-in-One" Push Sequence
* A single prominent card with a **"Copy All Commands to Clipboard"** button so students can run the full sequence in 5 seconds:
  ```bash
  git init
  git add .
  git commit -m "feat: initial commit"
  git branch -M main
  git remote add origin https://github.com/your-username/hackday-project.git
  git push -u origin main
  ```

### 5. 🖥️ Interactive Visual Git Terminal Simulator
* Practice typing real commands (`git status`, `git add .`, `git commit`, `git push`, `git branch`, `git log`) or click quick-action chips.
* **Live File State Tracker**: Watch files move in real time from **Untracked** (yellow) to **Staged** (green) to **Committed**.
* **Visual Commit Tree**: Automatically animates a branch graph with commit hashes, messages, and timestamps.

### 6. 🚑 Git Emergency Room (First Aid)
Instant, panic-free solutions for everyday mistakes:
* *"I made a typo in my commit message!"* → `git commit --amend`
* *"I modified a file and broke it!"* → `git restore`
* *"I accidentally staged a secret file!"* → `git restore --staged`
* *"Merge Conflict appeared!"* → Visual guide on resolving `<<<<<<<` and `>>>>>>>` markers.

### 7. 🧠 Student Knowledge Quiz & Hacktoberfest Checklist
* 5 bite-sized interactive multiple-choice questions to test understanding before submitting a PR.
* Interactive 6-step Hacktoberfest PR checklist to ensure high-quality contributions.
* Dark / Light mode with persistence in `localStorage`.

---

## 🛠️ Tech Stack

* **Backend / Server**: Python 3 (`app.py` built with standard library `http.server` & JSON REST API)
* **Frontend**: Pure Semantic HTML5, Vanilla CSS3 (Cyber Glassmorphism, CSS variables, responsive design), Modern ES6+ JavaScript
* **AI Engine**: Gemma 4 (Open-Weights via Gemini API)
* **Dev Server**: Supports both `python app.py` and Vite (`npm run dev`)

---

## 🚀 How to Run Locally

### Option 1: Simple Run with Python (Recommended for Students)
No Node.js or npm required!
```bash
python app.py
```
Open **`http://localhost:5000`** in your browser!

### Option 2: Run with Vite (Node.js)
```bash
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser!

---

## 🏆 Hackathon Prize Category Qualifications

### 1. 🌟 Best Use of Gemma 4 (Google DeepMind)
* **How GitGravity uses it**: GitGravity integrates **Gemma 4** (Google's multimodal open-weights model accessible via Gemini API) as an on-demand **Student Git Coach**. When beginners encounter cryptic Git errors or confusion about version control concepts, Gemma 4 delivers friendly, 5th-grader-level analogies and precise terminal commands to guide them from repository creation to pushing to `main`.

### 2. 🌊 Best Open-Source AI Project (DigitalOcean)
* **How GitGravity uses it**: GitGravity is a 100% open-source educational project under the MIT License, combining an open-weights AI model (Gemma 4) with an interactive Git visualizer and simulator to lower the barrier of entry for students contributing to Hacktoberfest.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Built with ❤️ for students at Hacktoberfest Hack Day Vijayawada x NIAT-LIMAT.
