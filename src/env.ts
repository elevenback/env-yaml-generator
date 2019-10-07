export type Environments = NodeJS.ProcessEnv & {
  [key: string]: string | undefined
}

type KeyValuePairs = [string, string | undefined]

export function getTargetEnvironments(
  environments: Environments,
  prefix: string
): Environments {
  return Object.entries(environments)
    .filter(([k, v]: KeyValuePairs) => {
      return k.includes(`${prefix}_`)
    })
    .map(
      ([k, v]: KeyValuePairs): KeyValuePairs => {
        return [k.replace(`${prefix}_`, ''), v]
      }
    )
    .reduce((before: Environments, after: KeyValuePairs) => {
      return {
        ...before,
        [after[0]]: after[1]
      }
    }, {})
}

export function getFilteredEnvironments(
  environments: Environments,
  filter: string
): Environments {
  const regex = new RegExp(filter)
  return Object.entries(environments)
    .filter(([k, v]) => regex.exec(k))
    .reduce((before, after) => {
      return {
        ...before,
        [after[0]]: after[1]
      }
    }, {})
}

export function convertAppEngineStyleYamlFromEnvironments(
  environments: Environments
): { env_variables: Environments } {
  return {
    env_variables: environments
  }
}

// TODO: Implement feature
// export function validateEnvironments() {
// const unknown = Object.entries(env.env_variables).filter(([, v]) => typeof v === 'undefined')
// if (unknown.length) {
//   unknown.forEach(([k]) => console.error(`Environment variable '${k}' is missing.`))
//   process.exit(1)
// }
// }
