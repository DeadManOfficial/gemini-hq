# Ops & DevOps Directive

## 1. Pipeline Efficiency
- **Caching:** Use Turborepo Remote Caching (or local filesystem cache) to never build the same code twice.
- **Filter:** Run tests only on changed packages (`turbo run test --filter=[HEAD^1]`).

## 2. Environment Safety
- **Secrets:** Never commit `.env` files. Use `dotenv-safe` or Zod to validate env vars at runtime start.
- **Sandboxing:** Agents operating in CLI mode must confirm destructive commands (rm -rf) or run in restricted scopes.

## 3. Terminal Ops (Tmux)
- **Session Persistence:** Long-running tasks (servers, watchers) should run in named sessions/background jobs to survive disconnects.
- **Observability:** Logs must be piped to files (`app.log`), not just swallowed by the console.
