let isNewline = false
let chat = document.getElementById("Chat")
let chatbox = document.getElementById("MessagePrompt")
let username
let pfp
let profileChange = document.getElementById("ProfileChange")
let profile = document.getElementById("profile")
let profileImage = document.getElementById("profile img")
let profileName = document.getElementById("profilename")
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
let activeUser
const db = firebase.database();
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    activeUser = user
    username = user.displayName
    pfp = user.photoURL
    //console.log(pfp)
profileImage.src = pfp
    profileName.innerText = username
    var uid = user.uid;
  } else {
   window.location = "./welcome.html"
  }
});

const user = firebase.auth().currentUser;

function updateUser()
{
  let newname = document.getElementById("editName").value
  let newpfp = document.getElementById("editPFP").value
  console.log(newname)
  console.log(newpfp)
activeUser.updateProfile({
  displayName: newname,
  photoURL: newpfp
}).then(() => {
  // Update successful
  // ...
  username = activeUser.displayName
  pfp = activeUser.photoURL
  profileImage.src = activeUser.photoURL
  profileName.innerText = activeUser.displayName
  closePChange()
}).catch((error) => {
  // An error occurred
  // ...
});    
}

function profileChangeUI()
{
profileChange.style.display = "block";  
}

function closePChange()
{
  profileChange.style.display = "none";  
}


document.addEventListener("click", function(e) {
  //console.log(e.target)
//  if (e.target.id == chatbox.id) {
   // chatbox.innerText = ""
    //return; //temporarily return since i'm not sure what
    //reproducssions come from this
 // }
  //if (chatbox.innerText == "") {
    //chatbox.innerText = "Message @Idk"
  //}

  if(e.target.id == "ProfileChange")
  {
    closePChange()
  }
})

document.addEventListener("keydown", function(e) {
  //console.log(e.key)
 
  if (e.key === "Enter") {
    if (isNewline) {
      return;
    }
    e.preventDefault()
    sendMessage()
  }
  if (e.key === "Shift") {
    isNewline = true
  }

})

document.addEventListener("keyup", function(e) {
  if (e.key === "Shift") {
    isNewline = false
  }
})

function signOut()
{
  firebase.auth().signOut().then(function()
{
  window.location.reload()               
}).catch(function(error)
         {
           //sucks to suck
         })
  
}



function sendMessage() {


  // get values to be submitted
  const timestamp = Date.now();
  let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
  
 let time =  today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  

today = mm + '/' + dd + '/' + yyyy + " at " + time;
  //console.log(today)
  const message = chatbox.innerText
  //if(message.replace(" ","") == "")
  //{
  //  return
  //}

  if (!/\S/.test(message)) { //why would you do it like this
    return
  }


  // clear the input box
  chatbox.innerText = "";

  /*
  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    */

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
    pfp,
    today,
  });
}
const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function(snapshot) {
  const messages = snapshot.val();
  
  let messageDiv = document.createElement("div") //#Chat div
  chat.appendChild(messageDiv)
  
  let pfp = document.createElement("img")
  pfp.src = messages.pfp
  messageDiv.appendChild(pfp) //#Chat div img
  
  let messageContent = document.createElement("div") //Chat div div
  messageDiv.appendChild(messageContent)
  
  let userNameHeader = document.createElement("p") //Chat div div p
  userNameHeader.innerHTML = "<b>" +  messages.username + "</b>" + " " +  messages.today
  messageContent.appendChild(userNameHeader)

 // messageContent.appendChild(document.createElement("br"))
  
  let message = document.createElement("span") //Chat div div span
  message.innerText = messages.message 
  messageContent.appendChild(message)
  
  chat.scrollTop = chat.scrollHeight;
});

function focusPrompt(focus)
{
 // console.log( (!/\S/.test(chatbox.innerText)) )
  let y = document.getElementById("stupid")
   if(focus){ 
      document.getElementById("stupid").style.display = "none"
    return
     }
 if(!focus && (!/\S/.test(chatbox.innerText)))
 {
   y.style.display = "block"
   return
 }
 
  
}

