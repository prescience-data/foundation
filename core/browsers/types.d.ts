/**
 * Export settings type.
 */
export type Settings = {
  profileId: string
  port?: number
}

export type ExecutablePaths = {
  windows: string | null
  mac: string | null
  linux: string | null
}
