import { LibName, build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
import packageJson from "./package.json" assert { type: "json" };
import denoJson from "./deno.json" assert { type: "json" };

await emptyDir("./dist");

await build({
  packageManager: "yarn",
  entryPoints: [
    "./src/app.ts",
  ],
  outDir: "./dist",
  package: packageJson,
  shims: {
    custom: [
      // web streams
      {
        package: {
          name: "web-streams-polyfill",
          subPath: "ponyfill/es2018",
          version: "3.2.1",
        },
        globalNames: [
          {
            name: "ReadableStream",
            exportName: "ReadableStream",
          },
          {
            name: "TransformStream",
            exportName: "TransformStream",
          },
        ],
      },
      // error event
      // {
      //   package: {
      //     name: "@lycoris-nubila/event-constructor-polyfill",
      //     version: "1.0.4",
      //   },
      //   globalNames: [
      //     {
      //       name: "ErrorEvent",
      //       exportName: "ErrorEvent",
      //     },
      //   ],
      // },
    ],
    // see JS docs for overview and more options
    deno: true,
    // replaces node.js timers with browser-API compatible ones
    timers: true,
    // the global confirm, alert, and prompt functions
    prompts: true,
    // shims the Blob global with the one from the "buffer" module
    blob: true,
    // shims the crypto global.
    crypto: true,
    // shims DOMException
    domException: false,
    // shims fetch, File, FormData, Headers, Request, and Response
    undici: true,
    // shams (checker) for the global.WeakRef, helps type-checking only
    weakRef: true,
    // shims WebSocket
    webSocket: true,
  },
  mappings: {},
  typeCheck: false,
  test: false,
  declaration: true,
  compilerOptions: {
    // importHelpers: tsconfigJson?.compilerOptions?.importHelpers,
    // target: tsconfigJson?.compilerOptions?.target,
    // sourceMap: tscconfigJson?.compilerOptions?.sourceMap,
    // inlineSources: tscconfigJson?.compilerOptions?.inlineSources,
    // lib: denoJson?.compilerOptions?.lib as LibName[] | undefined,
    lib: ["es2022", "dom"], // , "dom.iterable", "dom.asynciterable"
    // skipLibCheck: tsconfigJson?.compilerOptions?.skipLibCheck,
  },
  scriptModule: "cjs",
});

// post build steps
Deno.copyFileSync("LICENSE", "dist/LICENSE");
Deno.copyFileSync("README.md", "dist/README.md");
