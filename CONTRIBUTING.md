# How to contribute

## Getting started

- Fork the repository on GitHub
- Read the [README.md](README.md) for build instructions

## Contribution flow

This is a rough outline of what a contributor's workflow looks like:

- Create a new issue explaining what you want to contribute
- Create a topic branch from where to base the contribution
- Make commits of logical units
- Make sure commit messages are in the proper format
  ```
  Type: Commit message (#issue number)

  * Type can be one of the following:
    feat, fix, refactor, style, test, docs, ...
  * Commit message should be simple and easy for the viewer to understand.
  ```
- Before push, check the followings:
  - Did you format the code with prettier?
  - Are all eslint errors resolved?
  - Is the build completed successfully?
  ```bash
  $ node_modules/.bin/prettier --write .  # or npx prettier --write .
  $ node_modules/.bin/eslint .            # or npx eslint .
  $ npm run build
  ```
        
- Push changes in a topic branch to a personal fork of the repository
- Submit a pull request to Haru-Dashboard in template form
- The PR must receive a LGTM from maintainers

Thanks for contributing!
