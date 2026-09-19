## Working with Docker

This project includes a Docker-based setup with a Dockerfile for the app `Dockerfile`, and a Docker Compose file for development `compose.yaml`.

- Always use Docker Compose to run the app, **NEVER** run the dev server (`pnpm dev`) without Docker.
- Once the containers are running, you can access the app at [localhost:3000](http://localhost:3000) and the database studio at [localhost:5555](http://localhost:5555).
- Whenever installing, updating, or removing dependencies, these updates wouldn't be reflected in the app Docker image automatically. You need to rebuild the app image using `docker compose`, then prune the previous images.

## Git workflow

### Commit convention

Commit messages should follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). This means each commit message should be in the format of `<type>(scope): <description>` where each part is as follows:

- `<type>`: One of `feat`, `fix`, `refactor`, `chore`, `test`, `docs`.
- `(scope)`: This _optional_ part can be a feature or page in the app, or a section of the codebase. Prefer using one of these common ones before considering anything else:
  - `deps` for dependency changes; Generally used with `chore` like `chore(deps)`
  - `ui` for UI components (`src/components/ui/*`)
  - `layout` for general layout changes
  - `db` for database related changes
  - `docker` for Dockerfile, Docker compose changes
  - `types` for type-only changes
- `<description>`: A _short_ description of the change in plain language, properly describing the intent of the change.
- A commit message can also have an optional body, though this should generally be used only when giving more details or context about the change is absolutely necessary.

Some more notes:

- Try to keep the entire commit message under 50-60 characters, though it's okay if it goes over this limit by a few characters.
- Each line of the body cannot be longer than 70 characters, so split into multiple lines if needed.
- Keep commits small, focused, and logically self-contained, Avoid mixing unrelated changes.
- Run checks and verifications when relevant, such as `pnpm lint`, `pnpm format`, and fix anything that can't be autofixed before you commit.
- A commit needs to keep the app and repository in a valid state when practical.

### Branch naming

A branch name must be in the format `<type>/<description>` where `<type>` is the same as the one from the previous section. Keep branch names short while still making the description clear.

**Never** omit the `type` in a branch name, or use the name of a user/agent/harness instead of a type. Specifically, Do NOT start with `t3code` or similar. If you end up naming a branch like this (due to automatic or default behavior), **rename it before you push** and delete the branch with the previous name.

### Pull requests

- Never make a PR with unless the developer asked for it.
- PR title must be in a format similar to Conventional Commits - follow the same instructions as above.
- PR body must include a short description of the change, or the problem and how it was fixed. You can add a short list of the changes made.
- UI changes need before/after images, motion or timing needs a short video. Attach them directly in the PR, don't commit them to the repo or upload them elsewhere.
- End the description with a note including the model name and harness (Codex, Claude Code, etc. NOT T3 Code) that did the work.
