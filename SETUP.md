# Step by Step Guid

## Setting up a repo from scratch

1. GitHub > Your Repositories > New
2. Copy SSH address.
3. Navigate to folder in terminal.
4. `$ git clone git@github.com:felix-horn/blueprint.git`
5. Go into new folder.
5. `$ touch .gitignore` in order to create "gitignore" file as the very first thing so that ignored files won't be commited.
6. `$ code .`
7. Define `.gitignore` entries in editor.
8. `$ npm init` in order to create package.json. (yarn could be used alternatively but recently npm is as performant as yarn again.)
9. Configure package.json:
    1. entry point: index.js
    2. authoer: Felix Horn <flx.horn@gmail.com>
    3. license: UNLICENSED

______________

10. `$ nvm install "lts/*"` in order to install latest nvm version.
11. `$ nvm alias default "lts/*"` in order to use the latest nvm version by default in every new terminal.
12. `$ npm install -g npm@10.4.0` in order to install latest npm version (in this example 10.4.0 / `$ npm install -g npm@latest`). (This is already suggested - with the correct version - after `$ npm init`; however, nvm needs to be updated first in order to install npm.)

_______________

13. Create `src` folder. (in VS Code or `$ mkdir src`)
14. Create `dist` folder. (Grayed out in explorer > won't be commited to GitHub), the output of the build prozesses goes here.
15. Add `"type": "module",` to package.json, in order to use ECMAScript modules for imports and exports (instead of the default "require").
16. Install the (dev) dependencies as c.
    - `@commitlint`: linting git commit messages ("@" demoninates a name space which organzes several packages, but still every package works independently.)
    - `@jest`, `jest`, `ts-jest`: unit testing
    - `@typescript-eslint`: A project, which can lint not only JS but also TS. ("@types" namespace: typ package for packages that aren't typed, e.g. "@types/esling" is a type package for eslint.)
    - `eslint`: ECMAScript linting
    - `husky`: set up for git hooks ("Automatically lint your commit messages, code, and run tests upon committing or pushing.")
    - `eslint-plugin-react-hooks`: will handle react hook adjecent errors
    - `eslint-plugin-unicorn`: very strict linting rules?
    - `react` & `react-dom` are needed during runtime and therefore it's not a devDependency
1. Install correct dependecy versions to `depedencies` or `devDependencies` in `package.json` (Dev dependencies are mostly used for tooling and won't be installed, if a package itself functions as a dependency.): `$ npm install --save-dev @commitlint/cli @commitlint/config-conventional ...` (version "^" means the latest minor and patch version so that a npm update won't (shouldn't) cause any problems (as opposed to "version: latest")
2. `package-lock.json` and `node_modules` folder will be created outmatically.
    - `package-lock`: like `package.json` but with all sub-dependencies and their specific versions. As this file will be committed, other devs who check out this repo will know exactly, which versions of each package I used.
    - `node_modlues`: includes actual code of all (sub-)dependencies, which is used locall and bundled by webpack for example.

18. Add `.editorconfig` as formatting config for
1. all file types (while e.g. eslint is just for typescript), and
2. any editor besides VS Code. (Even if I was planning not to use another editor than VS Code, in `.editorconfig` the basics for other devs who use other editors are shared. That's why it's not included in the `.vscode/settings` file, even though that would technically be possible.)

- `root = true` > If another `.editorconfig` existed higher up in the folder structure, `root = true` means to NOT use anything above the root level of this project.

19. Add `.vscode/extensions` will add recomendations to `Extensions > Recomendations`. (Again, has the basic setup for a shared repo in mind - just like `.editorconfig`.)
20. Add `.vscode/settings` VS Code  specific setting (on top of `.editorconfig`).

- Several options are turned off, which are actually used but not by VS Code directly.
- `"javascript.format.enable": false,` / `"prettier.enable": false,` / `"typescript.format.enable": false,`: Neither VS Code nor ESLint do the formatting.
- ESLint is used for linting and prettier is for formatting - but not directly.
- A prettier plugin for ESLint is installed (`package.json`) to be used not via VS Code but via ESLint.
- config of prettier: not `.prettierrc` as in older projects but inline in `eslint.config.js`.
- If `"editor.formatOnSave"` was `true`, VS Code would check, whether a plugin for formatting was available or else use the VS Code rules. As ESLint shall use the prettier plugin, this needs to be turned off.

21. Add `eslint.config.js` as configuration for ESLint.

- The old format was `.eslintrc` or `.eslintrc.js` but with `"eslint.experimental.useFlatConfig": true,` in the `.vscode/settings.json` VS Code is configured to use the new (flat) format.
- A config for markdown files would need dedicated extension and separate config file.

22. Add `tsconfig.json` configuration which is also used by VC Code
23. Add `tsconfig.build.json` to exclud unit test files and don't build them
24. Add `tsconfig.meta.json` to type check config files and making me better than most devs.
25. Add `src > main.ts` (also fixes error in `tsconfig.json`)
26. Run `$ npm exec -- tsc --project tsconfig.build.json` in ordert to transpile `main.ts` without webpack. The following files will be created:

- main.js
- main.js.map: source map
- tsconfig.build.tsbuildinfo: for future incremential builds
- main.d.ts: includes all tyes which are stripped from the main.js
- main.d.ts.map: source map for declaration file

27.
  
- error when committing
- where is configMeta from eslint.config.js imported
- What does the ESLint extension do and what would happen, if I only install the dependency but not the extension?
- Why is prettier used via ESLint and not directly via VS Code?
