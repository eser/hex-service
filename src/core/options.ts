import { dotenv, logLevels } from "./deps.ts";
import { loadEnv } from "./env.ts";

// interface definitions
interface Options {
  envName: string;
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

const loadOptions = async (): Promise<Options> => {
  // load environment variables
  const env = await loadEnv();

  // options: environment name
  const envName = env.name;

  // option: port
  const portRaw = getValue<string>(env.vars, "PORT", "3000");
  const port: number = parseInt(portRaw, 10);

  // option: logs
  const logs = getValue<logLevels.LevelName>(env.vars, "LOGS", "INFO");

  // unify options
  const unified: Options = {
    envName,
    port,
    logs,
  };

  return unified;
};

export { loadOptions, type Options };
