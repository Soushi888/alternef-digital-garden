---
tags:
  - programmation
  - DevOps
related pages: []
---
## Understanding Changelogs

A **changelog** is a document that lists the significant changes made in each version of a software project. It serves as a communication tool between developers and users, providing a clear overview of what has changed since the last release. This transparency helps users understand the evolution of the software and aids in troubleshooting issues related to specific versions.

## Importance of Keeping a Clean Changelog

Maintaining a clean and accurate changelog is crucial for several reasons:

- **Clarity for Users**: Users can easily identify what has changed between versions, helping them decide whether to upgrade or not based on the features and fixes introduced.
- **Developer Collaboration**: Developers can refer to the changelog to understand the history of changes, facilitating collaboration and understanding among team members.
- **Documentation**: Serves as a form of documentation, providing a historical record of the project's development.

## Tips for Keeping a Clean Changelog

1. **Consistency**: Ensure that every version has an entry in the changelog. This consistency helps users and developers navigate through the project's history effortlessly.
2. **Group Similar Changes**: Categorize changes logically, grouping similar types of modifications together. This organization makes it easier to scan through the changelog.
3. **Linkability**: Make versions and sections linkable, allowing readers to jump directly to specific entries or details.
4. **Follow [[Semantic versioning]]**: Indicate whether your project follows semantic versioning. This standard helps users predict the nature of changes between versions.
5. **Use `CHANGELOG.md`**: Name your changelog file as `CHANGELOG.md`. This naming convention helps users locate the changelog easily within the project repository.

## Automating Changelog Generation

While manual updates are essential for accuracy, automating certain aspects can save time. Tools like `git log` can generate a draft changelog based on commit messages. However, it's crucial to manually review and edit these drafts to ensure they are understandable and relevant to users.

Example command for generating a draft changelog:
```bash
git log --pretty=format:'%h %s' > CHANGELOG.md
```

## Conclusion

Keeping a clean changelog involves careful consideration of its audience—both developers and users—and ensuring it reflects the project's evolution clearly and concisely. Automation can assist in drafting changelogs, but manual intervention is necessary to maintain clarity and relevance.

Citations:
[1] https://keepachangelog.com/en/1.1.0/
[2] https://www.reddit.com/r/devops/comments/mlso73/keeping_a_changelog_file/
[3] https://devm.io/programming/dos-donts-keeping-changelog-147373
[4] https://common-changelog.org/
[5] https://stackoverflow.com/questions/3523534/what-are-some-good-ways-to-manage-a-changelog-using-git
[6] https://softwareengineering.stackexchange.com/questions/266353/whats-the-purpose-of-keeping-a-changelog-if-everyone-uses-their-vcs-properly
[7] https://www.freecodecamp.org/news/a-beginners-guide-to-git-what-is-a-changelog-and-how-to-generate-it/
[8] https://news.ycombinator.com/item?id=29438221
[9] https://github.com/olivierlacan/keep-a-changelog
[10] https://news.ycombinator.com/item?id=9054627
