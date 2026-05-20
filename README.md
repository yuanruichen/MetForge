<p align="center">
  <img src="docs/assets/metforge_title_selected_embedded.svg" alt="MetForge -- Research Agents for Atmospheric Science" width="760">
</p>

<h1 align="center">MetForge -- Research Agents for Atmospheric Science</h1>

<p align="center">
  <img alt="version" src="https://img.shields.io/badge/version-0.1.0-orange">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-black">
</p>

MetForge is a lightweight AI-agent workflow kit for atmospheric science. It helps researchers do **less coding and more thinking** by giving agents reusable instructions, atmospheric workflow skills, and clean folder conventions while scientists keep responsibility for questions, assumptions, interpretation, and evidence.

## Install

Clone MetForge, install Codex CLI with npm, enter the project directory, and start Codex:

```bash
git clone https://github.com/yuanruichen/MetForge.git
cd MetForge
npm install -g @openai/codex
codex
```

## Quick Start

In this first prompt, you ask the agent to read the project rules, respect the repository layout, keep outputs reproducible, and verify the smallest useful result before making larger changes. This gives new users a clear starting contract without needing to understand agent internals.

```text
Read AGENTS.md first. Use this repository as a scientific workflow workspace.
Keep all paths repo-relative, write data outputs to data/processed/, figures to
output/figures/, logs to output/logs/, and define a small verification check
before coding.
```

## Highlight

- `data-process`: xarray/dask and NetCDF-style processing with repo-local paths, memory-aware reductions, preserved raw inputs, and reproducible derived outputs.
- `plot` + `figure-audit`: atmospheric maps, sections, profiles, Hovmoller-style diagnostics, labeled variables/units, explicit DPI, and figure-readiness review.
- `writing`: concise scientific reports, figure captions, interpretation notes, and open research questions grounded in diagnostics.
- `lit-review`: source-grounded literature synthesis that separates source claims from interpretation and identifies useful gaps.
- `auditor`: code supervision for bugs, unsafe paths, data-loss risk, missing checks, reproducibility gaps, and overcomplication.

## Workflow

A typical MetForge run starts by using `lit-review` to collect context and open questions, then `interview-me` to turn a research idea into a concrete task. After that, ask the agent to make a plan, run `data-process` for reproducible datasets, use `plot` plus `figure-audit` for figures, and call `auditor` to supervise code quality, path safety, and verification before treating results as reliable.

```text
lit-review -> interview-me -> plan -> data-process -> plot + figure-audit -> auditor
```

## Layout

```text
.
├── AGENTS.md              Simple operating rules for AI-assisted atmospheric workflows.
├── .codex/
│   ├── agents/            Specialist agents, including auditor for code supervision.
│   └── skills/            Reusable guidance for data, plots, writing, audit, and review.
├── code/
│   ├── scripts/           Generated or reusable workflow scripts.
│   ├── src/               Shared project code.
│   └── tests/             Focused checks for reusable code and workflows.
├── configs/               Optional YAML/TOML configuration files.
├── data/
│   ├── raw/               Local input data placeholders; real data stays untracked.
│   └── processed/         Derived datasets created by project workflows.
├── docs/
│   ├── assets/            README images and public visual assets.
│   └── templates/         Generic report and workflow templates.
├── output/
│   ├── figures/           Final PNG/PDF figures.
│   ├── logs/              Run logs and execution notes.
│   └── tmp/               Repo-local temporary files.
└── LICENSE                MIT license.
```

## Reference

- [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow)
