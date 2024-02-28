![Showcase](https://i.imgur.com/1E87GU6.png)

# 🍀 Befree

**Befree** is addiction tracking mobile app, which helps to monitor and control your bad habits.

- Tracks your progress and motivates you to stay clean by providing a timeline of your addiction-free days and enabling you to achieve time goals such as day, week, month and more.
- Works in **offline mode**, so you can use it without internet connection. All data is synchronized with the cloud when the connection is available. Internet connection is required for authentication during the first login and uploading addiction image.
- Supports **multiple languages**, by default comes with English and Polish translations. Translations are automatically detected based on the device's language settings.
- Comes with over **21 screens**.

## 👨‍💻 Major tech challanges

1. **First mobile app** - This is my first mobile app, so I had to learn a lot about mobile development, especially about React Native and Expo. From past experience with web development I was familiar with thing like state management, internationalization, authentication, database, but I had to learn how to use native mobile features like notifications or storage.
2. **Firebase authentication** - During the development I had to deal with Firebase authentication security issues that comes with storing user's token in the app. It turned out that the default `expo-secure-store` does not support storing values larger then 2048 bytes. I ended up using [Supabase's solution](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?auth-store=secure-store#initialize-a-react-native-app) (what an irony! 😀) and added custom replacer function that replace `@react-native-firebase` unsupported characters.
3. **Firestore data** - Because of lack of support for relational data in Firestore, I had to write abstraction that joins Firestore Addiction and Relapse collections into one object for easier data manipulation and rendering.
4. **Firestore offline mode** - By default, `@react-native-firebase` support offline mode, but it requires to write custom code to handle the loading state as `@react-native-firebase` promises are not resolved when the app is offline which caused the app to hang.
5. **Zustand state persistance** - In order theme and app state to persist between app restarts, I had to implement store persistance and hydration callback to avoid theme flickering.
6. **React Native Navigation persistance** - I wanted to keep the navigation state between app restarts, so I had to implement hook that saves the navigation state to the async storage and loads it when the app starts.

## 🐞 Known issues

1. **Linked Data Deletion** - Currently when user deletes addiction, all related structures like relapses and image are deleted by the app code. This is not the best solution, as the deletion process could be interrupted by the user and the data would be left in the cloud. Firebase itself does not support linked data deletion, so I would have to write a cloud function that would handle this process.

## 🌱 Branches

| 🌱 Branch               | 📋 Description                            |
| ----------------------- | ----------------------------------------- |
| `main`                  | Production branch                         |
| `submission-14-02-2024` | Submission branch for the app competition |

## 📦 Used packages

| 📦 Package             | 📋 Reasons                         |
| ---------------------- | ---------------------------------- |
| Expo                   | Cross-platform app development     |
| @react-native-firebase | Authentication, Firestore, Storage |
| Zustand                | State management                   |
| React Native Paper     | Material Design components         |
| Notifee                | Notifications                      |
| i18n-js                | Internationalization               |
| undraw                 | Illustrations                      |
| AppMockUp              | Repo app mockup                    |
| Lottie                 | Animations                         |

## 🚀 Running

```
git clone https://github.com/emigrek/befree
cd befree
npm install
npm install -g eas-cli
```

<details>
<summary>Firebase setup</summary>

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable the Google Sign-In provider in the Firebase Console
3. Enable Firestore and Storage in the Firebase Console
4. Generate SHA-1 and SHA-256 app fingerprints using:

```
eas credentials
```

5. Add new Android and iOS apps to the project. Download `google-services.json` and `Google_Service_Info.plist`
6. Add all fingerprints to the Firebase Console -> Project settings -> General -> Your apps -> Add fingerprint
7. Upload them to the project's EAS Secret Manager. Name keys based on `app.config.ts` file. Production names: GOOGLE_SERVICES_JSON, GOOGLE_SERVICES_JSON_IOS. Development names: GOOGLE_SERVICES_JSON_DEV, GOOGLE_SERVICES_JSON_IOS_DEV. You can do this using the following command:

```
eas secret
```

8. Extract client id from either `Google_Service_Info.plist` (ANDROID_CLIENT_ID) or `google-services.json` (client_id from client_type 3) and add to the Firebase Console -> Authentication -> Sign-in method -> Google -> Web client ID
9. Repeat steps 4-8 for desired environments (development, production)
10. Add authentication rules to the Firebase Firestore -> Rules:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }

    match /users/{userId}/addictions/{addictionId} {
    	allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }

    match /users/{userId}/relapses/{relapseId} {
    	allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
  }
}
```

11. Add authentication rules to the Firebase Storage -> Rules:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/addictions/{addictionId} {
     	allow write: if request.auth != null;
      allow read: if true;
    }
  }
}
```

</details>

Run the app

```
npx expo start
```

Use the Expo Go app to scan the QR code and run the app on your device or simulator.
