<h1 align="left">MetForge — Atmospheric Science Skills</h1>

<p align="center">
  <img src="docs/assets/metforge_title_clean_vector.svg" alt="MetForge — Atmospheric Science Skills" width="860">
</p>

<p align="center">
  <a href="https://github.com/yuanruichen/MetForge/releases/latest"><img alt="release" src="https://img.shields.io/badge/release-v2026.7.10-orange"></a>
  <a href="https://opensource.org/license/mit"><img alt="license" src="https://img.shields.io/badge/license-MIT-black"></a>
  <a href="https://skills.sh/yuanruichen/metforge"><img alt="skills.sh" src="https://skills.sh/b/yuanruichen/metforge"></a>
  <img alt="Codex" src="https://img.shields.io/badge/agent-Codex-111111">
  <img alt="Claude Code" src="https://img.shields.io/badge/agent-Claude_Code-D97757">
  <img alt="Hermes" src="https://img.shields.io/badge/agent-Hermes-4B5CC4">
</p>

<p align="center">
  English · <a href="README_ZH.md">简体中文</a>
</p>

MetForge is a small collection of reusable skills for atmospheric-science work. It adds domain judgment for research questions and evidence, data acquisition, scientific calculations, figure design, stage-result presentations, and atmospheric-model diagnosis while leaving general task planning, coding, tool use, and context management to the host agent. The same `skills/` source works across Codex, Claude Code, and Hermes.

## Quick Start

After installation, describe the scientific task naturally or name a skill explicitly. Codex uses `$metforge-data`, Claude Code uses `/metforge:metforge-data`, and Hermes uses `/metforge-data`; natural-language activation also works. These prompts can be copied directly:

| Scenario | Prompt |
|---|---|
| Develop a research project | `Use $metforge-project to develop spcz-moist-margin through focused questions, then maintain doc/core/research/spcz-moist-margin/proj.md and log.md. Start from my notes and ask one key question at a time.` |
| Download reanalysis data | `Use $metforge-data to download ERA5 hourly u and v at 850 hPa for 10°S–10°N, 80°E–180°E during DJFM 2000–2020. Validate one month before scaling up.` |
| Inspect and prepare local data | `Use $metforge-data to inspect these NetCDF files, verify coordinates, units, calendar, and missing values, then design a memory-safe xarray preprocessing script.` |
| Calculate an atmospheric index | `Use $metforge-analysis to calculate this SPCZ intensity and orientation index. State the exact domain, weighting, baseline, units, and validation before running it.` |
| Trend, filtering, and statistics | `Use $metforge-analysis to detrend and 20–100-day filter this continuous daily field, then calculate EOFs, regression maps, and lag composites with serial-dependence-aware uncertainty.` |
| Design an atmospheric figure | `Use $metforge-figure to turn these MJO composite fields into a clear longitude–time figure with consistent scales, units, and propagation guides.` |
| Audit an existing figure | `Use $metforge-figure to audit this multi-panel map for scientific comparability, color normalization, labels, projection artifacts, and export quality.` |
| Diagnose a dynamical-core test | `Use $metforge-model-diagnose to determine why RMS error grows in this balanced-flow test and propose the smallest experiment that separates spatial imbalance from a growing computational mode.` |
| Summarize a completed analysis stage | `Use $metforge-ppt to summarize this verified stage using the academic template, keeping the source figures, methods, counterexamples and unresolved questions visible.` |
| Combine analysis and visualization | `Use $metforge-analysis to calculate the diagnostic fields and statistics, then use $metforge-figure only for the panels needed to support the conclusion.` |

## Skills

| Skill | Use it for | Example |
|---|---|---|
| [`metforge-project`](skills/metforge-project/SKILL.md) | Clarify research questions and hypotheses through dialogue; create, resume, and update `proj.md` and `log.md` | “Use `$metforge-project` to turn this research idea into a concise project core.” |
| [`metforge-data`](skills/metforge-data/SKILL.md) | Find, download, subset, validate, and document atmospheric datasets | “Use `$metforge-data` to download ERA5 hourly winds for this domain.” |
| [`metforge-analysis`](skills/metforge-analysis/SKILL.md) | Calculate indices, meteorological diagnostics, trends, filters, EOFs, regression, and composites | “Use `$metforge-analysis` to calculate this circulation index and its trend.” |
| [`metforge-figure`](skills/metforge-figure/SKILL.md) | Design, create, revise, and audit atmospheric-science figures | “Use `$metforge-figure` to turn these balance-test outputs into a publication-ready comparison.” |
| [`metforge-ppt`](skills/metforge-ppt/SKILL.md) | Summarize validated stage results in an editable, template-based research presentation | “Use `$metforge-ppt` to turn the completed P1 results into a group-meeting talk.” |
| [`metforge-model-diagnose`](skills/metforge-model-diagnose/SKILL.md) | Diagnose dynamical-core tests, numerical experiments, balance, conservation, convergence, and error growth | “Use `$metforge-model-diagnose` to determine why the balanced-flow experiment drifts.” |

