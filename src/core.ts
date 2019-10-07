import {
  getTargetEnvironments,
  convertAppEngineStyleYamlFromEnvironments,
  getFilteredEnvironments,
  Environments
} from './env'
import { promisify } from 'util'
import * as YAML from 'yaml'
import * as fs from 'fs'
import { Result } from 'meow'
const writeFile = promisify(fs.writeFile)

export function createYAML(
  processEnv: NodeJS.ProcessEnv,
  environment?: string,
  filter?: string
): string {
  let environments = processEnv as Environments
  if (environment) {
    environments = getTargetEnvironments(processEnv, environment)
  }
  if (filter) {
    environments = getFilteredEnvironments(environments, filter)
  }
  const yamlData = YAML.stringify(
    convertAppEngineStyleYamlFromEnvironments(environments)
  )
  return yamlData
}

export async function exec(flags: Result['flags']) {
  const environment = flags.environment as string | undefined
  const filter = flags.filter as string | undefined
  const yamlData = createYAML(process.env, environment, filter)
  try {
    await writeFile('env.yaml', yamlData, { encoding: 'utf8' })
  } catch (e) {
    process.exit(1)
    return
  }
  process.exit(0)
}
