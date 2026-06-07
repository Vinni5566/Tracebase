# Contributing to ThreatForge

Thank you for taking the time to contribute.

ThreatForge exists because of people who care about making security education more accessible. Whether you're here to fix a typo, build a mission from scratch, or redesign an entire flow — your work matters and is genuinely appreciated.

This guide will help you understand how to contribute effectively, what we value as a community, and what to expect from the process.

---

## Who Can Contribute?

You don't need to be a security expert to contribute to ThreatForge. The project needs many different kinds of people.

**Developers**
Build new features, fix bugs, improve performance, and help architect the mission engine. If you write code, there's work here for you.

**Cybersecurity Enthusiasts**
Design missions based on real vulnerabilities. Write scenario descriptions. Help ensure technical accuracy. Your domain knowledge shapes the core product.

**Designers**
Improve visual hierarchy, interaction design, accessibility, and the overall learner experience. The interface should feel intentional — there is always room to make it better.

**Technical Writers**
Write and refine concept explanations, mission descriptions, learning path overviews, and documentation. Clear writing is a form of engineering.

**Translators**
Make ThreatForge available to developers who don't learn best in English. Translated missions and UI strings have a direct impact on who can access security education.

---

## Ways to Contribute

### Write or Improve a Mission
Missions are the core of ThreatForge. A great mission has a realistic scenario, a clear learning objective, a challenge that requires actual thought, and an explanation that deepens understanding after the fact.

If you know a vulnerability well enough to explain it clearly to someone encountering it for the first time — you can write a mission.

### Build or Extend a Learning Path
Learning paths connect missions into a coherent progression. If you see a gap in the curriculum or think a better ordering exists for a given topic, propose or build it.

### Improve the Documentation
Clear documentation lowers the barrier to contribution. If something confused you when you first looked at the project, fixing it helps every contributor who comes after you.

### UI and Accessibility Improvements
The interface should work well for everyone. Contributions that improve keyboard navigation, screen reader support, contrast ratios, or mobile responsiveness are always welcome.

### Localization
If you're fluent in a language other than English and want to help translate missions or UI text, open an issue to coordinate with the team.

### Bug Reports and Fixes
If you encounter unexpected behavior, open an issue. If you can fix it, open a pull request. Both are valuable.

---

## Development Workflow

### 1. Fork the Repository

Click **Fork** on the [ThreatForge GitHub page](https://github.com/Vinni5566/ThreatForge) to create your own copy of the repository.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/ThreatForge.git
cd ThreatForge
```

### 3. Install Dependencies

```bash
bun install
# or
npm install
```

### 4. Create a Branch

Use a descriptive branch name that reflects what you're working on.

```bash
git checkout -b feat/sql-injection-mission
git checkout -b fix/leaderboard-score-display
git checkout -b docs/improve-setup-guide
```

**Branch naming conventions:**
- `feat/` — new features or missions
- `fix/` — bug fixes
- `docs/` — documentation changes
- `chore/` — maintenance tasks, dependency updates
- `refactor/` — code restructuring without behavior change

### 5. Make Your Changes

Run the development server while you work:

```bash
bun run dev
```

Write clean, readable code. Keep changes focused — one pull request should address one thing.

### 6. Commit Your Changes

Write commit messages that describe *what changed and why*, not just what files were touched.

```bash
# Good
git commit -m "feat: add XSS mission with reflected injection scenario"
git commit -m "fix: prevent score duplication on mission retry"

# Less helpful
git commit -m "update files"
git commit -m "fix stuff"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/) loosely — use the prefixes above as a guide.

### 7. Push and Open a Pull Request

```bash
git push origin feat/sql-injection-mission
```

Then open a pull request on GitHub against the `main` branch of the original ThreatForge repository.

---

## Pull Request Guidelines

A good pull request makes it easy for reviewers to understand what changed and why.

**Before submitting:**
- [ ] Your code runs without errors locally
- [ ] You've tested the change manually
- [ ] Your branch is up to date with `main`
- [ ] The pull request title is clear and descriptive
- [ ] You've filled out the pull request description

**In your pull request description, include:**
- What the PR does
- Why it's needed
- Any relevant context (linked issue, design decision, etc.)
- Screenshots or recordings if the change affects the UI

**What to expect:**
- A reviewer will look at your PR within a reasonable timeframe
- You may receive requests for changes — this is normal and not a rejection
- Once approved, a maintainer will merge it

Small, focused pull requests get reviewed faster than large, sprawling ones.

---

## Reporting Issues

If you find a bug, open an issue with:
- A clear description of the problem
- Steps to reproduce it
- What you expected to happen
- What actually happened
- Your browser and OS if it's a UI issue

If you have an idea for a new feature or mission, open an issue to discuss it before building it. This avoids duplicated effort and ensures alignment with the project's direction.

---

## Community Values

ThreatForge is built by a community of people with different backgrounds, experience levels, and areas of expertise. These values guide how we work together.

**Respectful**
Disagree on ideas, never on people. Critique should be specific, constructive, and kind.

**Inclusive**
Experience level doesn't determine the value of a contribution. Beginners are welcome. Questions are welcome.

**Constructive**
If something isn't working, say what would make it better. Criticism without direction isn't helpful.

**Collaborative**
Good ideas come from many people. Give credit generously. Ask for input when you're unsure.

All contributors are expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## Setting Up for Mission Development

If you're contributing a new mission specifically, here is what you need to know:

A mission should have:

1. **A scenario** — a realistic context that explains the situation a learner is placed in
2. **A clear objective** — one specific thing the learner needs to understand or accomplish
3. **A challenge** — an interactive element that requires the learner to apply the concept
4. **An explanation** — a post-mission breakdown of why the vulnerability exists and how to prevent it

Missions should be accurate, self-contained, and focused. If a mission teaches three things at once, it probably needs to be split.

---

## Join the Mission

Security education is one of the most consequential things the open-source community can build.

Every developer who learns how SQL injection actually works is less likely to ship it. Every team that understands what a race condition looks like is more likely to catch one before it reaches production. Every codebase maintained by security-aware developers is harder for attackers to break.

ThreatForge is how we build that world — one mission, one contributor, one curious developer at a time.

We're glad you're here.
