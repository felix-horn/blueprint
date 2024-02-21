# Step by Step Guid

## Setting up a repo from scratch

1. GitHub > Your Repositories > New

1. Copy SSH address.

1. Navigate to folder in terminal.

1. `$ git clone git@github.com:felix-horn/blueprint.git`

1. Go into new folder.

1. `$ touch .gitignore` in order to create "gitignore" file as the very first thing so that ignored files won't be commited.

1. `$ code .`

1. Define `.gitignore` entries in editor.

1. `$ npm init` in order to create package.json. (yarn could be used alternatively but recently npm is as performant as yarn again.)

1. Configure package.json:
    1. entry point: index.js
    2. authoer: Felix Horn <flx.horn@gmail.com>
    3. license: UNLICENSED

1. `$ nvm install "lts/*"` in order to install latest nvm version.

1. `$ nvm alias default "lts/*"` in order to use the latest nvm version by default in every new terminal. It's needed for example for eslint or webpack (tooling written in JS) or for SSR.

1. `$ npm install -g npm@10.4.0` in order to install latest npm version (in this example 10.4.0 / `$ npm install -g npm@latest`). (This is already suggested - with the correct version - after `$ npm init`; however, nvm needs to be updated first in order to install npm.)

1. Create `src` folder. (in VS Code or `$ mkdir src`)

1. Create `dist` folder. (Grayed out in explorer > won't be commited to GitHub), the output of the build process goes here.

1. Add `"type": "module",` to package.json, in order to use ECMAScript modules for imports and exports (instead of the default "require").

1. Install the (dev) dependencies:

    - `react` & `react-dom` are needed during runtime and therefore it's not a devDependency.

    1. Install correct dependecy versions to `depedencies` or `devDependencies` in `package.json`
       - Dev dependencies are mostly used for tooling and won't be installed if a package itself functions as a dependency.
       - `$ npm install --save-dev @commitlint/cli @commitlint/config-conventional ...`
       - Version "^" means the latest minor and patch version so that a npm update won't (shouldn't) cause any problems (as opposed to "version: latest").
    2. `package-lock.json` and `node_modules` folder will be created outmatically.
      - `package-lock`: like `package.json` but with all sub-dependencies and their specific versions. As this file will be committed, other devs who check out this repo will know exactly, which versions of each package I used. NEVER git-ignore it. Only idiots would do that.
      - `node_modlues`: includes actual code of all (sub-)dependencies, which is used locall and bundled by webpack for example.

1. Add `.editorconfig` as formatting config for
    1. all file types (while e.g. eslint is just for typescript), and
    2. any editor besides VS Code. (Even if I was planning not to use another editor than VS Code, in `.editorconfig` the basics for other devs who use other editors are shared. That's why it's not included in the `.vscode/settings` file, even though that would technically be possible.)
    - `root = true` > If another `.editorconfig` existed higher up in the folder structure, `root = true` means to NOT use anything above the root level of this project.

1. Add `.vscode/extensions` will add recomendations to `Extensions > Recomendations`. (Again, has the basic setup for a shared repo in mind - just like `.editorconfig`.)

1. Add `.vscode/settings` VS Code  specific setting (on top of `.editorconfig`).

    - Several options are turned off, which are actually used but not by VS Code directly.
    - `"javascript.format.enable": false,` / `"prettier.enable": false,` / `"typescript.format.enable": false,`: Neither VS Code nor ESLint do the formatting.
    - ESLint is used for linting and prettier is for formatting - but not directly.
    - A prettier plugin for ESLint is installed (`package.json`) to be used not via VS Code but via ESLint.
    - config of prettier: not `.prettierrc` as in older projects but inline in `eslint.config.js`.
    - If `"editor.formatOnSave"` was `true`, VS Code would check, whether a plugin for formatting was available or else use the VS Code rules. As ESLint shall use the prettier plugin, this needs to be turned off.
    - prettier could of course also be used directly by VS Code and not via ESLint. However, then two separate configs need to be created and maintained. If don't incorrectly, those could contradict each other. Using prettier via ESLint makes it possible to just have one config file (`eslint.config.js`).
    - Therefore:

