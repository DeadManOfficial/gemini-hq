# Cognitive Architecture Roadmap

## Phase 0: Foundation (Week 0-1)
- Charter, workflow checklist, and evaluation rubric finalized.
- Baseline Act-Learn-Reuse loop defined.
- Initial skill approval list established.

Exit criteria:
- Core docs published and linked.
- Baseline metrics agreed.

## Phase 1: Observability + Evaluation (Week 1-3)
- Trace schema for plan, tool calls, outputs, and scores.
- Evaluation harness with pass/fail thresholds.
- Regression suite seeded with representative tasks.

Exit criteria:
- Automated grading on sample tasks.
- Rubric thresholds enforced.

## Phase 2: Memory and Reuse (Week 3-5)
- Knowledge graph schema and tagging policy.
- Vector memory for winning patterns.
- Retrieval policy tied to task intent.

Exit criteria:
- Memory reuse rate >= 20% on repeat intents.
- No degraded accuracy from retrieval.

## Phase 3: Prompt Factory + Routing (Week 5-7)
- Expert routing rules for domain selection.
- Prompt factory for dynamic context injection.
- Template versioning and rollback strategy.

Exit criteria:
- Expert routing accuracy >= 85%.
- Prompt iterations tracked with measurable gains.

## Phase 4: Self-Improvement Loop (Week 7-9)
- Automated prompt tuning based on evaluator feedback.
- Failure analysis workflow with policy updates.
- Guarded autonomy expansion (no unsafe actions).

Exit criteria:
- Success rate +15% vs baseline.
- Regression rate < 2% across releases.
