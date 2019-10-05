import * as env from './env'

describe('src/env.ts', () => {
  describe('.getTargetEnvironments', () => {
    describe("when given 'DEV'", () => {
      it('returns only DEV environments', () => {
        const processEnvMock = {
          DEV_API_ROOT: 'https://dev.example.com',
          PROD_API_ROOT: 'https://prod.example.com'
        }
        expect(env.getTargetEnvironments(processEnvMock, 'DEV')).toEqual({
          API_ROOT: 'https://dev.example.com'
        })
      })
    })
  })
  describe('.convertAppEngineStyleYamlFromEnvironments', () => {
    it('returns wrapped environments', () => {
      const environments = {
        API_ROOT: 'https://dev.example.com'
      }
      expect(
        env.convertAppEngineStyleYamlFromEnvironments(environments)
      ).toEqual({
        env_variables: {
          API_ROOT: 'https://dev.example.com'
        }
      })
    })
  })
})