1. Set Up Linting and Formatting

    - Install dev dependencies:
      - `@commitlint`: linting git commit messages ("@" demoninates a name space which organzes several packages, but still every package works independently.)
        - "@commitlint/cli": command line interface for commitlint
        - "@commitlint/config-conventional": preset for config to lint the commit message in terminal e.g. "feat (s.th.): fix this thing"
        - "@commitlint/types": types to use with JSDoc syntax
      - `husky`: set up for git hooks (not "react hook"!! but validation which "hook" themselves into git) ("Automatically lint your commit messages, code, and run tests upon committing or pushing.")
      - `eslint`: ECMAScript linting
      - `eslint-plugin-react-hooks`: will handle react hook adjecent errors
      - `eslint-plugin-unicorn`: very strict linting rules

    - Add `eslint.config.js` as configuration for ESLint (and prettier).
      - As ESLint uses the flat config file, the exported defaults (configMeta and config) are used without specifically importing them.
      - The old format was `.eslintrc` or `.eslintrc.js` but with `"eslint.experimental.useFlatConfig": true,` in the `.vscode/settings.json` VS Code is configured to use the new (flat) format.
      - A config for markdown files would need dedicated extension and separate config file.

    - Add `commitlint.congig.mjs`:
      - `mjs` file: ECMAScript module js as commitlint starts node.js in a way that causes it to read .js files as common.js modules (instead of ECMAScript modules) even though it's defined in `package.json` (`type: module`) otherwise.

    - Add `lint:commit` script, which is used in CI, in order to check whether the latest added commit has a valid commit message. "Latest" is determined by checked the commit message from the the second to last to last git ref. This is necessary to make sure that no invalid commit message stays unnoticed, even in cases where the developer has disabled local git hooks (`$git --no-verify`).

    - Add `commit-msg` file in `.husky` folder.
    - Add npm script `setup:git-hooks`.
    - Every dev who checks out this repo needs to run this setup script in oder to install husky with the same commit config as used above for commitlint.

1. Set Up TypeScript

    - Install dev dependency:
      - `@typescript-eslint`: A project, which can lint not only JS but also TS. ("@types" namespace: typ package for packages that aren't typed, e.g. "@types/esling" is a type package for eslint.)
    - Add `tsconfig.json` configuration which is used by `$ tsc` and VS Code.
        - Configers `noEmit: true` which is overwritten in `tsconfig.build.json`. (s. below) `$ tsc` does a type check and transpiles TS. `noEmit: true` turns off the transpilation part. Therefore, `$ tsc` can be used for the `ts:check` script in the `package.json`. (Alternatively the `ts:check` script could be written as `"tsc --noEmit`. This flag can be found with `$ npm exec -- tsc --help`. `--`: npm also has flags. In order to differentiate the `--` denotes everything after the comand is an input for it (in this case `tsc`).)
        - As opposed to a joint linting and formatting config (`eslint.config.js`), two separate configs for linting errors (e.g. no console log) and transpilation errors (TS errors) (e.g. object with key without values) does makes sense: TS errors would make it impossible to transpile while lint errors wouldn't.
    - Add `tsconfig.build.json` which is later used in webpack. Configures `noEmit: false` in order to switch the transpilation back on, which was turned of in the `tsconfig.json`, and excludes unit test files from the build.
    - Add `tsconfig.meta.json` to type check config files ("and making me better than most devs" Quote Lennar :)

1. Add `src > main.ts` (also fixes error in `tsconfig.json`)

1. Run `$ npm exec -- tsc --project tsconfig.build.json` in ordert to transpile `main.ts` without webpack.

    The following files will be created:

    - main.js
    - main.js.map: source map
    - tsconfig.build.tsbuildinfo: for future incremential builds
    - main.d.ts: includes all tyes which are stripped from the main.js
    - main.d.ts.map: source map for declaration file

1. Create `webpack.config.js` and copy&paste from Lennart's common repo.

    - Install dev dependencies:
      - webpack`
      -`@types/webpack` are needed for later setup of webpack.
      - `webpack-cli`: to use cli to interact with webpack (In order to keep core package of webpack small, it can be installed additionally to webpack if the user has a need for that. We need it as webpack needs it when executed. (Still don't get the use case that a user only needs webpack without webpack-cli then...))
      - `webpack-dev-server`: same as above
      - `html-webpack-plugin`: "rites updated file name (hash) of JS bundle (or other outputs) in script tag of html file (s. below).
      - `css-loader`: teaches webpack how to understand CSS
      - `css-minimizer-webpack-plugin`: minimizing output from css loader
      - `mini-css-extract-plugin`: makes webpack put out the minimized css.

    - `/** *@typedef*/` syntax: `webpack.config.js` is a JS and not a TS file. Therefore, no types exist. (It's a JS file as NodeJS can only read JS.) In order to use types anyways, the "JSDoc" syntax is used:

        `@typedef` + `@type`: define type (In a TS file this would be: `export type XYZ = {...}`)
        `@type` (2nd one): assignment of type (In a TS file this would be: `const xyz: XYZ`)

1. Add `build` script to `package.json`:

    - `WEBPACK_CLI_FORCE_LOAD_ESM_CONFIG=true`
      - Is an environment variable (which exists on the shell level).
      - Therefore, it's written before the `webpack` command, so that it's executed first as webpack needs to find that variable in env. (Show all env variables for the current shell: `$ env`).
      - The command can be found in the webpack documentation and instructs webpack to use flat config (`webpack.config.js).

      - webpack

