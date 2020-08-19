// listen for auth status changes
// auth.onAuthStateChanged(user => {
//   const logoutLink = document.getElementById('logout');
//   if (user) {
//     console.log('user logged in: ', user);
//     logoutLink.style.display = 'block';

//   } else {
//     console.log('user logged out');
//     logoutLink.style.display = 'none';
//   }
// })

// regester
const signupForm = document.querySelector('#RegisterForm');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['RegisterFormEmail'].value;
  const password = signupForm['RegisterFormPassword'].value;
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
  return db.collection('doctorRegister').doc(cred.user.uid).set({
    first_name : signupForm['RegisterFormFirstName'].value,
    last_name : signupForm['RegisterFormLastName'].value,
    email: signupForm['RegisterFormEmail'].value,
    password: signupForm['RegisterFormPassword'].value,
    clinc_name: signupForm['RegisterFormDoctorClinc'].value
  });
}).then(() => {
  // close the signup modal & reset form
  location.replace('/component/pages/home.html')
  signupForm.reset();
}).catch(err => {
  alert('Please login with the correct credentials');
  console.log('Error from the Doctor"s signup ', err.message);
});
});

// login
const loginForm = document.querySelector('#signInForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['signInFormEmail'].value;
  const password = loginForm['signInFormPassword'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    location.replace('/component/pages/home.html')
    loginForm.reset();
  }).catch(err => {
    alert('Please login with the correct credentials');
    console.log('Error from the Doctor"s login ', err.message);
  });

});

// store the new user into the database 
regForm = document.getElementById('RegisterForm');

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').add({
        first_name: regForm.RegisterFormFirstName.value,
        last_name: regForm.RegisterFormLastName.value,
        email: regForm.RegisterFormEmail.value,
        pass: regForm.RegisterFormPassword.value,
        clinic_name: regForm.RegisterFormDoctorClinc.value,
        doc_name: false,
        patient: false,
        doc: true,
    });
});