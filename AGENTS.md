# Project Coding Standards and Conventions

## Configuration and Tooling

- The project root contains configuration files for building, linting, and documentation generation.
- Key files include:
  - `package.json`: Project dependencies and scripts
  - `docusaurus.config.js`: Main Docusaurus configuration
  - `sidebars.js`: Sidebar navigation structure
  - `babel.config.js`: Babel transpilation configuration
  - `tailwind.config.js`: Tailwind CSS styling configuration
  - `algolia.json`: Search configuration
  - `_redirects`: URL redirect rules

## Documentation Structure

- Main documentation content is located in `docs/`, organized by topic
- Documentation files use `.md` or `.mdx` extensions (MDX for React component integration)
- Reusable content snippets are stored in `docs/_partials/`
- Static assets (images, diagrams, etc.) are placed in `static/`
- Custom React components for documentation are in `src/components/`
- Navigation categories are defined using `_category_.yml` files

## Git Commit Message Conventions

- Follow Conventional Commits specification: `<type>: <description>` (no scopes, single sentence)
- Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- Description should be imperative mood, lowercase, single sentence, no multi-line descriptions
- Examples: `docs: add openfeature integration guide`, `fix: correct broken link in quickstart`
- Keep commits focused and atomic

## Git Branch Naming

- Always use `-` (not `/`) in branch names
- Start branches with conventional commit prefix
- Include Linear ticket number if available: `docs-fdn-561-new-guide` where `FDN-561` is the ticket number
- Examples: `docs-update-sdk-guide`, `fix-broken-links`, `feat-fdn-123-new-integration`

## Documentation Conventions

- Use clear, concise language appropriate for technical documentation
- Code blocks should specify language for proper syntax highlighting
- Use relative links for internal documentation references
- Image paths should be relative to the `static/` directory (e.g., `/img/feature.png`)
- API references and SDK documentation should follow established patterns in `docs/sdk/`
- Keep frontmatter minimal and consistent across similar document types

### Aviator CLI Workflow (optional)

- Use Aviator CLI (`av`) for managing stacked branches: `av branch chore-fix-invalid-input`
- Sync and push changes: `av sync --push=yes`
- Create PR: `av pr --title "<title>" --body "<body>"` (title follows Conventional Commits, body uses markdown/bullets, `av pr` will push the branch)
- GitHub PR descriptions should be short and mainly focus on the reasons the changes were made in this PR, with minimal additional descriptions about testing state and listing the changes made.
