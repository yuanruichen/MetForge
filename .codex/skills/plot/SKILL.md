---
name: plot
description: Create or refine atmospheric science figures such as maps, sections, Hovmoller diagrams, profiles, and multi-panel diagnostics.
---

# Plot

Use this skill for scientific visualization tasks.

## Instructions

- Use matplotlib as the default plotting backend.
- Use cartopy for geographic maps when needed.
- Set explicit figure size and DPI.
- Label axes and colorbars with variable names and units.
- Include period, season, or sample definition.
- Include method details such as filter window or anomaly definition.
- Keep multi-panel layouts readable.
- Save final outputs under `output/figures/`.
- Save both PNG and PDF when practical.

## Verification

- Confirm files exist.
- Inspect the figure when possible.
- Run the `figure-audit` skill for final scientific figures.
