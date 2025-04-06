# CI/CD Workflow for Progress Forge Lang

This folder contains configuration files for continuous integration and continuous deployment (CI/CD) workflows.

## Workflow Files

- `workflows/ci.yml`: GitHub Actions workflow that runs tests and linting for pull requests and pushes to main and dev branches.

## Branch Protection

The file `branch-protection.yml` provides instructions for setting up branch protection rules in GitHub. These rules must be configured manually in the repository settings.

### Protection Rules

For both `main` and `dev` branches:

1. Require pull requests before merging
2. Require at least one approving review
3. Require status checks to pass (tests and linting)
4. Require branches to be up to date before merging
5. Apply these rules to repository administrators

## Setting Up Branch Protection

1. Go to your repository on GitHub
2. Click on "Settings"
3. Click on "Branches" in the left sidebar
4. Under "Branch protection rules", click "Add rule"
5. In the "Branch name pattern" field, enter the branch name (`main` or `dev`)
6. Configure the settings as described above
7. Click "Create" or "Save changes"

## CI Workflow Details

The CI workflow runs on every pull request to `main` or `dev` branches and on every push to these branches. It performs the following steps:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies
4. Runs ESLint to check code quality
5. Runs tests to ensure functionality

If any of these steps fail, the workflow will fail, and merging will be prevented if branch protection is properly configured.
