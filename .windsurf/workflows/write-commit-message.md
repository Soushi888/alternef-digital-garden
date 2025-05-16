---
description: Workflow for analyzing changes and writing meaningful git commit messages
---

# Write Git Commit Message Workflow

This workflow guides you through the process of analyzing changes and writing a clear, informative git commit message for the Alternef Digital Garden. This workflow will ONLY analyze changes and suggest a commit message - it will NEVER perform the actual commit.

## 1. Check Repository Status

- Run `git status` to see which files have been modified, added, or deleted
- Note the general areas of the codebase that have been affected (content, components, configuration, etc.)

```bash
git status
```

## 2. Review Staged Changes

- Run `git diff --staged` to see the specific changes that have been staged for commit
- This will show you the exact lines that have been added, modified, or removed

```bash
git diff --staged
```

## 3. Handle Large Diffs

If the diff output is too large or truncated:

- Identify the most important or representative files that have been changed
- Run individual diffs on these files to understand the changes better

```bash
git diff --staged path/to/important/file.md
```

## 4. Analyze Content Changes

For content files (Markdown notes, blog posts, etc.):

- What new content was added?
- What existing content was modified?
- Were there structural changes to the content organization?
- Were there changes to frontmatter, tags, or links?

## 5. Analyze Code Changes

For code files (TypeScript components, configuration, etc.):

- What functionality was added, modified, or removed?
- Were there bug fixes or performance improvements?
- Were there changes to dependencies or build configuration?
- Were there style or UI changes?

## 6. Categorize the Changes

Determine the primary category of changes:

- `feat`: New feature or significant enhancement
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc. (no code change)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Maintenance tasks, dependency updates, etc.
- `content`: New or updated content in the digital garden

## 7. Craft the Commit Message

Follow this format for the commit message:

```text
<type>(<scope>): <short summary>

<body>

<footer>
```

Where:

- `<type>`: The category from step 6
- `<scope>`: The area of the codebase affected (optional)
- `<short summary>`: A concise description (50 chars or less)
- `<body>`: Detailed explanation of the changes (optional)
- `<footer>`: References to issues, breaking changes, etc. (optional)

### Examples

```text
feat(content): add permaculture principles note

Add comprehensive note on permaculture principles with detailed explanations
of each principle and practical applications. Include links to related
concepts and appropriate tags.
```

```text
fix(components): resolve mobile menu display issue

Fix issue where main menu wasn't properly displaying on mobile devices
below 375px width. Adjust media queries and overflow handling.

Closes #42
```

## 8. Consider Conventional Commits

For more structured commit messages, consider following the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- Breaking changes should be indicated with `!` after the type/scope
- Include `BREAKING CHANGE:` in the footer with explanation

Example:

```text
feat(api)!: change authentication endpoint response format

BREAKING CHANGE: Authentication endpoint now returns JWT token in 
response body instead of header
```

## 9. Review the Commit Message

Before finalizing:

- Ensure the message accurately reflects all important changes
- Check that the summary is concise but descriptive
- Verify that any issue references are correct
- Make sure the message follows project conventions

## 10. Suggested Commit Message Format

Once the commit message is crafted, it will be presented as a suggestion in the following format:

```text
Suggested commit message:

type(scope): short summary

Detailed explanation of changes.
```

IMPORTANT: This workflow will NEVER execute the commit command. You must manually run the commit command yourself using the suggested message:

```bash
git commit -m "type(scope): short summary" -m "Detailed explanation of changes."
```

Or for multi-line messages, use the editor:

```bash
git commit
```

Then enter the full commit message in the editor that opens.

## Additional Tips

- Keep the first line (summary) under 50 characters
- Wrap the body text at around 72 characters
- Use the imperative mood ("add feature" not "added feature")
- Explain the "why" behind changes, not just the "what"
- Reference relevant issues or pull requests when applicable
- For content changes, mention which knowledge domains were affected
