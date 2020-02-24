# Contributing

## Important notes
Please don't edit files in the `dist` subdirectory as they are generated via Grunt. You'll find source code in the `src` subdirectory!

### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.**

## Modifying the code
First, ensure that you have the latest [Node.js](https://nodejs.org) and [npm](https://npmjs.com) installed.


1. Fork and clone the repo
1. Run `npm install` to install all dependencies
1. Run `npm run test`

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
1. Add failing tests for the change you want to make. Run `npm run test` to see the tests fail.
1. Fix stuff.
1. Run `npm run test` to see if the tests pass. Repeat steps 2-4 until done.
1. Open `tests/index.html` unit test file(s) in actual browser to ensure tests pass everywhere.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.
