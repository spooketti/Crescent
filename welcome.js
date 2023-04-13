const firebaseConfig = {
    apiKey: "AIzaSyAMyS_7vsiwstuFg669ZXR6YwIEX1Smf-k", //this is a problem
    authDomain: "firstproject-a2d92.firebaseapp.com",
    projectId: "firstproject-a2d92",
    storageBucket: "firstproject-a2d92.appspot.com",
    messagingSenderId: "453416245653",
    appId: "1:453416245653:web:5b5d903fcf5246afe87e9c",
    measurementId: "G-DDVEFWRJSB"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth()
  
  const provide = new firebase.auth.GoogleAuthProvider();
  function signInWithGoogle() 
    {
      firebase.auth()
      .signInWithPopup(provide)
      .then((result) => {
       
        window.location = "./index.html"
        //console.log(firebase.auth().currentUser)
      })
      .catch((error) =>
      {
        console.log(error)
      })
    }