auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user.email);
        usermail = user.email;
        // safe new patient

        const func = (data) => {
            data.forEach(element => {

                const guide = element.data();
                if (guide.email == usermail) {
                    console.log('function 1 :  ', guide.email)
                    const func1 = (data) => {



                        data.forEach(element => {

                            const guide = element.data();

                            console.log(guide.doctor, guide.specialization);

                            const docName = document.querySelector('#doctorName');

                            const docSpec = document.querySelector('#doctorSpecialization');


                            let li1 = document.createElement('h1');
                            let li2 = document.createElement('h1');
                            li2.style.paddingRight = '50%';

                            li1.setAttribute('data-id', guide.id);
                            li1.textContent = guide.patient;
                            li2.textContent = guide.status;

                            // patient current lists


                            docName.appendChild(li1);
                            docSpec.appendChild(li2);


                            
                        });
                    }

                    db.collection('clinc').where("email", "==", usermail).onSnapshot(snapshot => {

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

// // patient previous lists
// const docName = document.querySelector('#doctorName');
// const docSpec = document.querySelector('#doctorSpecialization');


// // create element & render cafe
// function renderHeaderData(doc){
//     // patient current lists
//     let li1 = document.createElement('h1');
//     let li2 = document.createElement('h1');


//     // patient current lists
//     li1.setAttribute('data-id', doc.id);
//     li1.textContent = 'name: ' + doc.data().patient;
//     li2.textContent = 'status: ' + doc.data().status;

//     // patient current lists
//     li2.style.marginLeft = '-50%';

//     docName.appendChild(li1);
//     docSpec.appendChild(li2)

// };


// // real-time listener
// db.collection('clinc').orderBy('doctor').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         console.log(change.doc.data());
//         if(change.type == 'added'){
//             renderHeaderData(change.doc);
//         } else if (change.type == 'removed'){
//             let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
//             cafeList.removeChild(li);
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

});

// save new contact


addContact = document.getElementById('addContact-form');

addContact.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('contactRecord').add({
        name: addContact.name.value,
        number: addContact.number.value
    });
    addContact.name.value = '';
    addContact.number.value = '';
});

// save new contact


addDoctor = document.getElementById('addDoctor-form');

addDoctor.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('patientCurrent').add({
        doctor: addDoctor.doctor.value,
        specialization: addDoctor.specialization.value
    });
    addDoctor.doctor.value = '';
    addDoctor.specialization.value = '';
});








// update data

docUpdate = document.getElementById('updateDoctor');

// patient previous lists
const cafeList = document.querySelector('#contactName');



// create element & render cafe
function renderCurrentData(doc) {
    // patient current lists
    let li1 = document.createElement('li');

    // patient current lists

    let disease = document.createElement('span');
    let doctor = document.createElement('span');
    let update = document.createElement('a');
    const cross = document.createElement('span');

    let nameVar = document.getElementById('updateContact-form');
    // patient current lists
    li1.setAttribute('data-id', doc.id);
    disease.textContent = doc.data().number;
    doctor.textContent = doc.data().name;
    update.textContent = 'update';
    cross.textContent = 'X';

    cross.style.marginLeft = "100%";
    cross.style.marginBottom = "50%";
    disease.style.marginLeft = "80%";
    doctor.style.paddingLeft = "50%";

    update.style.marginLeft = "180%";

    update.setAttribute('data-target', "modal-update");
    update.classList.add('modal-trigger');
    update.classList.add('messageDoctor');

    // patient current lists

    li1.appendChild(doctor);
    li1.appendChild(disease);
    li1.appendChild(update);
    li1.appendChild(cross);

    cafeList.appendChild(li1);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id)
        db.collection('contactRecord').doc(id).delete();
    });

    update.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const elem = document.getElementById('modal-update');
        const instance = M.Modal.init(elem, { dismissible: false });
        instance.open();
        let id = e.target.parentElement.getAttribute('data-id');
        nameVar.addEventListener('submit' , (n) => {
            n.preventDefault();
            db.collection('contactRecord').doc(id).update({
                name: nameVar.contactUpdateName.value,
                number: nameVar.contactUpdateNumber.value
            });
            nameVar.contactUpdateName.value = '';
            nameVar.contactUpdateNumber.value = '';
        });
    });
};



// real-time listener
db.collection('contactRecord').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            renderCurrentData(change.doc);
        } else if (change.type == 'removed') {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});



// patient previous lists
const docList = document.querySelector('#doctorList');
const updateForm = document.getElementById('updateDoctor-form')


// create element & render cafe
function renderData(doc) {
    // patient current lists
    let li1 = document.createElement('li');

    // patient current lists

    let disease = document.createElement('span');
    let doctor = document.createElement('span');
    let update = document.createElement('a');
    const cross = document.createElement('span');


    // patient current lists
    li1.setAttribute('data-id', doc.id);
    disease.textContent = doc.data().specialization;
    doctor.textContent = doc.data().doctor;
    update.textContent = 'update';
    cross.textContent = 'X';

    cross.style.marginLeft = "170%";
    cross.style.marginBottom = "50%";
    disease.style.marginLeft = "100%";

    update.style.marginLeft = "120%";

    update.setAttribute('data-target', "modal-update");
    update.classList.add('modal-trigger');
    update.classList.add('messageDoctor');

    // patient current lists

    li1.appendChild(doctor);
    li1.appendChild(disease);
    li1.appendChild(update);
    li1.appendChild(cross);

    docList.appendChild(li1);

    let nameVar = document.getElementById('updateDoctor-form');

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id)
        db.collection('patientCurrent').doc(id).delete();
    });

    update.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const elem = document.getElementById('modal-doctor');
        const instance = M.Modal.init(elem, { dismissible: false });
        instance.open();
        let id = e.target.parentElement.getAttribute('data-id');
        nameVar.addEventListener('submit' , (n) => {
            n.preventDefault();
            db.collection('patientCurrent').doc(id).update({
                doctor: nameVar.doctorName.value,
                specialization: nameVar.doctorSpecialization.value
            });
            nameVar.doctorName.value = '';
            nameVar.doctorSpecialization.value = '';
        });
    });

};

// real-time listener
db.collection('patientCurrent').orderBy('doctor').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            renderData(change.doc);
        } else if (change.type == 'removed') {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
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