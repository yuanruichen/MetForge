# Published-method provenance and stopping conditions

## Match the method to the scientific question

Use published scientific methods, not a diagnostic invented to fit the available variables or a desired story. Start from the project's papers and the user's reference library when available. Inspect primary methods sections, equations, appendices, or an authoritative published definition; a title, abstract, review citation, software name, or another agent's summary is insufficient when the operational method has not been verified.

The source must support both the quantity being calculated and its intended scientific interpretation. A standard balance equation can support a structural consistency check; it does not by itself support a new source-attribution scheme. A published variance diagnostic does not automatically support a causal or propagation claim.

A validated package is an implementation choice after method selection. Its availability does not establish that a diagnostic answers this research question.

## Pre-computation method record

For each distinct scientific diagnostic, record:

| Field | Required information |
| --- | --- |
| Question and target | What scientific question is being answered, and what quantity or relation is estimated? |
| Published source | Authors/year and DOI or stable primary-source link; identify the relevant method section, equation, page, or appendix. |
| Verified definition | Formula, steps, variables, assumptions, sampling, preprocessing, normalization, reference state, and inference supported by the source. |
| Current applicability | Whether the available variables, coordinates, cadence, domain, and samples satisfy those assumptions. |
| Adaptations | Source settings versus current settings, why differences are minor, and relevant validation/sensitivity checks. |
| Status and boundary | Method ready, minor adaptation ready, or method blocked; permitted conclusions and work not yet run. |

Link this record from the analysis specification and processing record. Reuse an already verified project method record when it actually matches the current question; do not redo a literature search merely for a routine rerun. A new quantity, normalization, decomposition, or stronger interpretation needs its own method check.

## What counts as a minor adaptation

Changes in domain, period, data source, pressure selection, or parameter settings can be minor only when the published diagnostic, assumptions, target quantity, and physical/statistical interpretation remain valid. State the difference and reason before computing, and check the relevant sensitivity.

The following are not minor adaptations merely because their ingredients are familiar:

- creating a new index, normalization, covariance partition, or combined metric without an applicable published method
- combining established procedures into a new diagnostic whose scientific meaning is not supported
- changing the target from structural consistency or association to forcing, feedback strength, circulation source, or causal propagation
- changing sampling/filtering/event definitions so the analyzed phenomenon or independent sample changes

Find a published method that supports the actual question and diagnostic, or stop. Do not automatically substitute an agent-designed exploratory method.

## When project references are insufficient

Search the literature before analysis. Use scientifically specific terms for the process, target quantity, and candidate diagnostic; inspect the methods citations of the closest papers where useful. Prefer primary scientific sources and read the operational method.

Record the sources/databases searched, queries or search concepts, the primary methods inspected, and why the nearest candidates do not answer the question or cannot be implemented. Do not claim that no method exists merely because a library/API is unavailable, one query is empty, or a paywalled paper cannot be read. If the necessary method cannot be established with the accessible evidence, report that exact limitation.

If search still does not establish an applicable method or the necessary methodological detail, stop the affected scientific calculation. Do not compute unsupported diagnostic results, tune a replacement using observed outcomes, or produce result figures or a mechanism report from that replacement. Necessary data inventory and method-search work may continue.

## Mathematical checks are not a substitute

Additivity, dimensional consistency, closure, limiting cases, and synthetic checks are useful implementation tests after method selection. Their success does not supply missing method provenance.

For example, if a total is defined as the sum of components, its covariance with those components necessarily obeys an additive identity. Normalizing by the total variance can yield terms that sum to one, negative terms, or terms greater than one. These properties do not independently identify physical causes or feedback strengths. Components sharing a variable can also be strongly correlated or anticorrelated by construction. The specific diagnostic and claimed use still need a matched published method.

## Method-blocked handoff

Report:

- the scientific question and exact diagnostic that remains unsupported
- what was searched and inspected, including the nearest references
- the missing methodological detail or mismatch in applicability/interpretation
- which calculations and result plots were not run
- what source, method detail, or revised scope would unblock the task

Record the blocker in the existing project log and update affected plans after that entry. Label existing unverified diagnostics as awaiting method review; do not silently promote them into supported findings. A methodological blocker is not a physical null result, and a plan or citation list is not a completed analysis.
