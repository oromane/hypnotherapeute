// lib/firebase.ts
import { initializeApp, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// ======================================================
// VOTRE CONFIGURATION EST INSÉRÉE ICI
// (Celle que vous avez fournie)
// ======================================================
const firebaseConfig = {
  apiKey: "AIzaSyCnO03nK-r3a8M5H_BvNBpjjrGOS19qNMM",
  authDomain: "hypnotherapeute-3bc55.firebaseapp.com",
  projectId: "hypnotherapeute-3bc55",
  storageBucket: "hypnotherapeute-3bc55.firebasestorage.app",
  messagingSenderId: "823674319261",
  appId: "1:823674319261:web:b1782b1f921876886f7f74",
  measurementId: "G-0EZC6VKJ9R"
};
// ======================================================
// ⬆️⬆️ NE TOUCHEZ PAS AU RESTE DU FICHIER ⬆️⬆️
// ======================================================

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  app = getApp(); // Essaye de récupérer l'app existante
} catch (e) {
  app = initializeApp(firebaseConfig); // Sinon, on l'initialise
}

// Initialise les services dont nous avons besoin
auth = getAuth(app);
db = getFirestore(app);

// Exporte les services pour que notre admin puisse les utiliser
export { app, auth, db };