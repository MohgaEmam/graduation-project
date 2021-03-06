// patient previous lists
const patName = document.querySelector('#nameHeader');
const patHeart = document.querySelector('#averageHeartHeader');
const patBlood = document.querySelector('#averageHeartHeader');
const patSleep = document.querySelector('#averageHeartHeader');
const patCalo = document.querySelector('#averageHeartHeader');


// create element & render cafe
function renderCurrentData(doc){
    // patient current lists
    let li1 = document.createElement('h1');
    let li2 = document.createElement('h1');
    let li3 = document.createElement('h1');
    let li4 = document.createElement('h1');
    let li5 = document.createElement('h1');


    // patient current lists
    li1.setAttribute('data-id', doc.id);
    li1.textContent = 'Name: ' + doc.data().name;
    li2.textContent = 'heart rate: ' + doc.data().heartrate;
    li3.textContent = 'blood pressure: ' + doc.data().bloodpressure;
    li4.textContent = 'calories burnt: ' + doc.data().calo;
    li5.textContent = 'sleeping hours: ' + doc.data().sleep;

    // patient current lists


    patName.appendChild(li1);
    patHeart.appendChild(li2)
    patBlood.appendChild(li3)
    patCalo.appendChild(li4)
    patSleep.appendChild(li5)

};


// real-time listener
db.collection('patientMeasures').orderBy('name').onSnapshot(snapshot => {
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



// patient previous lists
const nameContactList = document.querySelector('#patientContactsnameUL');
const numberContactList = document.querySelector('#patientContactsnumberUL');

// create element & render cafe
function renderData(doc){
    // patient current lists
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');

    // patient current lists

    let nameContact = document.createElement('span');
    let numberContact = document.createElement('span');


    // patient current lists
    li1.setAttribute('data-id', doc.id);
    nameContact.textContent = doc.data().name;
    numberContact.textContent = doc.data().number;

    // patient current lists

    li1.appendChild(nameContact);
    li2.appendChild(numberContact);

    nameContactList.appendChild(li1);
    numberContactList.appendChild(li2)

};

// real-time listener
db.collection('contactRecord').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderData(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});


const cafeList = document.querySelector('#patientCurrentdiseaseUL');
const pCurrMedication = document.querySelector('#patientCurrentMedicationUL');
const pCurrDoctor = document.querySelector('#patientCurrentdoctorUL');



// create element & render cafe
function renderCurData(doc){
    // patient current lists
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');

    // patient current lists

    let disease = document.createElement('span');
    let doctor = document.createElement('span');
    let medication = document.createElement('span');
    let cross = document.createElement('div');


    // patient current lists
    li1.setAttribute('data-id', doc.id);
    disease.textContent = doc.data().disease;
    doctor.textContent = doc.data().doctor;
    medication.textContent = doc.data().medication;
    cross.textContent = 'x';

    // patient current lists

    li1.appendChild(disease);
    li3.appendChild(doctor);
    li2.appendChild(medication);

    cafeList.appendChild(li1);
    pCurrMedication.appendChild(li2)
    pCurrDoctor.appendChild(li3)

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });
};


// real-time listener
db.collection('patientCurrent').orderBy('disease').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCurData(change.doc);
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
  })
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