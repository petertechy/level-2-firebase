// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAM9LLOloh0uy3aOaiffPVpiYTc7rvHB74",
    authDomain: "gym-manager-b45f0.firebaseapp.com",
    projectId: "gym-manager-b45f0",
    storageBucket: "gym-manager-b45f0.firebasestorage.app",
    messagingSenderId: "999565698461",
    appId: "1:999565698461:web:d96ed2dfbf8fbc1e92bb74",
    measurementId: "G-H6XQ6K0YX8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  document.getElementById("signIn").addEventListener("click", ()=>{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   console.log(userCredential)
   location.href = "/public/dashboard.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(error)
    console.log(errorCode)
    console.log(errorMessage)
  });
  })
