---
name: metforge-project
description: Develop and maintain concise research-project documents through an adaptive scientific interview. Use when the user wants to clarify a research idea, refine scientific questions or hypotheses, create or resume proj.md and log.md, or record how new evidence changes a project's interpretation and plan. Produces documents under doc/core/research/PROJECT/. Not for general software task planning, manuscript drafting, or executing atmospheric calculations.
license: MIT
metadata:
  author: yuanruichen
  version: "2026.10.26"
  tags: "atmospheric-science, research-planning, hypotheses, scientific-evidence, research-log"
---

# MetForge Project

Help the researcher decide what to investigate, how to distinguish explanations, and what evidence would change the plan. Develop the project through conversation; keep the current scientific core in `proj.md` and the evidence/decision history in `log.md`.

## Context and intent

1. Read applicable repository instructions. Locate the actual research repository, which may differ from the installed MetForge skill source. Resolve document paths from that repository root.
2. Read user-supplied notes and existing `doc/core/research/<projname>/proj.md`, plus recent relevant `log.md` entries. Reuse the user's terminology and decisions; do not start a fresh questionnaire when the answers already exist.
3. Infer one of three intents from the request:
   - **Start:** clarify an idea and develop a new project core.
   - **Resume:** recover the current core and open questions, then continue the interview.
   - **Update:** assess supplied evidence or a changed decision, append the log, and revise the affected core statements.
4. Confirm the project identity/path only if ambiguous. Reuse an existing slug; otherwise suggest a short folder name and establish it before writing. Never silently choose among multiple projects or replace an existing project with a template.

Resources belong to this skill directory, not the research working directory. Read [references/interview-guide.md](references/interview-guide.md) when starting or resuming an interview. Use the two `assets/` templates only when creating new documents; preserve existing headings and user-edited content during updates.

## Scientific interview

- Begin with a brief account of what is known and the most consequential unresolved issue. Ask **one focused question by default**, at most three closely related questions when useful, then wait for the user's answer. Do not supply an entire questionnaire or a finished project plan on the first exploratory turn.
- Choose the next question from the actual gap: scientific question/scope, literature basis, competing hypotheses, available evidence, diagnostic or experimental route, or milestone/acceptance criteria. These are coverage areas, not mandatory consecutive rounds.
- Explain why a consequential choice matters. Offer a few neutral alternatives when they help; label your proposed mechanisms, definitions, or methods as suggestions until the user adopts them. Do not steer the researcher toward a preferred result or assume every project needs a novel mechanism claim.
- After an answer, briefly restate the scientific decision it supports, distinguish what remains unresolved, and move to the next useful question. Challenge ambiguous causal claims with alternatives or possible counterevidence, without repeatedly reopening settled choices.
- Match the user's working language. If the user requests an immediate draft or skips a topic, produce an honest draft with unresolved items; do not impose an arbitrary minimum number of rounds.

## Convergence and persistence

A usable core states the question and scope, current hypotheses or exploratory alternatives, the evidence/method needed to distinguish them, and a near-term milestone with an acceptance or revision criterion. Unknown data availability can remain a named P0 feasibility task; complete analysis settings and successful results are not prerequisites for writing a plan.

- During discussion, retain **draft** status. Save meaningful agreed decisions and the next open question once the project path is established; do not log every conversational turn. If the user requests discussion without file changes, keep the draft in chat and offer it at the requested checkpoint.
- When the core is coherent, show a concise candidate synthesis and any consequential choices still pending. Treat explicit user answers and prior instructions as decisions; do not request confirmation again for the same choice or for ordinary document writes.
- Mark the core **confirmed** only when the user endorses that synthesis or explicitly asks to finalize it. This confirms the research plan, not its hypotheses. Preserve unresolved implementation details and scientific uncertainty.
- Stop asking when the remaining questions do not affect the current milestone. If the user pauses or the session ends, keep the draft, open questions, and next action recoverable from the two documents. Do not infer agreement from silence.

Create documents at:

```text
doc/core/research/<projname>/
  proj.md
  log.md
```

Use [assets/proj-template.md](assets/proj-template.md) for a short current snapshot: question, background, current hypotheses/status, technical route, plan/acceptance, current evidence, next actions, and necessary sources. Aim for a few minutes of reading; move execution detail to linked records rather than deleting scientific reasoning.

Use [assets/log-template.md](assets/log-template.md) for dated, uniquely identified entries. Record the basis, direct observations, interpretation/uncertainty, decision, and next action separately. Initialization is a documentation event with **no new experimental evidence** unless actual results were provided.

## Updating from evidence

1. Inspect the supplied evidence and its provenance. Say whether you verified a file/run, read a literature source, or received a user-reported result; do not present these as equivalent verification. Mark missing settings or inaccessible sources.
2. Identify the affected question/hypothesis and distinguish observations from explanations. Retain null results, counterexamples, competing explanations, and limits. A hypothesis may gain support, be weakened, be revised, or remain unresolved; do not default to confirmation.
3. Append a log entry first, then update only the affected `proj.md` statements, status/date, and next actions. Link changed judgments to the exact entry. Preserve history; correct an earlier entry through a new linked correction rather than rewriting it.
4. Link detailed run records in `output/logs/`, exact requirements versions, code, figures, and tables when they exist. The research log records their scientific implications; it does not duplicate processing transcripts. Documentation-only work needs no production-run requirements file.
5. Re-read the changes, check relative links/entry IDs, and ensure the core and log agree. Report what changed and the next unresolved issue. If file writing is unavailable, return the proposed documents/entry and state they were not saved.

## Evidence and workflow boundaries

- Separate literature findings, this project's observations, working hypotheses, and interpretation. Expected signatures and acceptance criteria are prospective; never turn them into completed findings. Verify new literature attributions when needed, otherwise mark them unverified.
- Match inference to the design: correlations, composites, budget decompositions, and model differences alone do not isolate a single causal mechanism. Consider sampling, dependence, confounding, missing terms, and relevant sensitivity tests.
- For atmospheric projects, check that the proposed variables, levels, calendars, averaging, and temporal resolution can support the diagnostic. For example, products of monthly means cannot recover within-month transient covariance; a budget residual is not automatically a transient term.
- This is a document-authoring workflow. Apply repository data/notebook/path safeguards. Suggest available data, analysis, figure, or model-diagnosis skills only for a concrete next task; planning does not itself authorize downloads, calculations, jobs, installations, or a full research pipeline. The skill remains usable on its own across host agents.