1. Add `serve` script to `package.json`:

      - `serve` is an argument, not an environment variable as described above. That's why it's written after `webpack`.
      - How does `webpack serve` work as a command? How does the CLI and then npm know what to do with it?
      - `webpack serve` is the same as if I wrote directly in the terminal `$ npm exec webpack serve`.
          1. User starts iTerm2 (terminal emulator).
          2. iTerm2 executes zsh (shell).
          3. zsh shows the (comand) prompt (repl).
          4. User types `npm exec webpack serve`.
          5. zsh searches $PATH for `npm`.
          6. npm is executed with arguments `exec webpack serve`.
          7. npm internally uses first argument `exec`.
          8. npm exec searches `node_modules` for bin fields in `package.json`.
          9. npm finds webpack bin field pointing to `webpack.js`.
          10. npm executes `webpack.js` with argument `serve`.

      - What does webpack actually do?
          1. Goes to the entry file specified in `webpack.config.js`: `main.tsx`.
          2. Runs the code including
              - imported files from the repo, and
              - imported dependencies (from `node_modules` folder).
          3. Transpiles this into one (really long) JS file. (This version includes the hot module reload for the browser to react to changes instantly. This would not be included in the output of CI/CD, as for that version it's not needed.)
          4. Saves it in `dist` folder under filename `[name].[contenthash].js`.
          5. Creates `main.css` from all CSS files into one and saves it in `dist` folder as well.
          6. Creates `index.html` with a
              - script tag which links to hashed JS file, and
              - link tag which links to CSS file.

              End of `build` script. Only used by CI.

          7. Starts webpack dev server on port 3000.
          8. Creates setup so that build output never reaches dist folder but is served directly from RAM.

              End of `serve` script.

      - How does the browser get it?
          1. User types "example.com" into browser.
          2. Browser asks OS what IP adress does "example.com" have?
          3. OS does DNS stuff.
          4. Browser sends http request to IP address (e.g. 192.168.0.1) with path `/`.
          5. Webserver behind "example.com" matches path `/` to index.html.
          6. Browser receives index.html.
          7. Browser parses html and finds script tag with src attribute pointing to JS bundle.
          8. Browser sends http request to IP address 192.168.0.1 with path `/[name].[contenthash].js` and `/main.css`.
          9. Browser creates html out of JS file.

1. Create CI

      - Create folders `.github` and `workflows`.
      - Create `pipeline.ylm.
      - Copy content from Lennart and delete unncessary parts. (Details in file.)
      - Add scripts to `package.json`:
          - `"lint:check": "eslint --ignore-pattern \"dist/**/*\" --ignore-pattern \"node_modules/**/*\" .",`
              - `node_modules` > `eslint` > `package.json` > `bin` > `eslint`
              - The `--ignore-pattern` flag can be found with `$ npm exec -- eslint --help`.
              - REGEX means to ignore everything in `dist` and `node_modules` folders (with escaped `"`).
              - Root (`.`) is entry point, not src because also want to check config files with the coresponding lint configs (`[configMeta, config]`).
          - `"lint:fix": "eslint --fix --ignore-pattern \"dist/**/*\" --ignore-pattern \"node_modules/**/*\" .",`
              - Like `lint:check` but with `--fix` flag: "Automatically fix problems".
          - `"ts:check": "tsc"`
              - Without `--noEmit` flag, as this was turned off in `tsconfig.json` with `"noEmit": true`.

1. Create Unit Testing

    - Install dev dependencies:
        - `jest`
        - `@jest/globals`: for describe, expect, test
        - `ts-jest`: types for jest
    - Create `jest.config.js`. (details in file)
    - Add scripts to `package.json`:
        - `"test:unit": "jest src"`
            - `src`: Why not `src`?

1. Create End to End Testing

    - Install dev denpendency:
        - `cypress`
    - Cypress config (`cypress.config.js`) is not needed as Cypress' default behavior is sufficient.



