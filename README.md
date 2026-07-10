<h1 align="left">MetForge — Atmospheric Science Skills</h1>

<p align="center">
  <img src="docs/assets/metforge_title_clean_vector.svg" alt="MetForge — Atmospheric Science Skills" width="860">
</p>

<p align="center">
  <a href="https://github.com/yuanruichen/MetForge/releases/latest"><img alt="release" src="https://img.shields.io/badge/release-v2026.7.10-orange"></a>
  <a href="https://opensource.org/license/mit"><img alt="license" src="https://img.shields.io/badge/license-MIT-black"></a>
  <img alt="Codex" src="https://img.shields.io/badge/agent-Codex-111111">
</p>

<p align="center">
  English · <a href="README_ZH.md">简体中文</a>
</p>

MetForge is a small collection of reusable skills for atmospheric-science work. It adds domain judgment for acquiring data, building scientific figures, and diagnosing atmospheric-model experiments while leaving planning, coding, tool use, and context management to the host agent.

## Quick Start

After installation, describe the scientific task naturally or name a skill explicitly. These prompts can be copied directly:

| Scenario | Prompt |
|---|---|
| Download reanalysis data | `Use $metforge-data to download ERA5 hourly u and v at 850 hPa for 10°S–10°N, 80°E–180°E during DJFM 2000–2020. Validate one month before scaling up.` |
| Inspect and prepare local data | `Use $metforge-data to inspect these NetCDF files, verify coordinates, units, calendar, and missing values, then design a memory-safe xarray preprocessing script.` |
| Design an atmospheric figure | `Use $metforge-figure to turn these MJO composite fields into a clear longitude–time figure with consistent scales, units, and propagation guides.` |
| Audit an existing figure | `Use $metforge-figure to audit this multi-panel map for scientific comparability, color normalization, labels, projection artifacts, and export quality.` |
| Diagnose a dynamical-core test | `Use $metforge-analysis to determine why RMS error grows in this balanced-flow test and propose the smallest experiment that separates spatial imbalance from a growing computational mode.` |
| Combine analysis and visualization | `Use $metforge-analysis to evaluate these resolution, timestep, domain, and MPI experiments. Use $metforge-figure only for the diagnostics needed to support the conclusion.` |

## Skills

| Skill | Use it for | Example |
|---|---|---|
| [`metforge-data`](skills/metforge-data/SKILL.md) | Find, download, subset, validate, and document atmospheric datasets | “Use `$metforge-data` to download ERA5 hourly winds for this domain.” |
| [`metforge-figure`](skills/metforge-figure/SKILL.md) | Design, create, revise, and audit atmospheric-science figures | “Use `$metforge-figure` to turn these balance-test outputs into a publication-ready comparison.” |
| [`metforge-analysis`](skills/metforge-analysis/SKILL.md) | Diagnose dynamical-core tests, numerical experiments, budgets, balance, conservation, and error growth | “Use `$metforge-analysis` to determine why the balanced-flow experiment drifts.” |

Each directory under `skills/` is an independent installable unit. The skills may cooperate, but none requires a central orchestrator.

## Install for Codex

Clone the repository and sync all skills:

```bash
git clone https://github.com/yuanruichen/MetForge.git
cd MetForge
scripts/install-codex-skills.sh
```

Verify an existing installation without changing it:

```bash
scripts/install-codex-skills.sh --check
```

By default the installer uses `${CODEX_HOME:-$HOME/.codex}/skills`. Use `--dest PATH` to install elsewhere.

## Design principles

- Domain judgment over agent orchestration.
- A small, testable result before a costly run.
- Explicit scientific contracts: variables, units, coordinates, hypotheses, metrics, and evidence.
- Raw inputs remain immutable; derived products remain reproducible.
- Figures are scientific arguments and are inspected after export.
- Claims are separated into evidence, interpretation, and unresolved uncertainty.

Claude Code and Hermes adapters can be added later without changing the core skill directories.
