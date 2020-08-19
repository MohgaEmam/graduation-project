auth.onAuthStateChanged(user => {
    if (user) {
      console.log(user.doc.data().first_name);
    } else {
      console.log('user logged out');
    }
  })
// regester
const signupForm = document.querySelector('#RegisterForm');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['RegisterFormEmail'].value;
  const password = signupForm['RegisterFormPassword'].value;
  // register
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('patientRegister').doc(cred.user.uid).set({
      first_name: signupForm['RegisterFormFirstName'].value,
      last_name: signupForm['RegisterFormLastName'].value,
      email: signupForm['RegisterFormEmail'].value,
      password: signupForm['RegisterFormPassword'].value,
      doctor_name: signupForm['RegisterFormDoctorName'].value
    });
  }).then(() => {
    // close the signup modal & reset form
    location.replace('/component/pages/home.html')
    signupForm.reset();
  }).catch(err => {
    alert('Please login with the correct credentials');
    console.log('Error from the patient"s login ', err.message);
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
    console.log('logged in');
    loginForm.reset();
  }).catch(err => {
    alert('Please login with the correct credentials');
    console.log('Error from the patient"s login ', err.message);
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
        doc_name: regForm.RegisterFormDoctorName.value,
        pass: regForm.RegisterFormPassword.value,
        clinic_name: false,
        patient: true,
        doc: false,
    });
    // regForm.first_name.value = '';
    // regForm.last_name.value = '';
    // regForm.email.value = '';
});

