import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue, update, remove } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { headerLogIn, headerLogOut, headerMyLibrary, formLogIn, formTitleSignIn, formTitleSignUp, formWrapName, formWrapCheckbox, formCheckbox, buttonRegister, buttonConfirm, signUp, signUpLink, signIn, signInLink, logOut } from './refs';
import { closeModalLogIn } from './modal-log-in';
import Notiflix from 'notiflix';
import { chooseThemeForNotiflix } from './notiflix';

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
export const auth = getAuth();
let user;

headerMyLibrary.addEventListener('click', checkLogInForMyLibrary);

function checkLogInForMyLibrary() {
    chooseThemeForNotiflix();
    if (auth.currentUser === null) {
        headerMyLibrary.removeAttribute('href');
        Notiflix.Report.info('Oops', 'Please Log In first 🙈', 'Okay');
    } else {
        headerMyLibrary.setAttribute('href', '/library.html');
    };
};

if (formLogIn) {
    formLogIn.addEventListener('submit', onLogin);
};

// location.href = 'library.html';

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
        // console.log(auth.currentUser);
        const uid = user.uid;
        // console.log(uid);
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
        Notiflix.Report.info('Wow dude', 'Email or Password is Outta Line 🙈', 'Agree');
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
            Notiflix.Report.success('Nice!', 'Welcome to Filmoteka! Relax and enjoy your movies 🦥', 'Thanks!');
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // alert(errorMessage);
            Notiflix.Report.warning('Wait a second', 'User with such email already exists, unless you want to steal it 👀', 'Oops');
        });
    user = auth.currentUser;
};

function onLogin(event) { 
    event.preventDefault();
    const email = document.querySelector('#email_1').value;
    const password = document.querySelector('#password').value;
    if (validateEmail(email) === false || validatePassword(password) === false) {
        Notiflix.Report.info('Wow dude', 'Email or Password is Outta Line 🙈', 'Agree');
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
            Notiflix.Report.success('Hello there!', 'Welcome back to Filmoteka! Already know which movie wanna see? 🦥', 'Nice to be Home!');
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // alert(errorMessage);
            Notiflix.Report.warning('Hmm', 'Something wrong with your reqwest, please try again 🙊', 'No problem');
        });
    user = auth.currentUser;
};

if (logOut) {
    logOut.addEventListener('click', (e) => {
        chooseThemeForNotiflix();
        Notiflix.Confirm.show('Exit confirmation',
            'We hope you had a good time! 💃 🕺 Confirm exit?',
            'Yeap, time to go 👋',
            'Maybe I should stay 👌',
            function okCb() {
                signOut(auth)
                    .catch((error) => {
                        // const errorCode = error.code;
                        // const errorMessage = error.message;
                        // alert(errorMessage);
                        Notiflix.Report.warning('Hah', 'Did you think you would escape so easily? Have one more try 😁', 'Dammit');
                    });;
                // Sign-out successful.
                Notiflix.Report.success('If your say so...', 'May the Force be with you! 🌌', 'I`m still on Light Side!')
            },
            function cancelCb() {
                Notiflix.Report.success('Great!', 'Glad to hear that, let`s keep chilling 💃 🕺', 'That`s right!')
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

export function goToSignIn() {
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