Each directory under `skills/` is an independent installable unit. The skills may cooperate, but none requires a central orchestrator.

## Literature-grounded analysis

Before scientific computation, metforge-analysis requires a published method matched to the question and intended interpretation, with the actual method section/equation verified. Only small, documented adaptations are allowed. A standard formula or software package does not justify an otherwise unsupported diagnostic or physical attribution.

When project references are insufficient, search the literature. If no applicable method or necessary methodological detail can be established, stop that analysis and report the search, missing evidence, and work not run. Do not invent a replacement to keep producing results. See the [method-provenance gate](skills/metforge-analysis/references/method-provenance.md).

## Stage-result presentations

At a coherent, validated analysis milestone, `metforge-analysis` hands the stage evidence to `metforge-ppt`, unless the user opts out or requests a narrower format. This happens after stage acceptance, not after every computation. The deck reuses verified outputs; it does not bypass the published-method gate or add new scientific evidence.

`metforge-ppt` uses a locally registered academic template, a concise research-talk style profile, and tested OOXML template/integrity helpers. User-supplied templates remain private and are not distributed in this public repository. Register a local default with `python skills/metforge-ppt/scripts/template_path.py --register /path/to/template.potx`; it is stored outside managed skill folders and survives updates. It favors one finding per slide, large scientific evidence, short interpretation, source/method captions, and a clear established/unresolved ending. A user-supplied template takes precedence. Deliverables include editable PPTX, available preview, notes and reproducible sources. Renderer and font limitations are disclosed.

## Research project documents

`metforge-project` develops the scientific design through a short, adaptive interview. It separates literature, observations, hypotheses, and interpretation. Existing project notes are reused; unresolved choices remain visible until the researcher settles them.

```text
Use $metforge-project to start a project named spcz-moist-margin from these notes. Ask one key question at a time.
Use $metforge-project to resume spcz-moist-margin from its documents and continue the next open question.
Use $metforge-project to update spcz-moist-margin from this new evidence: append log.md, reassess H1, and revise the affected parts of proj.md.
```

The documents belong in the active research repository at `doc/core/research/<projname>/`: `proj.md` holds the concise current core, and `log.md` retains dated evidence and decisions. Meaningful checkpoints save the draft and next question for later sessions. Confirmation of the plan does not verify its hypotheses; initialization records no experimental results unless actual evidence was provided. Detailed execution records stay in the project's existing provenance location.

## Install

### Codex

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

#### Update an existing Codex installation

Run these commands from your existing MetForge checkout on `main`:

```bash
git pull --ff-only origin main
scripts/install-codex-skills.sh
scripts/install-codex-skills.sh --check
```

This fetches the latest source, syncs every skill (including newly added skills), and verifies the installed copies. If you originally used `--dest PATH`, pass the same option to both installer commands. Keep custom changes in the source checkout: syncing replaces managed installed copies. If Git cannot fast-forward because of local changes, reconcile them before retrying; the update does not reset your work. If a new skill is not visible, open a new agent conversation.

### Claude Code

Register this repository as a marketplace, then install the MetForge plugin:

```text
/plugin marketplace add yuanruichen/MetForge
/plugin install metforge@metforge
```

Claude Code discovers all six skills from the shared `skills/` directory. They are available as `/metforge:metforge-project`, `/metforge:metforge-data`, `/metforge:metforge-analysis`, `/metforge:metforge-figure`, `/metforge:metforge-ppt`, and `/metforge:metforge-model-diagnose`.

### Hermes

Add MetForge as a public Skills Hub tap:

```bash
hermes skills tap add yuanruichen/MetForge
```

Install the skills directly from GitHub:

```bash
hermes skills install yuanruichen/MetForge/skills/metforge-project
hermes skills install yuanruichen/MetForge/skills/metforge-data
hermes skills install yuanruichen/MetForge/skills/metforge-analysis
hermes skills install yuanruichen/MetForge/skills/metforge-figure
hermes skills install yuanruichen/MetForge/skills/metforge-ppt
hermes skills install yuanruichen/MetForge/skills/metforge-model-diagnose
```

Hermes treats third-party taps as community sources and security-scans skills during installation.

## Design principles

- Domain judgment over agent orchestration.
- A small, testable result before a costly run.
- Explicit scientific contracts: variables, units, coordinates, hypotheses, metrics, and evidence.
- Choose direct execution or Slurm from the actual runtime, data volume, and cost instead of assuming one environment.
- Append a processing record after every completed download, calculation, model run, or render stage.
- Raw inputs remain immutable; derived products remain reproducible.
- Figures are scientific arguments and are inspected after export.
- Claims are separated into evidence, interpretation, and unresolved uncertainty.

Codex, Claude Code, and Hermes share the same skill directories; platform-specific files contain distribution metadata only.
