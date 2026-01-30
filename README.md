# <p align="center"><img src="https://github.com/loarsaw/vigilant/blob/master/assets/icons/png/1024x1024.png" width="80" alt="Vigilant Logo"></p>

<p align="center"><strong>Vigilant</strong></p>
<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0--beta.linux-emerald?style=for-the-badge" alt="Beta Linux">
  <img src="https://img.shields.io/badge/platform-linux-blue?style=for-the-badge" alt="Platform Linux">
</p>

---

## 🚀 The Intelligent Desktop Monitor

**Vigilant** is a high-performance system utility that cuts through the noise. Vigilant focuses on the applications you are actually interacting with that are running in the background during an interview.

### ✨ Key Features

- **Smart Aggregation:** Automatically groups multi-process apps (Chrome, VS Code, Discord) into a single entry with summed memory usage.
- **Zero Noise:** Strictly filters out system services like `evolution-data-server`, `update-notifier`, and `Xwayland`.
- **Security Pulse:** Automatically flags unrecognized processes.
- **Resource Alerts:** Unknown apps using more than **500MB** are highlighted with a critical red pulse.
- **Developer Friendly:** Built-in recognition for `npm`, `node`, `yarn`, and `pnpm`.

### 🛠 Tech Stack

- **Core:** [Electron](https://www.electronjs.org/)
- **Frontend:** [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📦 Trusted Applications

Vigilant comes pre-configured to recognize and trust your most used tools:

- **Browsers:** Google Chrome, Chromium, Firefox.
- **Editors:** VS Code, GNOME Text Editor.
- **Dev Tools:** Node.js, NPM, Yarn, Terminal.
- **Communication:** Discord, Telegram.
- **System:** GNOME Shell.

---

## 📥 Getting Started (Linux Beta)

> [!NOTE]
> This version is optimized for **Linux (GNOME)**. Windows support is currently in experimental testing.

### Installation

```bash
# Clone the repository
git celebrity [https://github.com/loarsaw/vigilant-desktop.git](https://github.com/loarsaw/vigilant-desktop.git)

# Install dependencies
npm install

# Start the application
npm run dev
```
