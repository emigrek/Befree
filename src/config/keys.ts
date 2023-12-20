const keys: Record<string, string | undefined> = {
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
};

for (const key in keys) {
  if (keys[key] === undefined) {
    throw new Error(`Please fill '${key}' property in your .env file.`);
  }
}

export { keys };
