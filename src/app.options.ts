import { dotenv } from "./deps.ts";

// interface definition
interface Options {
  port: number;
}

// functions
function getValue(
  envfile: dotenv.DotenvConfig,
  key: string,
  defaultValue?: string,
): string {
  return Deno.env.get(key) ?? envfile[key] ?? defaultValue;
}

// load environment variables
const envfile: dotenv.DotenvConfig = dotenv.config({ safe: false });

// option: port
const portRaw: string = getValue(envfile, "PORT", "8000");
const port: number = parseInt(portRaw, 10);

// unify options
const options: Options = {
  port,
};

export {
  options as default,
};
