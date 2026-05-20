# MetForge

MetForge is a lightweight AI-agent workflow kit for atmospheric science: it helps researchers do **less coding and more thinking** by giving agents reusable instructions, skills, and folder conventions while scientists keep responsibility for questions, assumptions, interpretation, and evidence.

## Getting Started With Codex

Install Node.js and npm first. On many systems you can check them with:

```bash
node --version
npm --version
```

Install the Codex CLI:

```bash
npm install -g @openai/codex
```

Download MetForge and enter the project:

```bash
git clone https://github.com/yuanruichen/MetForge.git
cd MetForge
```

Optional Python setup for the small `metforge` path helpers:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -e .
```

Optional development check:

```bash
python -m pip install -e ".[dev]"
python -m pytest code/tests
```

Start Codex from the repository root:

```bash
codex
```

A practical first prompt:

```text
Read AGENTS.md first. Use this repository as a scientific workflow workspace.
Keep all paths repo-relative, write data outputs to data/processed/, figures to
output/figures/, logs to output/logs/, and define a small verification check
before coding.
```

Useful task prompts:

```text
Use the data-process skill. Convert this notebook workflow into a restartable
script under code/scripts/archive/<task>/ and write a short run log.
```

```text
Use the plot skill, then run the figure-audit skill. Create a PNG and PDF figure
with variable name, units, period, and method in the title or caption.
```

```text
Use the auditor agent to review the code changes for bugs, unsafe paths, missing
tests, and reproducibility problems before final delivery.
```

Claude, Cursor, Continue, Aider, and other AI-agent tools can also use MetForge:
ask them to read `AGENTS.md`, follow the repo-relative path rules, and use the
relevant `.codex/skills/*/SKILL.md` file as task-specific guidance.

## Repository Layout

```text
.
├── AGENTS.md
├── .codex/
│   ├── agents/
│   └── skills/
├── code/
│   ├── scripts/
│   ├── src/
│   └── tests/
├── configs/
├── data/
│   ├── raw/
│   └── processed/
├── docs/
│   └── templates/
└── output/
    ├── figures/
    ├── logs/
    └── tmp/
```

### What Is Included

- `AGENTS.md`: simple operating rules for AI-agent-assisted work.
- `.codex/agents/`: specialist agent definitions, including `auditor` for code review.
- `.codex/skills/`: reusable task guidance for data processing, plotting, writing, review, and literature work.
- `code/`: placeholders for scripts, notebooks, source code, and tests.
- `configs/`: optional configuration files.
- `data/`: local data placeholders, ignored by git except `.gitkeep` files.
- `output/`: generated figures, logs, and temporary files, ignored by git.
- `docs/templates/`: generic documentation templates.

## License

MIT
