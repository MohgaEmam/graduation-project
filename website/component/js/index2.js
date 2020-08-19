//patient signIn and register

var regbutton = document.getElementById('registerButton'); 
var signbutton = document.getElementById('SignInButton');

regform = document.getElementById('signInForm');
signform = document.getElementById('RegisterForm');

regbutton.onclick = function() {
    if (regform.style.display !== 'none') {
        signform.style.display = 'block';
        // signbutton.style.display = 'none';
        regform.style.display = 'none';
    }
};

signbutton.onclick = function() {
    if (signform.style.display !== 'none') {
        signform.style.display = 'none';
        // signbutton.style.display = 'none';
        regform.style.display = 'block';
    }
};
