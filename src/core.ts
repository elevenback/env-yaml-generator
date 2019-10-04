import {
  getTargetEnvironments,
  convertAppEngineStyleYamlFromEnvironments
} from "./env";
import { promisify } from "util";
import * as YAML from "yaml";
import * as fs from "fs";
import { Result } from "meow";
const writeFile = promisify(fs.writeFile);

export function createYAML(
  processEnv: NodeJS.ProcessEnv,
  environment: string
): string {
  const environments = getTargetEnvironments(processEnv, environment);
  const yamlData = YAML.stringify(
    convertAppEngineStyleYamlFromEnvironments(environments)
  );
  return yamlData;
}

export async function exec(flags: Result["flags"]) {
  const environment = (flags.environment as string | undefined) || "DEV";
  const yamlData = createYAML(process.env, environment);
  try {
    await writeFile("env.yaml", yamlData, { encoding: "utf8" });
  } catch (e) {
    process.exit(1);
    return;
  }
  process.exit(0);
}
