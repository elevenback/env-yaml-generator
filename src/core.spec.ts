import * as core from './core'

describe('src/core.ts', () => {
  describe('.createYAML', () => {
    it('returns correct string', () => {
      const processEnvMock = {
        DEV_API_ROOT: 'https://dev.example.com',
        PROD_API_ROOT: 'https://prod.example.com'
      }
      const expectYaml = `env_variables:
  API_ROOT: https://dev.example.com
`
      expect(core.createYAML(processEnvMock, 'DEV')).toBe(expectYaml)
    })
  })
})
