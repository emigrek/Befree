const IS_DEV = process.env.APP_VARIANT === 'development';
const PACKAGE_ID = IS_DEV ? 'com.emigrek.befree.dev' : 'com.emigrek.befree';
const PACKAGE_NAME = IS_DEV ? 'Befree (Dev)' : 'Befree';

export default {
  expo: {
    name: PACKAGE_NAME,
    slug: 'befree',
    description:
      'Break free from your bad habits with Befree. Say goodbye to old patterns and embrace personal transformation.',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#5addad',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      userInterfaceStyle: 'automatic',
      bundleIdentifier: PACKAGE_ID,
      config: {
        usesNonExemptEncryption: false,
      },
      googleServicesFile: IS_DEV
        ? process.env.GOOGLE_SERVICES_JSON_DEV_IOS
        : process.env.GOOGLE_SERVICES_JSON_IOS,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#5addad',
      },
      userInterfaceStyle: 'automatic',
      package: PACKAGE_ID,
      permissions: ['HIGH_SAMPLING_RATE_SENSORS'],
      googleServicesFile: IS_DEV
        ? process.env.GOOGLE_SERVICES_JSON_DEV
        : process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    experiments: {
      tsconfigPaths: true,
    },
    extra: {
      eas: {
        projectId: '6a0af6a7-06f7-4017-84e0-6974291edf74',
      },
    },
    scheme: 'befree',
    plugins: [
      'expo-localization',
      [
        'expo-image-picker',
        {
          photosPermission:
            'The app accesses your photos to allow you to set your personal image as your addiction image.',
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/perf',
      '@react-native-firebase/crashlytics',
      '@react-native-google-signin/google-signin',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
  },
};
