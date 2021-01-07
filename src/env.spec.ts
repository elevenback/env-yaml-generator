import * as env from './env'

describe('src/env.ts', () => {
  describe('.getTargetEnvironments', () => {
    describe("when given 'DEV'", () => {
      it('returns only DEV environments', () => {
        const processEnvMock = {
          DEV_API_ROOT: 'https://dev.example.com',
          PROD_API_ROOT: 'https://prod.example.com',
        }
        expect(env.getTargetEnvironments(processEnvMock, 'DEV')).toEqual({
          API_ROOT: 'https://dev.example.com',
        })
      })
    })
  })
  describe('.getFilteredEnvironments', () => {
    describe("when given 'API'", () => {
      it('returns only API related environments', () => {
        const processEnvMock = {
          API_KEY: 'https://prod.example.com',
          OTHERSERVICE_API_KEY: 'OTHERSERVICE_VALUE',
          API2_KEY: 'https://prod2.example.com',
        }
        expect(env.getFilteredEnvironments(processEnvMock, '^API_.+')).toEqual({
          API_KEY: 'https://prod.example.com',
        })
      })
    })
  })
  describe('.convertAppEngineStyleYamlFromEnvironments', () => {
    it('returns wrapped environments', () => {
      const environments = {
        API_ROOT: 'https://dev.example.com',
      }
      expect(
        env.convertAppEngineStyleYamlFromEnvironments(environments)
      ).toEqual({
        env_variables: {
          API_ROOT: 'https://dev.example.com',
        },
      })
    })
  })
})
