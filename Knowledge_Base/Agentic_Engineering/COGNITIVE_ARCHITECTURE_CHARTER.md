# Cognitive Architecture Team Charter

## Mission
Build and continuously improve the Act-Learn-Reuse system that powers expert, non-generic agent behavior with measurable quality, safety, and efficiency.

## Scope
In-scope:
- Act-Learn-Reuse loop design and instrumentation
- Prompt factory and expert routing patterns
- Memory systems (graph + vector) and retrieval policy
- Evaluation harnesses and regression gates
- Tool interface design and schema enforcement

Out-of-scope:
- Product feature delivery outside agentic infrastructure
- Offensive or harmful use cases
- Unreviewed auto-deploys or destructive operations

## Operating Principles
- Prompt-first, data-first; code is a compiled artifact.
- Deterministic interfaces; no free-form tool calls.
- Every run leaves a trace (plan, output, eval).
- Safety gates before autonomy expansion.

## Interfaces
- GOV: SHIELDA compliance and policy alignment
- CRUCIBLE: quality gates and regression tracking
- DEVOPS: runtime safety, sandboxing, observability
- NEURAL CORE: architecture alignment and loop design

## Success Metrics
- Task success rate >= 85% on evaluation suite
- Regression rate < 2% per release
- Mean tool-call error rate < 1%
- Median time-to-resolution reduced by 30%
- Memory reuse rate >= 40% on repeat intents

## Decision Rights
- Approves agent workflow changes and evaluation gates.
- Can block releases that fail safety or quality thresholds.

## Safety Constraints
- Human-in-the-loop for high-risk actions.
- Adversarial testing is defensive and controlled.
- No unaudited self-modifying behavior in production.
