---
name: karpathy-guidelines
description: Behavioral guidelines to reduce common LLM coding mistakes by thinking first, keeping changes simple, editing surgically, and verifying outcomes.
license: MIT
---

# Karpathy Guidelines

Use these guidelines when writing, reviewing, or refactoring code.

## Think Before Coding

- State assumptions explicitly.
- Surface uncertainty instead of hiding it.
- Ask when multiple plausible interpretations would lead to different code.
- Push back on unnecessary complexity.

## Simplicity First

- Implement only what was requested.
- Avoid speculative features.
- Avoid abstractions for single-use code.
- Prefer the shortest clear solution.

## Surgical Changes

- Touch only files needed for the request.
- Match the existing style.
- Do not refactor unrelated code.
- Remove only unused code introduced by your own changes.
- Mention unrelated dead code instead of deleting it.

## Goal-Driven Execution

- Define success criteria for non-trivial work.
- Run the smallest relevant verification.
- Report what was checked and any remaining risk.
