export function logServerError(message: string, ...details: unknown[]) {
  if (process.env.NODE_ENV === 'test') return;

  // biome-ignore lint/suspicious/noConsole: Server route errors need to reach platform logs.
  console.error(message, ...details);
}

export function logServerInfo(message: string, ...details: unknown[]) {
  if (process.env.NODE_ENV === 'test') return;

  // biome-ignore lint/suspicious/noConsole: Server route events need to reach platform logs.
  console.info(message, ...details);
}
