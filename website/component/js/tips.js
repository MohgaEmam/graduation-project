auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);

    usermail = user.email;

    const func = (data) => {
      data.forEach(element => {

          const guide = element.data();
          if (guide.email == usermail) {
              console.log('function 1 :  ', guide.email)
              const func1 = (data) => {



                  data.forEach(element => {

                      const guide = element.data();

                      console.log(guide.sleep > 9);

                      // patient current lists

                      if(guide.heartrate > 40){
                        document.getElementById('highHeartRate').style.display="block";
                        document.getElementById('lowHeartRate').style.display="none";
                        document.getElementById('okayHeartRate').style.display="none";
                      }else{
                        if(guide.heartrate < 40){
                          document.getElementById('highHeartRate').style.display="none";
                        document.getElementById('lowHeartRate').style.display="block";
                        document.getElementById('okayHeartRate').style.display="none";
                        }else{
                          document.getElementById('highHeartRate').style.display="none";
                        document.getElementById('lowHeartRate').style.display="none";
                        document.getElementById('okayHeartRate').style.display="block";
                        }
                      }


                      if(guide.bloodpressure > 90 && guide.bloodpressure <120){
                        document.getElementById('okayBloodPressure').style.display="block";
                        document.getElementById('highBloodPressure').style.display="none";
                        document.getElementById('lowBloodPressure').style.display="none";
                      }else{
                        if(guide.bloodpressure < 90){
                          document.getElementById('okayBloodPressure').style.display="none";
                        document.getElementById('highBloodPressure').style.display="none";
                        document.getElementById('lowBloodPressure').style.display="block";
                        }else{
                          if(guide.bloodpressure > 120){
                            document.getElementById('okayBloodPressure').style.display="none";
                        document.getElementById('highBloodPressure').style.display="block";
                        document.getElementById('lowBloodPressure').style.display="none";
                          }
                        }
                      }

                      if(guide.calo > 200 && guide.calo <300){
                        document.getElementById('okayCaloriesBurnt').style.display="block";
                        document.getElementById('highCaloriesBurnt').style.display="none";
                        document.getElementById('lowCaloriesBurnt').style.display="none";
                      }else{
                        if(guide.calo > 300){
                          document.getElementById('okayCaloriesBurnt').style.display="none";
                        document.getElementById('highCaloriesBurnt').style.display="block";
                        document.getElementById('lowCaloriesBurnt').style.display="none";

                        }else{
                          document.getElementById('okayCaloriesBurnt').style.display="none";
                        document.getElementById('highCaloriesBurnt').style.display="none";
                        document.getElementById('lowCaloriesBurnt').style.display="block";
                        }
                      }
                      
                      if(guide.sleep > 7 && guide.sleep < 9){
                        document.getElementById('okaySleepingHours').style.display="block";
                        document.getElementById('highSleepingHours').style.display="none";
                        document.getElementById('lowSleepingHours').style.display="none";
                      }else{
                        if(guide.sleep > 9){
                          document.getElementById('okaySleepingHours').style.display="none";
                          document.getElementById('highSleepingHours').style.display="block";
                          document.getElementById('lowSleepingHours').style.display="none";
                        }else{
                          if(guide.sleep < 7){
                            document.getElementById('okaySleepingHours').style.display="none";
                            document.getElementById('highSleepingHours').style.display="none";
                            document.getElementById('lowSleepingHours').style.display="block";
                          }
                          
                        }
                      }
                      
                  });
              }

              db.collection('patientMeasures').where("email", "==", usermail).onSnapshot(snapshot => {

                  func1(snapshot.docs);
              });
          }
      });
  }
  db.collection('users').orderBy('email').onSnapshot(snapshot => {
      func(snapshot.docs);
  });



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

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
