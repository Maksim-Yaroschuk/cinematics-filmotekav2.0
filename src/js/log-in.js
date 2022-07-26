import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue, update, remove } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { headerLogIn, headerLogOut, formLogIn, formTitleSignIn, formTitleSignUp, formWrapName, formWrapCheckbox, formCheckbox, buttonRegister, buttonConfirm, signUp, signUpLink, signIn, signInLink, logOut } from './refs';
import { closeModalLogIn } from './modal-log-in';

const firebaseConfig = {
    apiKey: "AIzaSyBvthHJrzRgqu2gApiW7YLJNyTKg7lQF2A",
    authDomain: "filmoteka-176d0.firebaseapp.com",
    databaseURL: "https://filmoteka-176d0-default-rtdb.firebaseio.com",
    projectId: "filmoteka-176d0",
    storageBucket: "filmoteka-176d0.appspot.com",
    messagingSenderId: "95936415736",
    appId: "1:95936415736:web:01b42e09afbcb0b65f780d",
    measurementId: "G-X4D7W75RL6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
let user;

if (formLogIn) {
    formLogIn.addEventListener('submit', onLogin);
};

if (formCheckbox) {
    formCheckbox.onchange = function () {
        if (this.checked) {
            buttonRegister.classList.remove('disabled_for_signUp')
            buttonRegister.removeAttribute('disabled')
        } else {
            buttonRegister.classList.add('disabled_for_signUp')
            buttonRegister.setAttribute('disabled', 'disabled')
        }
    };
};

if (signUp) {
    signUpLink.addEventListener('click', goToSignUp);
};
if (signIn) {
    signInLink.addEventListener('click', goToSignIn);
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        const uid = user.uid;
        console.log(uid);
        onUserLogIn();
    } else {
        // User is signed out
        onUserLogOut();
    };
});

function onRegister(event) { 
    event.preventDefault();
    const username = document.querySelector('#name_1').value;
    const email = document.querySelector('#email_1').value;
    const password = document.querySelector('#password').value;
    if (validateEmail(email) === false || validatePassword(password) === false) {
        alert('Email or Password is Outta Line!');
        return;
    };
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // console.log(userCredential);
            // Registered;
            const user = userCredential.user
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email
            })
            closeModalLogIn();
            formLogIn.reset();
            alert('User Created');
        })
        .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    user = auth.currentUser;
};

function onLogin(event) { 
    event.preventDefault();
    const email = document.querySelector('#email_1').value;
    const password = document.querySelector('#password').value;
    if (validateEmail(email) === false || validatePassword(password) === false) {
        alert('Email or Password is Outta Line!');
        return;
    };
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // console.log(userCredential);
            // Signed in;
            const user = userCredential.user;
            const dt = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: dt,
            });
            closeModalLogIn();
            formLogIn.reset();
            onUserLogIn();
            alert('User loged in');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    user = auth.currentUser;
};

if (logOut) {
    logOut.addEventListener('click', (e) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            alert('User loged out');
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });
};

function goToSignUp() {
    formTitleSignIn.classList.add('visually-hidden');
    formTitleSignUp.classList.remove('visually-hidden');
    formWrapName.classList.remove('visually-hidden');
    formWrapCheckbox.classList.remove('visually-hidden');
    buttonConfirm.classList.add('visually-hidden');
    buttonRegister.classList.remove('visually-hidden');
    signUp.classList.add('visually-hidden');
    signIn.classList.remove('visually-hidden');
    formLogIn.addEventListener('submit', onRegister);
    formLogIn.removeEventListener('submit', onLogin);
}

function goToSignIn() {
    formTitleSignIn.classList.remove('visually-hidden');
    formTitleSignUp.classList.add('visually-hidden');
    formWrapName.classList.add('visually-hidden');
    formWrapCheckbox.classList.add('visually-hidden');
    buttonConfirm.classList.remove('visually-hidden');
    buttonRegister.classList.add('visually-hidden');
    signUp.classList.remove('visually-hidden');
    signIn.classList.add('visually-hidden');
    formLogIn.addEventListener('submit', onLogin);
    formLogIn.removeEventListener('submit', onRegister);
}

function onUserLogIn() {
    if (headerLogIn && headerLogOut) {
        headerLogIn.classList.add('visually-hidden');
        headerLogOut.classList.remove('visually-hidden');
    };
};

function onUserLogOut() {
    if (headerLogIn && headerLogOut) {
        headerLogIn.classList.remove('visually-hidden');
        headerLogOut.classList.add('visually-hidden');
    };
};

function validateEmail(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) === true) {
        return true;
    } else {
        return false;
    };
};

function validatePassword(password) {
    if (password.length < 6) {
        return false;
    } else {
        return true;
    };
};

function validateField(field) {
    if (field === null) {
        return false;
    };
    if (field.length <= 0) {
        return false;
    } else {
        return true;
    };
};

// // get data
// getData.addEventListener('click', (e) => {
//     const username = document.getElementById('username').value;
//     const starCountRef = ref(database, 'users/' + username);
//     onValue(starCountRef, (snapshot) => {
//         const data = snapshot.val(); // data = all data on firebase;
//         document.getElementById('email').value = data.email;
//     });
// });

// // update data
// updateData.addEventListener('click',(e) => {
//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     update(ref(database, 'users/' + username), {
//         email: email,
//         username: username, 
//     })
//     alert('Updated');
// });

// // remove data
// removeData.addEventListener('click',(e) => {
//     const username = document.getElementById('username').value;
//     remove(ref(database, 'users/' + username));
//     alert('Removed');
// });