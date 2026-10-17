import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getGithubLogin,
  isAllowedAdminLogin,
  isValidAdminApiSecret,
} from './admin-identity'

test('admin authorization requires a configured username and matching GitHub login', () => {
  assert.equal(isAllowedAdminLogin('Atong-Glory', 'atong-glory'), true)
  assert.equal(isAllowedAdminLogin('another-user', 'atong-glory'), false)
  assert.equal(isAllowedAdminLogin('atong-glory', undefined), false)
  assert.equal(isAllowedAdminLogin(undefined, 'atong-glory'), false)
  assert.equal(isAllowedAdminLogin(' ', 'atong-glory'), false)
})

test('getGithubLogin accepts only a string login from a profile object', () => {
  assert.equal(getGithubLogin({ login: 'atong-glory' }), 'atong-glory')
  assert.equal(getGithubLogin({ login: 42 }), null)
  assert.equal(getGithubLogin({}), null)
  assert.equal(getGithubLogin(null), null)
})

test('server API secret requires a sufficiently long configured secret and exact match', () => {
  const strongSecret = 'a'.repeat(32)
  assert.equal(isValidAdminApiSecret(strongSecret, strongSecret), true)
  assert.equal(isValidAdminApiSecret('wrong-secret', strongSecret), false)
  assert.equal(isValidAdminApiSecret('short', 'short'), false)
  assert.equal(isValidAdminApiSecret(strongSecret, undefined), false)
})
