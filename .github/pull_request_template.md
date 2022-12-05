### How to open a PR

- Add a description generally explaining the purpose of the PR.

- Put Jira ticket # in pr subject.

- Notify the reviewer with a slack message containing the PR link

### PR checklist

Make sure the following items are done:

**Mark with [x] Items that are done**

- [ ] PR must adhere to UI-Infra coding style and quality as described in the rnd-docs

- [ ] Unit tests for all new logic - coverage 75%+

- [ ] `componentBaseTest` in ALL Component tests

- [ ] Changelog with new logic description  
       Changelog must be entered:  
       1. Under Unpublished  
       2. With the owner's github name  
       3. Add link to PR if applicable (`#<pr number>`)  
       e.g: Added explanation to `pr_request_template` ([#3](https://github.com/guestyorg/jarvis/pull/2))(@Jony-Y)

- [ ] No tests/Linter/snapshots issues

- [ ] Storybook example (if applicable)

- [ ] PropTypes documented (if applicable)

- [ ] Aligned with `master`
