 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
 import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword     } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDn5C15RSUswWkDKcYpBzv54A-OtwQTrLg",
    authDomain: "fir-demo-79cb9.firebaseapp.com",
    projectId: "fir-demo-79cb9",
    storageBucket: "fir-demo-79cb9.appspot.com",
    messagingSenderId: "145034279050",
    appId: "1:145034279050:web:8933f6fbe2169f86b71573",
    measurementId: "G-7TDPZLH0DL"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);

//  console.log(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// console.log(auth);

//  ++++++++++ For Sign-Up page +++++++++++ 

let signUp_email = document.getElementById('signUp_email')
let signUp_password = document.getElementById('signUp_password')
let signup_btn = document.getElementById('signup_btn')


signup_btn.addEventListener('click', () => {
    // console.log(signUp_email.value);
    // console.log(signUp_password.value);
    createUserWithEmailAndPassword(auth, signUp_email.value, signUp_password.value)
        .then((userCredential) => {
             // Signed up 
            const user = userCredential.user;
        // ...
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    // ..
  });

    
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('user HAI');
        
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
        console.log('user nhi hai');
        
      // User is signed out
      // ...
    }
  });
 
  
//  ++++++++++ For Login page +++++++++++ 

let login_email = document.getElementById('login_email')
let login_password = document.getElementById('login_password')
let login_btn = document.getElementById('login_btn')

login_btn.addEventListener('click', () => {
    // console.log(login_email.value);
    // console.log(login_password.value);   
    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('user');
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

})