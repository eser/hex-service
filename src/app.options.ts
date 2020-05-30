import { logLevels, dotenv } from "./deps.ts";

// interface definition
interface Options {
  port: number;
  logs: logLevels.LevelName;
}

// functions
function getValue<T extends unknown>(
  envfile: dotenv.DotenvConfig,
  key: string,
  defaultValue: unknown,
): T {
  return (Deno.env.get(key) ?? envfile[key] ?? defaultValue) as T;
}

// load environment variables
const envfile: dotenv.DotenvConfig = dotenv.config({ safe: false });

// option: port
const portRaw = getValue<string>(envfile, "PORT", "8000");
const port: number = parseInt(portRaw, 10);

// option: logs
const logs = getValue<logLevels.LevelName>(envfile, "LOGS", "INFO");

// unify options
const options: Options = {
  port,
  logs,
};

export {
  options as default,
};
