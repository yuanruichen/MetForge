# MetForge

MetForge is a lightweight AI-agent workflow kit for atmospheric science and
scientific Python projects. It provides repository conventions, agent
instructions, and reusable skills for data processing, plotting, writing,
reviewing, and auditing research workflows.

MetForge is designed for **less coding and more thinking**. The goal is not to
replace scientists. It helps researchers spend less time on repetitive coding
and more time on scientific judgment: asking better questions, checking
assumptions, interpreting diagnostics, and deciding what evidence is convincing.

The project is intentionally small. It does not include private research
artifacts, datasets, generated figures, or project-specific scripts.

## What Is Included

- `AGENTS.md`: simple operating rules for Codex-assisted work.
- `.codex/`: reusable Codex agent and skill definitions.
- `code/`: placeholders for scripts, notebooks, source code, and tests.
- `configs/`: optional configuration files.
- `data/`: local data placeholders, ignored by git except `.gitkeep` files.
- `output/`: generated figures, logs, and temporary files, ignored by git.
- `docs/templates/`: generic documentation templates.

## Download And Installation

Use MetForge as a starting template for a new research-agent workspace.

```bash
git clone https://github.com/yuanruichen/MetForge.git
cd MetForge
python -m venv .venv
source .venv/bin/activate
python -m pip install -e .
```

If you only want the instructions and folder layout, cloning the repository is
enough. The editable Python install is only needed if you want to import the
small `metforge` path helpers from scripts or tests.

Optional development tools:

```bash
python -m pip install -e ".[dev]"
python -m pytest code/tests
```

## Getting Started With Codex

Codex can read `AGENTS.md` and the `.codex/` folder to understand how this
repository should be operated. A practical first session looks like this:

```text
Read AGENTS.md first. I want to analyze data under data/raw/, write derived
outputs to data/processed/, save figures to output/figures/, and keep all paths
repo-relative. Before coding, state assumptions and define a small verification
check.
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

## Using Claude Or Other AI Agents

MetForge is not limited to Codex. For Claude, Cursor, Continue, Aider, or other
agent tools, start by giving the agent the same operating context:

```text
Read AGENTS.md and follow it as the repository policy. Use repo-relative paths.
Do not commit data or generated outputs. Keep changes small, state assumptions,
and verify with the smallest relevant check.
```

Then point the agent to the skill that matches the work:

- Data processing: `.codex/skills/data-process/SKILL.md`
- Plotting: `.codex/skills/plot/SKILL.md`
- Figure review: `.codex/skills/figure-audit/SKILL.md`
- Writing: `.codex/skills/writing/SKILL.md`
- Literature review: `.codex/skills/lit-review/SKILL.md`
- Simplicity and review discipline: `.codex/skills/karpathy-guidelines/SKILL.md`

For tools without native skill support, paste the relevant `SKILL.md` content
into the chat before asking the agent to work. Treat the AI as a careful coding
and documentation assistant; the scientific decisions remain yours.

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

## Basic Use

1. Put external or symlinked input data under `data/raw/`.
2. Write reusable code under `code/src/`.
3. Put generated scripts under `code/scripts/archive/<task>/`.
4. Write derived datasets to `data/processed/`.
5. Write figures, logs, and temporary files under `output/`.
6. Keep all paths repo-relative.

## License

MIT
