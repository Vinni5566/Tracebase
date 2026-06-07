<div align="center">

# ⚔️ ThreatForge

**Learn how attacks work. Understand how systems fail. Build what defends them.**

*An open-source cybersecurity learning platform built for developers who want to go beyond writing code — and start thinking like an adversary.*

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red)](https://github.com/Vinni5566/ThreatForge)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](./CONTRIBUTING.md)
[![Hackathon 2026](https://img.shields.io/badge/Hackathon-2026-purple)](https://github.com/Vinni5566/ThreatForge)

</div>

---

## What is ThreatForge?

ThreatForge is an open-source platform that teaches developers **how cybersecurity attacks actually work** — through hands-on missions, structured learning paths, and real challenge-based experiences.

Most developers spend their entire career building software without ever understanding how it can be exploited. ThreatForge exists to close that gap — not by drowning you in theory, but by making you simulate the attack, trace the vulnerability, and build the defense yourself.

> *"The best way to build secure software is to understand exactly how it breaks."*

---

## The Problem

Every year, billions of dollars are lost to breaches that were entirely preventable.

The root cause isn't a lack of security tools. It's a lack of **security understanding** among the people writing the code.

Developers are taught to build features. They are rarely taught to question what happens when those features are abused, misused, or deliberately exploited. Security gets treated as someone else's job — until it isn't.

**ThreatForge changes this.**

Not with compliance checklists. Not with passive video courses. But by putting developers inside realistic attack scenarios, forcing them to think from both sides of the keyboard, and building intuition that stays with them long after the mission ends.

---

## Features

### 🎯 Interactive Missions
Scenario-based challenges that simulate real attack and defense situations. Each mission teaches one idea thoroughly — not ten ideas poorly.

### 🗺️ Structured Learning Paths
Curated sequences of missions organized by topic: web vulnerabilities, network attacks, reverse engineering, cryptographic failures, and more. Progress at your own pace.

### 🏟️ Arena Challenges
Open-ended challenges with no guided hints. For contributors and learners who want to test their knowledge against harder, less structured problems.

### 🏆 Achievement System
Milestone tracking that marks your growth — not vanity badges, but meaningful markers that reflect real understanding gained.

### 🌍 Community-Built Content
Missions and learning paths contributed by the community. If you know something worth teaching, ThreatForge has a path for it to reach thousands of learners.

### 📖 Concept Library
Clear, focused explanations of the concepts behind each mission — written for developers, not compliance officers.

---

## Why Open Source?

Cybersecurity knowledge has historically been gated — behind expensive certifications, exclusive communities, or tools that cost thousands per year.

ThreatForge is open source because **security education should be accessible to every developer, everywhere**, regardless of budget, geography, or background.

Open source also means the curriculum can grow with the threat landscape. The community that contributes to ThreatForge helps ensure it stays current, honest, and effective — without a single company deciding what's worth teaching.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Vinni5566/ThreatForge.git
cd ThreatForge

# Install dependencies
bun install
# or
npm install

# Start the development server
bun run dev
# or
npm run dev
```

The app will be available at `http://localhost:3000`.

### Project Structure

```
ThreatForge/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-level page components
│   ├── missions/       # Mission definitions and content
│   ├── paths/          # Learning path configurations
│   └── lib/            # Utilities and helpers
├── public/             # Static assets
└── docs/               # Extended documentation
```

---

## Contributing

ThreatForge is built by its community. Whether you want to write a new mission, improve the UI, fix a bug, or improve the documentation — there is a place for your contribution here.

Read the full guide: **[CONTRIBUTING.md](./CONTRIBUTING.md)**

---

## Roadmap

### Current MVP

- [x] Core mission engine
- [x] Learning path structure
- [x] Achievement system foundation
- [x] Arena challenge mode
- [ ] User progress persistence
- [ ] Mission submission system for contributors
- [ ] Community voting on submitted missions

### Future Vision

- **Multiplayer Arena** — real-time attack/defense challenges between two players
- **CLI Mode** — run missions from the terminal for a more authentic environment
- **Language Support** — translated missions for global accessibility
- **Instructor Mode** — deploy ThreatForge as a teaching tool in classrooms and bootcamps
- **Verified Paths** — curated learning paths endorsed by security professionals

These are goals, not promises. The roadmap evolves with the community.

---

## Community

ThreatForge is for everyone who believes that understanding how attacks work makes you a better builder.

If you've ever been curious about how SQL injection actually works, what a race condition looks like in practice, or how a buffer overflow turns into arbitrary code execution — this project is for you.

**Get involved:**
- ⭐ Star the repo to show support
- 🐛 [Open an issue](https://github.com/Vinni5566/ThreatForge/issues) if you find a bug
- 💡 [Suggest a mission or feature](https://github.com/Vinni5566/ThreatForge/issues/new)
- 🔧 [Read the contributing guide](./CONTRIBUTING.md) and submit a PR

---

## License

ThreatForge is released under the [MIT License](./LICENSE).

You are free to use, modify, and distribute this project. If you build something with it, we'd love to hear about it.

---

<div align="center">

*Built by developers, for developers.*
*Security knowledge shouldn't have a paywall.*

</div>
