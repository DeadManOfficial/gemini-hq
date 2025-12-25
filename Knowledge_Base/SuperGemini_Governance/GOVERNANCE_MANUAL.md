# SuperGemini Governance Directive: SHIELDA Protocol

## 1. Structured Handling of Exceptions (SHIELDA)
- **Error-as-Value:** Do not throw generic errors. Return `{ success: false, error: "..." }`.
- **Classification:** Categorize errors into:
  - `InputValidationError` (User's fault -> Show Toast)
  - `SystemStateError` (App's fault -> Retry/Log)
  - `CriticalInfrastructureError` (Database down -> Circuit Break)

## 2. Context Engineering
The Context Window is a finite resource.
- **Curated Context:** Do not dump the entire file into the prompt. Use `grep` or `read_file` with line numbers to extract *only* relevant lines.
- **Scratchpads:** Maintain a separate "state file" for complex multi-turn reasoning to avoid polluting the chat history.

## 3. Agent Autonomy
- **Self-Correction:** Agents must verify their own output (e.g., run the build after writing code).
- **Atomicity:** File operations must be atomic. Write to a temp file, verify, then rename.
