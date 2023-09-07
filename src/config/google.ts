const googleConfig: Record<string, string | undefined> = {
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
};

for (const key in googleConfig) {
  if (googleConfig[key] === undefined) {
    throw new Error(`Please fill '${key}' property in your .env file.`);
  }
}

export default googleConfig;
