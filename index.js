var config = {
  apiKey: "AIzaSyD_AzO3Lh6CN_CnlilS6ksYGU0FtxQRtVE",
  authDomain: "tablerpg-de9c9.firebaseapp.com",
  databaseURL: "https://tablerpg-de9c9.firebaseio.com",
  projectId: "tablerpg-de9c9",
  storageBucket: "tablerpg-de9c9.appspot.com",
  messagingSenderId: "339042049096",
  appId: "1:339042049096:web:cac1910d581992b9"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('User logged!');
    // window.location.href='perfil.html';
  } else {
    console.log('No user logged.');
  }
});

function signinUser(){
	var email = document.getElementById('userEmail').value;
	var password = document.getElementById('userPassword').value;

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(
		function(){
			window.location.replace('perfil.html');
		}
	)
	.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
	});
}