# ✖️ [hex-service](https://github.com/eserozvataf/hex-service)

Hex Service is a service boilerplate to enable developers to start coding their backend API codebase immediately.

However it sounds very familiar and there are tons of boilerplates already serves this purpose, hex-service allows you to run your code for both Deno and Node.js.

Since it is an orthogonal solution for developers who wants to be able to stick with modern tooling by using them from today. It simply runs on Deno's powerful ecosystem which providers many developer tools and libraries built-in, but at the same time allows you to compile your code in order to run it on good old `Node.js`.


## Features

* Built on [Deno](https://deno.land) and Oak.
* Built-in [TypeScript](https://www.typescriptlang.org/) support.
* Separated middleware and actions.
* Simple TDD convention and testing environment.
* Ready to containerize.
* Ready to debug on VS Code or Chromium Inspector.
* [TODO] Development mode
* [TODO] Built-in [Swagger](https://swagger.io) support.


## Quick start

Ensure that `Deno` is installed on your system first.

Clone this git repo `git clone
   https://github.com/eserozvataf/hex-service.git` - and checkout the [tagged
   release](https://github.com/eserozvataf/hex-service/releases) you'd like to
   use.

**Important**: local env files (i.e., `.env.local`) is git-ignored, so you can
have secret your sensitive environment variables by creating local copies of
environment variables before running the service.


## Commands

| Command                    | Description                                          |
|----------------------------|------------------------------------------------------|
| `deno task build`          | Compiles codebase to allow its execution on Node.js  |
| `deno task start`          | Start application backend                            |
| `deno task dev`            | Debug application with chromium inspector or VS Code |
| `deno task test`           | Execute unit tests                                   |
| `deno task test:coverage`  | Execute unit tests with coverage report              |
| `deno task bench`          | Executes benchmark testing                           |
| `deno task cleanup`        | Cleans up generated build files                      |
| `deno task dockerize`      | Start application in a docker container              |
| `deno lint`                | Executes linter                                      |
| `deno fmt`                 | Executes formatter                                   |


## Todo List

See [GitHub Projects](https://github.com/eserozvataf/hex-service/projects) for more.


## Requirements

* Deno (https://deno.land/)


## License

Apache 2.0, for further details, please see [LICENSE](LICENSE) file.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

It is publicly open for any contribution. Bugfixes, new features and extra modules are welcome.

* To contribute to code: Fork the repo, push your changes to your fork, and submit a pull request.
* To report a bug: If something does not work, please report it using [GitHub Issues](https://github.com/eserozvataf/hex-service/issues).


## To Support

[Visit my GitHub Sponsors profile at github.com/sponsors/eserozvataf](https://github.com/sponsors/eserozvataf)
