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
    // window.location.href='perfil.html';
  } else {
    console.log('No user logged.');
  }
});

function createUser(){
	var email = document.getElementById('userEmail').value;
	var password = document.getElementById('userPassword').value;
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function() {
	  var firebaseRef = firebase.database().ref('players');
	  var userId = firebase.auth().currentUser.uid;
	  var nome = document.getElementById('userName').value;
	  
	  //SALVA O DADO INSERIDO NO ID DO USUÁRIO LOGADO
	  firebaseRef.child(userId).set({
	    Account : {
	      name: nome,
	    },
	    Hero : {
	      AdvancedAtributes: {
	        damage: 0,
	        defense: 0,
	        focus: 0,
	        lifePoints: 0,
	        manaPoints: 0,
	        Strength: 0,
	        velocity: 0,
	      },
	      BasicAtributes: {
	        atributePoints: 5,
	        vigor: 5,
	        agility: 5,
	        inteligence: 5,
	      },
	      PersonalInformation: {
	        character: "NOME",
	        race: "RAÇA",
	        clas: "CLASSE",
	        specialty: "ESPECIALIDADE",
	        size: "PORTE FÍSICO",
	        RaceBonus: {
	          vigorBonus: 0,
	          vigorPenalty: 0,
	          agilityBonus: 0,
	          agilityPenalty: 0,
	          inteligenceBonus: 0,
	          inteligencePenalty: 0,
	          bargemanBonus: 0,
	          bargemanPenalty: 0,
	          charismaticBonus: 0,
	          charismaticPenalty: 0,
	          trustworthyBonus: 0,
	          trustworthyPenalty: 0,
	          diplomatBonus: 0,
	          diplomatPenalty: 0,
	          strategistBonus: 0,
	          strategistPenalty: 0,
	          scholarBonus: 0,
	          scholarPenalty: 0,
	          impassiveBonus: 0,
	          impassivePenalty: 0,
	          preciseBonus: 0,
	          precisePenalty: 0,
	          sagaciousBonus: 0,
	          sagaciousPenalty: 0,
	          sneakyBonus: 0,
	          sneakyPenalty: 0,
	          valiantBonus: 0,
	          valiantPenalty: 0,
	          swiftBonus: 0,
	          swiftPenalty: 0,
	          toxineResistanceBonus: 0,
	          toxineResistancePenalty: 0,
	          heatResistanceBonus: 0,
	          heatResistancePenalty: 0,
	          eletricResistanceBonus: 0,
	          eletricResistancePenalty: 0,
	          coldResistanceBonus: 0,
	          coldResistancePenalty: 0,
	        },
	        SizeBonus:{
	          vigorBonus: 0,
	          vigorPenalty: 0,
	          agilityBonus: 0,
	          agilityPenalty: 0,
	        },
	      },
	      Virtues: {
	        virtuePoints: 30,
	        bargeman: 0,
	        charismatic: 0,
	        trustworthy: 0,
	        diplomat: 0,
	        strategist: 0,
	        scholar: 0,
	        impassive: 0,
	        precise: 0,
	        sagacious: 0,
	        sneaky: 0,
	        valiant: 0,
	        swift: 0,
	        toxineResistance: 0,
	        heatResistance: 0,
	        eletricResistance: 0,
	        coldResistance: 0,
	      },
	      Inventory: {
	        dummy: {
	          name: "dummy",
	          quantity: 0,
	          type: "dummy",
	          weight: 0,
	        }
	      },
	      Armour: {
	        dummy: '',
	      },
	      Abilities: {
	        dummy: '',
	      },
	    }
	  }).then(function() {
	    window.location.replace('perfil.html');
	  }).catch(function(error) {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    console.log(errorCode + errorMessage);
	  });
	})
	.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode + errorMessage);
	});
}