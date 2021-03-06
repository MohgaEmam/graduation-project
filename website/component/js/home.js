auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user.email);
    usermail = user.email;

  } else {
    console.log('user logged out');
  }
});


profileLink = document.getElementById('profile');
profileLink.addEventListener('click', (e) => {
  e.preventDefault();

  const func = (data) => {
    data.forEach(element => {

      const guide = element.data();
      if (guide.doc == true) {
        e.preventDefault();
        console.log(guide.doc == true);
        location.replace('./profiledoctor.html');
      }else{
        if (guide.doc != true){
          location.replace('./profilepatient.html');
        }
      }
      
      
    });
  }
  db.collection('users').orderBy('first_name').onSnapshot(snapshot => {
    func(snapshot.docs);
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
    location.replace('/index.html')
  })
});




// const func = (data) =>{
//   data.forEach(element => {

//     const guide = element.data();
//     if(guide.doc == true){
//       console.log(guide.first_name);
//     }

//   });
// }

// db.collection('users').orderBy('first_name').onSnapshot(snapshot => {
//   func(snapshot.docs);
// });


document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

});