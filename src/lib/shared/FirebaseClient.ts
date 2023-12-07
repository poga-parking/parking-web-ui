import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFw8ncK3iCEGGZqi1UnEDEC5O0cxY9hL8",
    authDomain: "poga-parking.firebaseapp.com",
    projectId: "poga-parking",
    storageBucket: "poga-parking.appspot.com",
    messagingSenderId: "232871388528",
    appId: "1:232871388528:web:f846c91f24b00bd7e71bb5"
};

// Initialize Firebase
let app;
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp();
	deleteApp(app).then(() => {
		app = initializeApp(firebaseConfig);
	});
}

export const auth = getAuth(app);
