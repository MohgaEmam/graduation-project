auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user.email);
        usermail = user.email;
        // safe new patient

        addContact = document.getElementById('addContact-form');

        addContact.addEventListener('submit', (e) => {
            e.preventDefault();
            db.collection('clinc').add({
                patient: addContact.name.value,
                status: addContact.number.value,
                email: user.email,
                name: 'mainclinic',
                specialization: 'all'
            });
            addContact.name.value = '';
            addContact.number.value = '';
        });

        addDoctor = document.getElementById('addDoctor-form');

        addDoctor.addEventListener('submit', (e) => {
            e.preventDefault();
            db.collection('clinc').add({
                name: addDoctor.name.value,
                specialization: addDoctor.specialization.value,
                email: user.email,
                patient: 'female',
                status: 'waiting'
            });
            addDoctor.name.value = '';
            addDoctor.specialization.value = '';
        });
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

                            li1.setAttribute('data-id', guide.id);
                            li1.textContent = guide.doctor;
                            li2.textContent = guide.specialization;

                            // patient current lists


                            docName.appendChild(li1);
                            docSpec.appendChild(li2);


                            const cafeList = document.querySelector('#patientNameList');

                            let li = document.createElement('li');

                            // patient current lists

                            let disease = document.createElement('span');
                            let doctor = document.createElement('span');
                            let update = document.createElement('a');
                            const cross = document.createElement('span');

                            let nameVar = document.getElementById('updateContact-form');
                            // patient current lists
                            li.setAttribute('data-id', guide.id);
                            disease.textContent = guide.status;
                            doctor.textContent = guide.patient;
                            update.textContent = 'update';
                            cross.textContent = 'X';

                            cross.style.marginLeft = "100%";
                            cross.style.marginBottom = "50%";
                            disease.style.marginLeft = "100%";

                            update.style.marginLeft = "180%";
                            doctor.classList.add('update-span')
                            update.setAttribute('data-target', "modal-update");
                            update.classList.add('modal-trigger');
                            update.classList.add('messageDoctor');
                            update.classList.add('updateLink')

                            // patient current lists

                            li.appendChild(doctor);
                            li.appendChild(disease);
                            li.appendChild(update);
                            li.appendChild(cross);

                            cafeList.appendChild(li);

                            // deleting data
                            cross.addEventListener('click', (e) => {
                                e.stopPropagation();
                                e.target.parentElement.setAttribute('data-id', 'removed')
                                console.log(e.target.parentElement)
                                cafeList.removeChild(e.target.parentElement);
                            });

                            update.addEventListener('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const elem = document.getElementById('modal-update');
                                const instance = M.Modal.init(elem, { dismissible: false });
                                instance.open();
                                e.target.parentElement.setAttribute('data-id', 'added');
                                let id = e.target.parentElement.getAttribute('data-id');
                                console.log(e.target.parentElement.querySelector('.update-span').innerHTML);
                                searchName = e.target.parentElement.querySelector('.update-span').innerHTML;
                                db.collection('clinc').orderBy('email').onSnapshot(snapshot => {
                                    console.log(snapshot.docs)
                                    console.log(li.target)

                                    console.log('e: ', e.target.parentElement)
                                    snapshot.docs.forEach(iter => {
                                        console.log(iter.id);
                                    })

                                    nameVar.addEventListener('submit', (n) => {
                                        n.preventDefault();
                                        db.collection('clinc').where("patient", "==", e.target.parentElement.querySelector('.update-span').innerHTML).onSnapshot(snapshot => {

                                            func1(snapshot.docs);
                                        });
                                        db.collection('clinc').doc(snapshot.docs[0].id).update({
                                            patient: nameVar.contactUpdateName.value,
                                            status: nameVar.contactUpdateNumber.value
                                        });
                                        nameVar.contactUpdateName.value = '';
                                        nameVar.contactUpdateNumber.value = '';
                                    });
                                });

                            });

                            const docList = document.querySelector('#clincList');

                            let li3 = document.createElement('li');

                            // patient current lists

                            let disease1 = document.createElement('span');
                            let doctor1 = document.createElement('span');
                            let update1 = document.createElement('a');
                            const cross1 = document.createElement('span');


                            // patient current lists
                            li3.setAttribute('data-id', guide.id);
                            disease1.textContent = guide.specialization;
                            doctor1.textContent = guide.name;
                            update1.textContent = 'update';
                            cross1.textContent = 'X';

                            cross1.style.marginLeft = "50%";
                            cross1.style.marginBottom = "50%";
                            disease1.style.marginLeft = "100%";

                            update1.style.marginLeft = "100%";

                            update1.setAttribute('data-target', "modal-update");
                            update1.classList.add('modal-trigger');
                            update1.classList.add('messageDoctor');
                            doctor1.classList.add('update-span1')

                            // patient current lists

                            li3.appendChild(doctor1);
                            li3.appendChild(disease1);
                            li3.appendChild(update1);
                            li3.appendChild(cross1);

                            docList.appendChild(li3);

                            let nameVar1 = document.getElementById('updateDoctor-form');

                            // deleting data
                            cross1.addEventListener('click', (e) => {
                                e.stopPropagation();
                                e.target.parentElement.setAttribute('data-id', 'removed')
                                console.log(e.target.parentElement)
                                docList.removeChild(e.target.parentElement);
                            });

                            update1.addEventListener('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const elem = document.getElementById('modal-doctor');
                                const instance = M.Modal.init(elem, { dismissible: false });
                                instance.open();
                                e.target.parentElement.setAttribute('data-id', 'added');
                                let id = e.target.parentElement.getAttribute('data-id');
                                console.log(e.target.parentElement.querySelector('.update-span1').innerHTML);
                                searchName = e.target.parentElement.querySelector('.update-span1').innerHTML;
                                db.collection('clinc').orderBy('email').onSnapshot(snapshot => {
                                    console.log(snapshot.docs)

                                    console.log('e: ', e.target.parentElement)
                                    snapshot.docs.forEach(iter => {
                                        console.log(iter.id);
                                    })

                                    nameVar1.addEventListener('submit', (n) => {
                                        n.preventDefault();
                                        db.collection('clinc').where("patient", "==", e.target.parentElement.querySelector('.update-span1').innerHTML).onSnapshot(snapshot => {

                                            func1(snapshot.docs);
                                        });
                                        db.collection('clinc').doc(snapshot.docs[2].id).update({
                                            name: nameVar1.doctorName.value,
                                            specialization: nameVar1.doctorSpecialization.value
                                        });
                                        name.doctorName.value = '';
                                        specialization.doctorSpecialization.value = '';
                                    });
                                });
                            });
                            /*
                            
                            */


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


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
        location.replace('/index.html')
    })
});


document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
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