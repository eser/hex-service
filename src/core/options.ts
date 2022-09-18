import { dotenv, logLevels } from "./deps.ts";

// interface definitions
interface Options {
  port: number;
  logs: logLevels.LevelName;
}

// public functions
const getValue = <T extends unknown>(
  envfile: dotenv.DotenvConfig,
  key: string,
  defaultValue: unknown,
): T => {
  return (Deno.env.get(key) ?? envfile[key] ?? defaultValue) as T;
};

const initOptions = (): Options => {
  // load environment variables
  const envfile: dotenv.DotenvConfig = dotenv.config({ safe: false });

  // option: port
  const portRaw = getValue<string>(envfile, "PORT", "3000");
  const port: number = parseInt(portRaw, 10);

  // option: logs
  const logs = getValue<logLevels.LevelName>(envfile, "LOGS", "INFO");

  // unify options
  const unified: Options = {
    port,
    logs,
  };

  return unified;
};

const options = initOptions();

export { type Options, options, options as default };
