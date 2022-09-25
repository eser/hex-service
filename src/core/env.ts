import { dotenv } from "./deps.ts";

const loadEnvFile = async (filepath: string): Promise<dotenv.DotenvConfig> => {
  try {
    const result = dotenv.parse(
      new TextDecoder("utf-8").decode(await Deno.readFile(filepath)),
    );

    return result;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return <dotenv.DotenvConfig> {};
    }
    throw e;
  }
};

const loadEnv = async (): Promise<dotenv.DotenvConfig> => {
  const sysVars = Deno.env.toObject();
  const env = sysVars["ENV"] ?? "development";

  const vars = await loadEnvFile(".env");
  Object.assign(vars, await loadEnvFile(`.env.${env}`));
  if (env !== "test") {
    Object.assign(vars, await loadEnvFile(".env.local"));
  }
  Object.assign(vars, await loadEnvFile(`.env.${env}.local`));
  Object.assign(vars, sysVars);

  return vars;
};

export { loadEnv, loadEnv as default };
