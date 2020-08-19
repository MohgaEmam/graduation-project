document.querySelector('#doctorSpecialization').paddingLeft = '-20%';
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user.email);
        usermail = user.email;

        const func = (data) => {
            data.forEach(element => {

                const guide = element.data();
                if (guide.email == usermail) {

                    const func1 = (data) => {
                        data.forEach(element => {

                            const guide = element.data();

                            console.log(guide.doctor, guide.specialization);

                            const docName = document.querySelector('#doctorName');
                            docName.style.marginLeft = '-20%';
                            const docSpec = document.querySelector('#doctorSpecialization');



                            let li1 = document.createElement('h1');
                            let li2 = document.createElement('h1');

                            li1.setAttribute('data-id', guide.id);
                            li1.textContent = guide.doctor;
                            li2.textContent = guide.specialization;

                            // patient current lists


                            docName.appendChild(li1);
                            docSpec.appendChild(li2);


                            const cafeList = document.querySelector('#patientList');

                            // patient current lists
                            let li = document.createElement('li');

                            // patient current lists

                            let disease = document.createElement('span');
                            let doctor = document.createElement('span');
                            const cross = document.createElement('span');


                            // patient current lists
                            li.setAttribute('data-id', guide.id);
                            disease.textContent = guide.status;
                            doctor.textContent = guide.patient;
                            cross.textContent = 'X';

                            disease.style.paddingLeft = "180%";

                            cross.style.paddingLeft = "350%";
                            cross.style.marginBottom = "150%"


                            // plus.style.paddingLeft = "40%";

                            // patient current lists

                            li.appendChild(doctor);
                            li.appendChild(disease);
                            li.appendChild(cross);
                            // li1.appendChild(plus);

                            cafeList.appendChild(li);

                            // deleting data
                            cross.addEventListener('click', (e) => {
                                e.stopPropagation();
                                let id = e.target.parentElement.getAttribute('data-id');
                                db.collection('clinc').doc(id).delete();
                            });


                        });
                    }

                    db.collection('clinc').where("email", "==", usermail).onSnapshot(snapshot => {
                        func1(snapshot.docs)
                    });
                }
            });
        }
        db.collection('users').orderBy('first_name').onSnapshot(snapshot => {
            func(snapshot.docs);
        });

    } else {
        console.log('user logged out');
    }
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