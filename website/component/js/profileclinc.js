// patient previous lists
const cafeList = document.querySelector('#patientPreviousdiseaseUL');
const pCurrMedication = document.querySelector('#patientPreviousmedicationUL');
const pCurrDoctor = document.querySelector('#patientPreviousdoctorUL');
const pCurrDoctor2 = document.querySelector('#patientPreviousdoctorUL2');
//patientPreviousdoctorUL2



// create element & render cafe
function renderCurrentData(doc){
    // patient current lists
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');
    let li4 = document.createElement('li');

    // patient current lists

    let disease = document.createElement('span');
    let doctor = document.createElement('span');
    let medication = document.createElement('span');
    let spec = document.createElement('span');


    // patient current lists
    li1.setAttribute('data-id', doc.id);
    disease.textContent = doc.data().doctor;
    doctor.textContent = doc.data().number;
    medication.textContent = doc.data().rating;
    spec.textContent = doc.data().specialization;

    // patient current lists

    li1.appendChild(disease);
    li3.appendChild(doctor);
    li2.appendChild(medication);
    li4.appendChild(spec);

    cafeList.appendChild(li1);
    pCurrMedication.appendChild(li2)
    pCurrDoctor.appendChild(li3)
    pCurrDoctor2.appendChild(li4)
};

// real-time listener
db.collection('clinc').orderBy('specialization').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCurrentData(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
  } else {
    console.log('user logged out');
  }
});


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
e.preventDefault();
auth.signOut().then(() => {
  console.log('user signed out');
  location.replace('/index.html')
});
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