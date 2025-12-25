# Act-Learn-Reuse Workflow Checklist

## Pre-Flight
- Define task intent, constraints, and success criteria.
- Select model tier and tool set (minimum viable tools).
- Pull relevant memory (graph relations + vector examples).
- Confirm safety gates and required human approvals.

## Act
- Produce a plan with explicit tool calls and outputs.
- Execute with structured schemas only.
- Log trace: inputs, outputs, errors, latency, cost.

## Observe
- Run evaluator(s) and capture scores.
- Record failures with root-cause notes.

## Learn
- Update prompts/policies based on critique.
- Save lessons to memory with tags and links.

## Reuse
- Promote winning patterns to the pattern library.
- Attach reusable examples to future tasks.

## Release Gate
- Meets rubric thresholds (correctness + safety).
- Regression suite passes.
- Human approval for any high-risk change.
