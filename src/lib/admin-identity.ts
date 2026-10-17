export function getGithubLogin(profile: unknown): string | null {
  if (typeof profile !== 'object' || profile === null || !('login' in profile)) {
    return null
  }

  return typeof profile.login === 'string' ? profile.login : null
}

export function isAllowedAdminLogin(
  login: string | null | undefined,
  configuredLogin: string | null | undefined
): boolean {
  const normalizedLogin = login?.trim().toLowerCase()
  const normalizedConfiguredLogin = configuredLogin?.trim().toLowerCase()

  return Boolean(
    normalizedLogin &&
      normalizedConfiguredLogin &&
      normalizedLogin === normalizedConfiguredLogin
  )
}

export function isValidAdminApiSecret(
  providedSecret: string | null | undefined,
  configuredSecret: string | null | undefined
): boolean {
  return Boolean(
    providedSecret &&
      configuredSecret &&
      configuredSecret.length >= 32 &&
      providedSecret === configuredSecret
  )
}
