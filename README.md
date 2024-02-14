![Showcase](https://i.imgur.com/1E87GU6.png)

# 🍀 Befree

**Befree** is addiction tracking mobile app, which helps to monitor and control your bad habits.

App track your progress and motivates you to stay clean by providing a timeline of your addiction-free days and enabling you to achieve time goals such as day, week, month or year.

App works in **offline mode**, so you can use it without internet connection. All data is synchronized with the cloud when the connection is available. Internet connection is required for authentication during the first login and uploading addiction image.

App supports **multiple languages**, by default comes with English and Polish translations. Translations are automatically detected based on the device's language settings.

## 📦 Used packages

| 📦 Package         | 📋 Reasons                         |
| ------------------ | ---------------------------------- |
| Expo               | Cross-platform app development     |
| Firebase           | Authentication, Firestore, Storage |
| Zustand            | State management                   |
| React Native Paper | Material Design components         |
| Notifee            | Notifications                      |
| i18n-js            | Internationalization               |
| undraw             | Illustrations                      |
| AppMockUp          | Repo app mockup                    |

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
4. Add new Android and iOS apps to the project. Download `google-services.json` and `Google_Service_Info.plist`
5. Upload them to the project's EAS Secret Manager. Name keys based on `app.config.ts` file. Production names: GOOGLE_SERVICES_JSON, GOOGLE_SERVICES_JSON_IOS. Development names: GOOGLE_SERVICES_JSON_DEV, GOOGLE_SERVICES_JSON_IOS_DEV. You can do this using the following command:

```
eas secret
```

6. Generate SHA-1 and SHA-256 fingerprints using:

```
eas credentials
```

7. Add all fingerprints to the Firebase Console -> Project settings -> General -> Your apps -> Add fingerprint
8. Add Client Ids from `Google_Service_Info.plist` and `google-services.json` to the Firebase Console -> Authentication -> Sign-in method -> Google -> Web client Id
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
