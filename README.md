# MetForge

MetForge is a lightweight Codex workflow kit for atmospheric science and
scientific Python projects. It provides repository conventions, agent
instructions, and reusable skills for data processing, plotting, writing, and
reviewing research workflows.

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
