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

var userId;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;
    getUserData();
  }
});

var currentTab = 'personalInformationTab';

function showTab(tab){
  var oldTab = document.getElementById(currentTab);
  oldTab.style.display = 'none';
  var newTab = document.getElementById(tab);
  currentTab = tab;
  newTab.style.display = 'block';
}

//INFORMAÇÕES PESSOAIS
var character = document.getElementById('character');
var race = document.getElementById('race');
var clas = document.getElementById('clas');
var specialty = document.getElementById('specialty');
var size = document.getElementById('size');

function editProperty(propertyName){
  var editableLineName = propertyName + 'Edit';
  document.getElementById(editableLineName).style.display = 'block';
  var displayLineName = propertyName + 'Line';
  document.getElementById(displayLineName).style.display = 'none';
}

function characterUpdate() {
  var characterInput = document.getElementById('characterInput');
  firebase.database().ref('players/' + userId + '/Hero/PersonalInformation').update({'character': characterInput.value});
  document.getElementById('characterLine').style.display = 'block';
  document.getElementById('characterEdit').style.display = 'none';
}

function raceUpdate() {
  var raceInput = document.getElementById('raceInput');
  firebase.database().ref('players/' + userId + '/Hero/PersonalInformation').update({'race': raceInput.value});
  setRaceBonus(raceInput.value);
  document.getElementById('raceLine').style.display = 'block';
  document.getElementById('raceEdit').style.display = 'none';
}

function clasUpdate() {
  var clasInput = document.getElementById('clasInput');
  firebase.database().ref('players/' + userId + '/Hero/PersonalInformation').update({'clas': clasInput.value});
  document.getElementById('clasLine').style.display = 'block';
  document.getElementById('clasEdit').style.display = 'none';
	showSpecialty(clasInput.value);
}

function showSpecialty(myClass) {
	switch (myClass) {
		case 'Paladino':
			specialtyInput.innerHTML = '';
			specialtyInput.insertAdjacentHTML(
				'beforeend',
				`<option value="" disabled selected hidden>ESPECIALIDADE</option>
				<option value="Espadachim">Espadachim</option>
				<option value="Lanceiro">Lanceiro</option>
				<option value="Maceiro">Maceiro</option>`
			);
			break;
		case 'Caçador':
			specialtyInput.innerHTML = '';
			specialtyInput.insertAdjacentHTML(
				'beforeend',
				`<option value="" disabled selected hidden>ESPECIALIDADE</option>
				<option value="Arqueiro">Arqueiro</option>
				<option value="Besteiro">Besteiro</option>
				<option value="Assassino">Assassino</option>`
			);
			break;
		case 'Elementalista':
			specialtyInput.innerHTML = '';
			specialtyInput.insertAdjacentHTML(
				'beforeend',
				`<option value="" disabled selected hidden>ESPECIALIDADE</option>
				<option value="Piromante">Piromante</option>
				<option value="Petramante">Petramante</option>
				<option value="Criomante">Criomante</option>
				<option value="Aeromante">Aeromante</option>`
			);
			break;
		case 'Hierofante':
			specialtyInput.innerHTML = '';
			specialtyInput.insertAdjacentHTML(
				'beforeend',
				`<option value="" disabled selected hidden>ESPECIALIDADE</option>
				<option value="Curandeiro">Curandeiro</option>
				<option value="Protetor">Protetor</option>
				<option value="Abençoador">Abençoador</option>`
			);
			break;
		case 'Bardo':
			specialtyInput.innerHTML = '';
			specialtyInput.insertAdjacentHTML(
				'beforeend',
				`<option value="" disabled selected hidden>ESPECIALIDADE</option>
				<option value="Cantor">Cantor</option>
				<option value="Instrumentista">Instrumentista</option>
				<option value="Ator">Ator</option>`
			);
			break;
		case 'Arcanista':
			specialtyInput.innerHTML = '';
			specialtyInput.insertAdjacentHTML(
				'beforeend',
				`<option value="" disabled selected hidden>ESPECIALIDADE</option>
				<option value="Cronomante">Cronomante</option>
				<option value="Psicomante">Pscicomante</option>`
			);
			break;
		case 'Domador de Feras':
			specialtyInput.innerHTML = '';
			specialtyInput.insertAdjacentHTML(
				'beforeend',
				`<option value="" disabled selected hidden>ESPECIALIDADE</option>
				<option value="Bestas terrestres">Bestas terrestres</option>
				<option value="Bestas aquáticas">Bestas aquáticas</option>
				<option value="Bestas aladas">Bestas aladas</option>`
			);
			break;
	}
}

function specialtyUpdate() {
  var specialtyInput = document.getElementById('specialtyInput');
  firebase.database().ref('players/' + userId + '/Hero/PersonalInformation').update({'specialty': specialtyInput.value});
  document.getElementById('specialtyLine').style.display = 'block';
  document.getElementById('specialtyEdit').style.display = 'none';
}

function sizeUpdate() {
  var sizeInput = document.getElementById('sizeInput');
	firebase.database().ref('players/' + userId + '/Hero/PersonalInformation').update({'size': sizeInput.value});
	setSizeBonus(sizeInput.value);
	document.getElementById('sizeLine').style.display = 'block';
  document.getElementById('sizeEdit').style.display = 'none';
}

var atributePoints, vigor, vigorBonus, vigorPenalty, totalVigor, agility, agilityBonus, agilityPenalty, totalAgility, inteligence, inteligenceBonus, inteligencePenalty, totalInteligence = 0;
var lifePoints, lifePointsBase, manaPoints, manaPointsBase, strength, focus, velocity, damage, defense = 0;
var virtuePoints, bargeman, totalBargeman, charismatic, totalCharismatic, trustworthy, totalTrustworthy, diplomat, totalDiplomat, strategist, totalStrategist, scholar,totalScholar, impassive, totalImpassive, precise, totalPrecise, sagacious, totalSagacious, sneaky, totalSneaky, valiant, totalValiant, swift, totalSwift, toxineResistance, totalToxineResistance, heatResistance, totalHeatResistance, eletricResistance, totalEletricResistance, coldResistance, totalColdResistance = 0;
var bargemanBonus, bargemanPenalty, charismaticBonus, charismaticPenalty, trustworthyBonus, trustworthyPenalty, diplomatBonus, diplomatPenalty, strategistBonus, strategistPenalty, scholarBonus, scholarPenalty, impassiveBonus, impassivePenalty, preciseBonus, precisePenalty, sagaciousBonus, sagaciousPenalty, sneakyBonus, sneakyPenalty, valiantBonus, valiantPenalty, swiftBonus, swiftPenalty, toxineResistanceBonus, toxineResistancePenalty, heatResistanceBonus, heatResistancePenalty, eletricResistanceBonus, eletricResistancePenalty, coldResistanceBonus, coldResistancePenalty = 0;
var vigorMultiply, agilityMultiply, inteligenceMultiply, bargemanMultiply, charismaticMultiply, trustworthyMultiply, diplomatMultiply, strategistMultiply, scholarMultiply, impassiveMultiply, preciseMultiply, sagaciousMultiply, sneakyMultiply, valiantMultiply, swiftMultiply, toxineResistanceMultiply, heatResistanceMultiply, eletricResistanceMultiply, coldResistanceMultiply, lifePointsMultiply, manaPointsMultiply, strengthMultiply, focusMultiply, velocityMultiply, damageMultiply, defenseMultiply = 0;
var bagPoints, bagPointsBase, weightCarried, weight, armourWeight, armourDamage, armourDefense = 0;
var inventoryHTML = document.getElementById('inventoryHTML');
var myInventory = '';
var moral, battleDamage, turn = 0;
var battling = false;
var armourHTML = document.getElementById('armourHTML');
var myArmour = '';
var inventory, armour, abilities;
var abilitiesHTML = document.getElementById('abilitiesHTML');
var myAbilities = '';
var myStatus;
var statusLine = '';

function getUserData() {
  firebase.database().ref('players/' + userId).on('value', function(snapshot) {
    // CATCH ALL INFO -------------------------------------------------------------------------------------------
    // Personal Information Bonus and Penalties
    vigorBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.vigorBonus + snapshot.val().Hero.PersonalInformation.SizeBonus.vigorBonus + snapshot.val().Hero.Battle.Bonus.vigorBonus;
    vigorPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.vigorPenalty + snapshot.val().Hero.PersonalInformation.SizeBonus.vigorPenalty + snapshot.val().Hero.Battle.Bonus.vigorPenalty;
    agilityBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.agilityBonus + snapshot.val().Hero.PersonalInformation.SizeBonus.agilityBonus + snapshot.val().Hero.Battle.Bonus.agilityBonus;
    agilityPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.agilityPenalty + snapshot.val().Hero.PersonalInformation.SizeBonus.agilityPenalty + snapshot.val().Hero.Battle.Bonus.agilityPenalty;
    inteligenceBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.inteligenceBonus + snapshot.val().Hero.Battle.Bonus.inteligenceBonus;
    inteligencePenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.inteligencePenalty + snapshot.val().Hero.Battle.Bonus.inteligencePenalty;
    
    bargemanBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.bargemanBonus + snapshot.val().Hero.Battle.Bonus.bargemanBonus;
    bargemanPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.bargemanPenalty + snapshot.val().Hero.Battle.Bonus.bargemanPenalty;
    
    charismaticBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.charismaticBonus + snapshot.val().Hero.Battle.Bonus.charismaticBonus;
    charismaticPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.charismaticPenalty + snapshot.val().Hero.Battle.Bonus.charismaticPenalty;
    
    trustworthyBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.trustworthyBonus + snapshot.val().Hero.Battle.Bonus.trustworthyBonus;
    trustworthyPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.trustworthyPenalty + snapshot.val().Hero.Battle.Bonus.trustworthyPenalty;
    
    diplomatBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.diplomatBonus + snapshot.val().Hero.Battle.Bonus.diplomatBonus;
    diplomatPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.diplomatPenalty + snapshot.val().Hero.Battle.Bonus.diplomatPenalty;
    
    strategistBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.strategistBonus + snapshot.val().Hero.Battle.Bonus.strategistBonus;
    strategistPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.strategistPenalty + snapshot.val().Hero.Battle.Bonus.strategistPenalty;
    
    scholarBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.scholarBonus + snapshot.val().Hero.Battle.Bonus.scholarBonus;
    scholarPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.scholarPenalty + snapshot.val().Hero.Battle.Bonus.scholarPenalty;
    
    impassiveBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.impassiveBonus + snapshot.val().Hero.Battle.Bonus.impassiveBonus;
    impassivePenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.impassivePenalty + snapshot.val().Hero.Battle.Bonus.impassivePenalty;
    
    preciseBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.preciseBonus + snapshot.val().Hero.Battle.Bonus.preciseBonus;
    precisePenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.precisePenalty + snapshot.val().Hero.Battle.Bonus.precisePenalty;
    
    sagaciousBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.sagaciousBonus + snapshot.val().Hero.Battle.Bonus.sagaciousBonus;
    sagaciousPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.sagaciousPenalty + snapshot.val().Hero.Battle.Bonus.sagaciousPenalty;
    
    sneakyBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.sneakyBonus + snapshot.val().Hero.Battle.Bonus.sneakyBonus;
    sneakyPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.sneakyPenalty + snapshot.val().Hero.Battle.Bonus.sneakyPenalty;
    
    valiantBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.valiantBonus + snapshot.val().Hero.Battle.Bonus.valiantBonus;
    valiantPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.valiantPenalty + snapshot.val().Hero.Battle.Bonus.valiantPenalty;
    
    swiftBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.swiftBonus + snapshot.val().Hero.Battle.Bonus.swiftBonus;
    swiftPenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.swiftPenalty + snapshot.val().Hero.Battle.Bonus.swiftPenalty;
    
    toxineResistanceBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.toxineResistanceBonus + snapshot.val().Hero.Battle.Bonus.toxineResistanceBonus;
    toxineResistancePenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.toxineResistancePenalty + snapshot.val().Hero.Battle.Bonus.toxineResistancePenalty;
    
    heatResistanceBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.heatResistanceBonus + snapshot.val().Hero.Battle.Bonus.heatResistanceBonus;
    heatResistancePenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.heatResistancePenalty + snapshot.val().Hero.Battle.Bonus.heatResistancePenalty;
    
    eletricResistanceBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.eletricResistanceBonus + snapshot.val().Hero.Battle.Bonus.eletricResistanceBonus;
    eletricResistancePenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.eletricResistancePenalty + snapshot.val().Hero.Battle.Bonus.eletricResistancePenalty;
    
    coldResistanceBonus = snapshot.val().Hero.PersonalInformation.RaceBonus.coldResistanceBonus + snapshot.val().Hero.Battle.Bonus.coldResistanceBonus;
    coldResistancePenalty = snapshot.val().Hero.PersonalInformation.RaceBonus.coldResistancePenalty + snapshot.val().Hero.Battle.Bonus.coldResistancePenalty;
    
    //Basic Atributes
    atributePoints = snapshot.val().Hero.BasicAtributes.atributePoints;
    vigor = snapshot.val().Hero.BasicAtributes.vigor;
    agility = snapshot.val().Hero.BasicAtributes.agility;
    inteligence = snapshot.val().Hero.BasicAtributes.inteligence;
    
    //Advanced Atributes
    moral = snapshot.val().Hero.AdvancedAtributes.moral;
    
    //Virtues
    virtuePoints = snapshot.val().Hero.Virtues.virtuePoints;
    bargeman = snapshot.val().Hero.Virtues.bargeman;
    charismatic = snapshot.val().Hero.Virtues.charismatic;
    trustworthy = snapshot.val().Hero.Virtues.trustworthy;
    diplomat = snapshot.val().Hero.Virtues.diplomat;
    strategist = snapshot.val().Hero.Virtues.strategist;
    scholar = snapshot.val().Hero.Virtues.scholar;
    impassive = snapshot.val().Hero.Virtues.impassive;
    precise = snapshot.val().Hero.Virtues.precise;
    sagacious = snapshot.val().Hero.Virtues.sagacious;
    sneaky = snapshot.val().Hero.Virtues.sneaky;
    valiant = snapshot.val().Hero.Virtues.valiant;
    swift = snapshot.val().Hero.Virtues.swift;
    toxineResistance = snapshot.val().Hero.Virtues.toxineResistance;
    heatResistance = snapshot.val().Hero.Virtues.heatResistance;
    eletricResistance = snapshot.val().Hero.Virtues.eletricResistance;
    coldResistance = snapshot.val().Hero.Virtues.coldResistance;
    
    //Armour
    armour = snapshot.val().Hero.Armour;
    myArmour = '';
    armourWeight = 0;
    armourDamage = 0;
    armourDefense = 0;

    //Inventory
    inventory = snapshot.val().Hero.Inventory;
    myInventory = '';
    weightCarried = 0;
    
    //Abilities
    abilities = snapshot.val().Hero.Abilities;
    myAbilities = '';

    //Battle
    battling = snapshot.val().Hero.Battle.battling;
    turn = snapshot.val().Hero.Battle.turn;
    lifeBonus = snapshot.val().Hero.Battle.lifeBonus;
    lifePenalty = snapshot.val().Hero.Battle.lifePenalty;
    manaBonus = snapshot.val().Hero.Battle.manaBonus;
    manaPenalty = snapshot.val().Hero.Battle.manaPenalty;
    myStatus = snapshot.val()['Hero']['Battle']['status'];
    statusLine = '';
    
    //Multiplies
    vigorMultiply = snapshot.val().Hero.Battle.Multiply.vigorMultiply;
    agilityMultiply = snapshot.val().Hero.Battle.Multiply.agilityMultiply;
    inteligenceMultiply = snapshot.val().Hero.Battle.Multiply.inteligenceMultiply;
    
    bargemanMultiply = snapshot.val().Hero.Battle.Multiply.bargemanMultiply;
    charismaticMultiply = snapshot.val().Hero.Battle.Multiply.charismaticMultiply;
    trustworthyMultiply = snapshot.val().Hero.Battle.Multiply.trustworthyMultiply;
    diplomatMultiply = snapshot.val().Hero.Battle.Multiply.diplomatMultiply;
    strategistMultiply = snapshot.val().Hero.Battle.Multiply.strategistMultiply;
    scholarMultiply = snapshot.val().Hero.Battle.Multiply.scholarMultiply;
    impassiveMultiply = snapshot.val().Hero.Battle.Multiply.impassiveMultiply;
    preciseMultiply = snapshot.val().Hero.Battle.Multiply.preciseMultiply;
    sagaciousMultiply = snapshot.val().Hero.Battle.Multiply.sagaciousMultiply;
    sneakyMultiply = snapshot.val().Hero.Battle.Multiply.sneakyMultiply;
    valiantMultiply = snapshot.val().Hero.Battle.Multiply.valiantMultiply;
    swiftMultiply = snapshot.val().Hero.Battle.Multiply.swiftMultiply;
    toxineResistanceMultiply = snapshot.val().Hero.Battle.Multiply.toxineResistanceMultiply;
    heatResistanceMultiply = snapshot.val().Hero.Battle.Multiply.heatResistanceMultiply;
    eletricResistanceMultiply = snapshot.val().Hero.Battle.Multiply.eletricResistanceMultiply;
    coldResistanceMultiply = snapshot.val().Hero.Battle.Multiply.coldResistanceMultiply;
    
    lifePointsMultiply = snapshot.val().Hero.Battle.Multiply.lifePointsMultiply;
    manaPointsMultiply = snapshot.val().Hero.Battle.Multiply.manaPointsMultiply;
    strengthMultiply = snapshot.val().Hero.Battle.Multiply.strengthMultiply;
    focusMultiply = snapshot.val().Hero.Battle.Multiply.focusMultiply;
    velocityMultiply = snapshot.val().Hero.Battle.Multiply.velocityMultiply;
    damageMultiply = snapshot.val().Hero.Battle.Multiply.damageMultiply;
    defenseMultiply = snapshot.val().Hero.Battle.Multiply.defenseMultiply;
    
    //CALCULATIONS -------------------------------------------------------------------------------------------
    totalVigor = (vigor + vigorBonus - vigorPenalty) * vigorMultiply;
    totalAgility = (agility + agilityBonus - agilityPenalty) * agilityMultiply;
    totalInteligence = (inteligence + inteligenceBonus - inteligencePenalty) * inteligenceMultiply;
    
    totalBargeman = bargeman + bargemanBonus - bargemanPenalty;
    totalCharismatic = charismatic + charismaticBonus - charismaticPenalty;
    totalTrustworthy = trustworthy + trustworthyBonus - trustworthyPenalty;
    totalDiplomat = diplomat + diplomatBonus - diplomatPenalty;
    totalStrategist = strategist + strategistBonus - strategistPenalty;
    totalScholar = scholar + scholarBonus - scholarPenalty;
    totalImpassive = impassive + impassiveBonus - impassivePenalty;
    totalPrecise = precise + preciseBonus - precisePenalty;
    totalSagacious = sagacious + sagaciousBonus - sagaciousPenalty;
    totalSneaky = sneaky + sneakyBonus - sneakyPenalty;
    totalValiant = valiant + valiantBonus - valiantPenalty;
    totalSwift = swift + swiftBonus - swiftPenalty;
    totalToxineResistance = toxineResistance + toxineResistanceBonus - toxineResistancePenalty;
    totalHeatResistance = heatResistance + heatResistanceBonus - heatResistancePenalty;
    totalEletricResistance = eletricResistance + eletricResistanceBonus - eletricResistancePenalty;
    totalColdResistance = coldResistance + coldResistanceBonus - coldResistancePenalty;
    
    if(lifePenalty < lifeBonus){
      totalLifePenalty = 0;
      firebase.database().ref('players/' + userId + '/Hero/Battle').update({'lifeBonus': 0});
      firebase.database().ref('players/' + userId + '/Hero/Battle').update({'lifePenalty': 0});
    } else {
      totalLifePenalty = lifePenalty - lifeBonus;
    }
    
    if(manaPenalty < manaBonus){
      totalManaPenalty = 0;
      firebase.database().ref('players/' + userId + '/Hero/Battle').update({'manaBonus': 0});
      firebase.database().ref('players/' + userId + '/Hero/Battle').update({'manaPenalty': 0});
    } else {
      totalManaPenalty = manaPenalty - manaBonus;
    }
    
    Object.keys(inventory).forEach(function(key) {
      if (key === 'bagPoints'){
        myInventory = myInventory;
      } else {
        switch(inventory[key]['type']){
          case 'consumable':
            myInventory += `<hr><div>
            <p class="row boldFont">` + key + ` (` + inventory[key]['effect'] + `)</p>
            <p class="row">Quantidade: `+ inventory[key]['quantity'] + `</p>
            <p class="row">Peso: ` + parseInt(inventory[key]['weight']) * parseInt(inventory[key]['quantity']) + `</p>
            <p class="row">
            <button type="button" class="button-3" onclick="useItem('` + key + `')">USAR</button>
            <button type="button" class="button-3" onclick="removeItem('` + key + `')">DESCARTAR</button>
            </p>
            </div>`;
            break;
          case 'armadura':
            myInventory += `<hr><div>
            <p class="row boldFont">` + key + `</p>
            <p class="row">Quantidade: `+ inventory[key]['quantity'] + `</p>
            <p class="row">Peso: ` + parseInt(inventory[key]['weight']) * parseInt(inventory[key]['quantity']) + `</p>
            <p class="row">
            <button type="button" class="button-3" onclick="equip('` + key + `')">EQUIPAR</button>
            <button type="button" class="button-3" onclick="removeItem('` + key + `')">DESCARTAR</button>
            </p>
            </div>`;
            break;
          case 'arma':
            myInventory += `<hr><div>
            <p class="row boldFont">` + key + `</p>
            <p class="row">Quantidade: `+ inventory[key]['quantity'] + `</p>
            <p class="row">Peso: ` + parseInt(inventory[key]['weight']) * parseInt(inventory[key]['quantity']) + `</p>
            <p class="row">
            <button type="button" class="button-3" onclick="equip('` + key + `')">EQUIPAR</button>
            <button type="button" class="button-3" onclick="removeItem('` + key + `')">DESCARTAR</button>
            </p>
            </div>`;
            break;
          case 'disparador':
            myInventory += `<hr><div>
            <p class="row boldFont">` + key + `</p>
            <p class="row">Quantidade: `+ inventory[key]['quantity'] + `</p>
            <p class="row">Peso: ` + parseInt(inventory[key]['weight']) * parseInt(inventory[key]['quantity']) + `</p>
            <p class="row">
            <button type="button" class="button-3" onclick="equip('` + key + `')">EQUIPAR</button>
            <button type="button" class="button-3" onclick="removeItem('` + key + `')">DESCARTAR</button>
            </p>
            </div>`;
            break;
          case 'munição':
            myInventory += `<hr><div>
            <p class="row boldFont">` + key + `</p>
            <p class="row">Quantidade: `+ inventory[key]['quantity'] + `</p>
            <p class="row">Peso: ` + parseInt(inventory[key]['weight']) * parseInt(inventory[key]['quantity']) + `</p>
            <p class="row">
            <button type="button" class="button-3" onclick="equip('` + key + `')">EQUIPAR</button>
            <button type="button" class="button-3" onclick="removeItem('` + key + `')">DESCARTAR</button>
            </p>
            </div>`;
            break;
          case 'conduíte':
            myInventory += `<hr><div>
            <p class="row boldFont">` + key + `</p>
            <p class="row">Quantidade: `+ inventory[key]['quantity'] + `</p>
            <p class="row">Peso: ` + parseInt(inventory[key]['weight']) * parseInt(inventory[key]['quantity']) + `</p>
            <p class="row">
            <button type="button" class="button-3" onclick="equip('` + key + `')">EQUIPAR</button>
            <button type="button" class="button-3" onclick="removeItem('` + key + `')">DESCARTAR</button>
            </p>
            </div>`;
            break;
          case 'bounty':
            myInventory += `<hr><div>
            <p class="row boldFont">` + key + `</p>
            <p class="row">Quantidade: `+ inventory[key]['quantity'] + `</p>
            <p class="row">Peso: ` + parseInt(inventory[key]['weight']) * parseInt(inventory[key]['quantity']) + `</p>
            <p class="row">
            <button type="button" class="button-2" onclick="removeItem('` + key + `')">DESCARTAR</button>
            </p>
            </div>`;
            break;
        }
        weightCarried += (parseInt(inventory[key]['weight']) * parseInt(inventory[key]['quantity']));
      }
    });
    
    Object.keys(abilities).forEach(function(key) {
      if (key === 'dummy'){
        myAbilities = myAbilities;
      } else {
        switch(abilities[key]['type']){
          case 'teste':
            myAbilities +=
            `<div>
            <p class="row boldFont">TESTE - ` + key + `
            <button type="button" onclick="decreaseMana(` + abilities[key]['cost'] + `);setCooldown('` + key + `', ` + abilities[key]['cooldown'] + `);">TESTAR</button></p>
            <p class="row">Custo: ` + abilities[key]['cost'] + ` pontos de mana</p>
            <p class="row">` + abilities[key]['timer'] + ` turno(s) até poder usar novamente</p>
            <p class="row">Teste: ` + abilities[key]['test'] + `</p>
            <p class="row">Usável a cada ` + abilities[key]['cooldown'] + ` turno(s)</p>
            <p class="row italicFont">` + abilities[key]['explanation'] + `</p>
            </div><hr>`;
            break;
          case 'ataque':
            myAbilities +=
            `<div>
            <p class="row boldFont">` + key + `
            <button type="button" onclick="decreaseMana(` + abilities[key]['cost'] + `);setCooldown('` + key + `', ` + abilities[key]['cooldown'] + `);">USAR</button></p>
            <p class="row">Custo: ` + abilities[key]['cost'] + ` pontos de mana</p>
            <p class="row">` + abilities[key]['timer'] + ` turno(s) até poder usar novamente</p>
            <p class="row">Usável a cada ` + abilities[key]['cooldown'] + ` turno(s)</p>
            <p class="row italicFont">` + abilities[key]['explanation'] + `</p>
            </div><hr>`;
            break;
          case 'status':
            myAbilities +=
            `<div>
            <p class="row boldFont">STATUS - ` + key + `
            <button type="button" onclick="decreaseMana(` + abilities[key]['cost'] + `)">USAR</button></p>
            <p class="row">Custo: ` + abilities[key]['cost'] + ` pontos de mana</p>
            <p class="row">Utilizável 1 vez por batalha.</p>
            <p class="row italicFont">` + abilities[key]['explanation'] + `</p>
            </div><hr>`;
            break;
        }
      }
    });
    
    Object.keys(armour).forEach(function(key) {
      if (key === 'damage' || key === 'defense' || key === 'armourWeight'){
        myArmour = myArmour;
      } else {
        switch(armour[key]['type']){
          case 'armadura':
            armourWeight += parseInt(armour[key]['weight']);
            armourDefense += parseInt(armour[key]['defense']);
            myArmour +=
            `<div>
            <p class="row boldFont">` + key + `</p>
            <p class="row">Defesa: +` + armour[key]['defense'] + `</p>
            <p class="row">Peso: ` + armour[key]['weight'] + `</p>
            <p class="row"><button type="button" class="button-2" onclick="unequip('` + key + `')">DESEQUIPAR</button></p>
            </div><hr>`;
            break;
          case 'arma':
            armourWeight += parseInt(armour[key]['weight']);
            myArmour +=
            `<div>
            <p class="row boldFont">` + key + ` (` + armour[key]['dice'] + `)</p>
            <p class="row">Dano: +` + armour[key]['damage'] + `</p>
            <p class="row">Peso: ` + armour[key]['weight'] + `</p>
            <p class="row"><button type="button" class="button-3" onclick="unequip('` + key + `')">DESEQUIPAR</button><button type="button" class="button-3" onclick="openInputAlert('` + armour[key]['damage'] + `', 0)">ATACAR</button></p>
            </div><hr>`;
            break;
          case 'disparador':
            armourWeight += parseInt(armour[key]['weight']);
            shooterDamage = armour[key]['damage'];
            myArmour +=
            `<div>
            <p class="row boldFont">` + key + `</p>
            <p class="row">Dano: +` + armour[key]['damage'] + `</p>
            <p class="row">Peso: ` + armour[key]['weight'] + `</p>
            <p class="row"><button type="button" class="button-2" onclick="unequip('` + key + `')">DESEQUIPAR</button></p>
            </div><hr>`;
            break;
          case 'munição':
            myArmour +=
            `<div>
            <p class="row boldFont">` + key + ` (` + armour[key]['dice'] + `)</p>
            <p class="row">Dano: +` + armour[key]['damage'] + `</p>
            <p class="row">Quantidade: <spam id="` + key + `">` + armour[key]['quantity'] + `</p>
            <p class="row"><button type="button" class="button-3" onclick="unequip('` + key + `')">DESEQUIPAR</button><button type="button" class="button-3" onclick="openInputAlert('` + armour[key]['damage'] + `', shooterDamage); decreaseAmmoNumber('` + key + `');">DISPARAR</button></p>
            </div><hr>`;
            break;
          case 'conduíte':
            myArmour +=
            `<div>
            <p class="row boldFont">` + key + ` (` + armour[key]['dice'] + `)</p>
            <p class="row">Dano: +` + armour[key]['damage'] + `</p>
            <p class="row">Peso: ` + armour[key]['weight'] + `</p>
            <p class="row"><button type="button" class="button-3" onclick="unequip('` + key + `')">DESEQUIPAR</button><button type="button" class="button-3" onclick="openInputAlert('` + armour[key]['damage'] + `', 0);decreaseMana(` + armour[key]['cost'] + `);">DISPARAR</button></p>
            </div><hr>`;
            break;
        }
      }
    });
    
    bagPointsBase = (totalVigor * 5);
    bagPoints = bagPointsBase - weightCarried - armourWeight;
    
    lifePointsBase = ((totalVigor + totalValiant) * 50);
    lifePoints = (lifePointsBase) * lifePointsMultiply - totalLifePenalty;
    manaPointsBase = ((totalInteligence + totalScholar) * 5);
    manaPoints = (manaPointsBase) * manaPointsMultiply - totalManaPenalty;
    strength = (totalVigor + totalPrecise) * strengthMultiply;
    focus = (totalInteligence + totalImpassive) * focusMultiply;
    velocity = (totalAgility + totalSwift) * velocityMultiply;
    damage = (strength + focus + velocity + moral + armourDamage) * damageMultiply;
    defense = (totalVigor + totalAgility + moral + armourDefense) * defenseMultiply;

    Object.keys(myStatus).forEach(function(key) {
      if(myStatus[key] === true){
        statusLine += `<spam>- ` + key + `&nbsp;</spam>`;
      }
    });
    
    //SAVING RESULTS -------------------------------------------------------------------------------------------
    firebase.database().ref('players/' + userId + '/Hero/AdvancedAtributes').update({'lifePoints': lifePoints});
    firebase.database().ref('players/' + userId + '/Hero/AdvancedAtributes').update({'manaPoints': manaPoints});
    firebase.database().ref('players/' + userId + '/Hero/AdvancedAtributes').update({'strength': strength});
    firebase.database().ref('players/' + userId + '/Hero/AdvancedAtributes').update({'focus': focus});
    firebase.database().ref('players/' + userId + '/Hero/AdvancedAtributes').update({'velocity': velocity});
    firebase.database().ref('players/' + userId + '/Hero/AdvancedAtributes').update({'damage': damage});
    firebase.database().ref('players/' + userId + '/Hero/AdvancedAtributes').update({'defense': defense});
    
    //SHOW IN HTML -------------------------------------------------------------------------------------------
    //Personal Information
    document.getElementById('character').innerHTML = snapshot.val().Hero.PersonalInformation.character;
    document.getElementById('race').innerHTML = snapshot.val().Hero.PersonalInformation.race;
    document.getElementById('clas').innerHTML = snapshot.val().Hero.PersonalInformation.clas;
    document.getElementById('specialty').innerHTML = snapshot.val().Hero.PersonalInformation.specialty;
    document.getElementById('size').innerHTML = snapshot.val().Hero.PersonalInformation.size;
    
    //Basic Atributes
    document.getElementById('atributePoints').innerHTML = atributePoints;
    document.getElementById('vigor').innerHTML = totalVigor;
    document.getElementById('agility').innerHTML = totalAgility;
    document.getElementById('inteligence').innerHTML = totalInteligence;
    
    //Virtues
    document.getElementById('virtuePoints').innerHTML = virtuePoints;
    document.getElementById('bargeman').innerHTML = totalBargeman;
    document.getElementById('charismatic').innerHTML = totalCharismatic;
    document.getElementById('trustworthy').innerHTML = totalTrustworthy;
    document.getElementById('diplomat').innerHTML = totalDiplomat;
    document.getElementById('strategist').innerHTML = totalStrategist;
    document.getElementById('scholar').innerHTML = totalScholar;
    document.getElementById('impassive').innerHTML = totalImpassive;
    document.getElementById('precise').innerHTML = totalPrecise;
    document.getElementById('sagacious').innerHTML = totalSagacious;
    document.getElementById('sneaky').innerHTML = totalSneaky;
    document.getElementById('valiant').innerHTML = totalValiant;
    document.getElementById('swift').innerHTML = totalSwift;
    document.getElementById('toxineResistance').innerHTML = totalToxineResistance;
    document.getElementById('heatResistance').innerHTML = totalHeatResistance;
    document.getElementById('eletricResistance').innerHTML = totalEletricResistance;
    document.getElementById('coldResistance').innerHTML = totalColdResistance;
    
    //Advanced Atributes
    document.getElementById('lifePointsBase').innerHTML = lifePointsBase;
    document.getElementById('manaPointsBase').innerHTML = manaPointsBase;
    document.getElementById('lifePoints').innerHTML = lifePoints;
    document.getElementById('manaPoints').innerHTML = manaPoints;
    document.getElementById('strengthPoints').innerHTML = strength;
    document.getElementById('focusPoints').innerHTML = focus;
    document.getElementById('velocityPoints').innerHTML = velocity;
    document.getElementById('damagePoints').innerHTML = damage;
    document.getElementById('defensePoints').innerHTML = defense;
    
    //Inventory
    inventoryHTML.innerHTML = myInventory;
    document.getElementById('bagPoints').innerHTML = bagPoints;
    document.getElementById('bagPointsBase').innerHTML = bagPointsBase;
    
    //Armour
    armourHTML.innerHTML = myArmour;
    
    //Abilities
    abilitiesHTML.innerHTML = myAbilities;

    //Battle
    document.getElementById('turnNumber').innerHTML = turn;
    document.getElementById('statusLine').innerHTML = statusLine;
    
    switch(battling){
      case true:
        document.getElementById('battleBar').style.display = 'block';
        break;
      case false:
        document.getElementById('battleBar').style.display = 'none';
        break;
    }

    // document.getElementById('spinnerDiv').style.display = 'none';
  });
}

function useItem(key){
  var newQuantity = inventory[key]['quantity'];
  newQuantity -= 1;
  if (newQuantity == 0){
    removeItem(key);
  } else {
    firebase.database().ref('players/' + userId + '/Hero/Inventory/' + key).update({'quantity': newQuantity});
  }
}

function removeItem(key){
  var itemRef = firebase.database().ref('players/' + userId + '/Hero/Inventory/' + key);
  return itemRef.remove();
}

function unequip(key){
  firebase.database().ref('players/' + userId + '/Hero/Armour/' + key).once("value").then(function(snapshot) {
    var moveArmour = {};
    moveArmour['players/' + userId + '/Hero/Inventory/' + key] = snapshot.val();
    firebase.database().ref().update(moveArmour);
    firebase.database().ref('players/' + userId + '/Hero/Armour/' + key).remove();
  });
}

function equip(key){
  firebase.database().ref('players/' + userId + '/Hero/Inventory/' + key).once("value").then(function(snapshot) {
    var moveArmour = {};
    moveArmour['players/' + userId + '/Hero/Armour/' + key] = snapshot.val();
    firebase.database().ref().update(moveArmour);
    firebase.database().ref('players/' + userId + '/Hero/Inventory/' + key).remove();
  });
}

function runItemEffect(key){
  switch(inventory[key]['effect']){
    case 'statusChange':
      break;
    case 'addPoints':
      eval('var oldValue = ' + inventory[key]['pointsToAdd']['whatPoints'] + '; oldValue += ' + inventory[key]['pointsToAdd']['howMuch'] + ';');
      var updates = {};
      updates['players/' + userId + '/Hero/Statistics/' + inventory[key]['pointsToAdd']['whatPoints']] = oldValue;
      firebase.database().ref().update(updates);
      break;
  }
}

function addAtributePoint(atribute){
  var currentAtributePoints = parseInt(document.getElementById('atributePoints').innerHTML);
  if (currentAtributePoints > 0) {
    eval(atribute + ' += 1; atributePoints -= 1;');
    var updates = {};
    updates['players/' + userId + '/Hero/BasicAtributes/' + atribute] = eval(atribute);
    updates['players/' + userId + '/Hero/BasicAtributes/atributePoints'] = atributePoints;
    firebase.database().ref().update(updates);
  } else {
    alert('Sem pontos disponíveis!');
  }
}

function removeAtributePoint(atribute){
  var currentPoints = parseInt(document.getElementById(atribute).innerHTML);
  if (currentPoints > 0) {
    eval(atribute + ' -= 1; atributePoints += 1;');
    var updates = {};
    updates['players/' + userId + '/Hero/BasicAtributes/' + atribute] = eval(atribute);
    updates['players/' + userId + '/Hero/BasicAtributes/atributePoints'] = atributePoints;
    firebase.database().ref().update(updates);
  } else {
    alert('Sem pontos para devolver!');
  }
}

function addVirtuePoint(virtue){
  var currentVirtuePoints = parseInt(document.getElementById('virtuePoints').innerHTML);
  if (currentVirtuePoints > 0) {
    eval(virtue + ' += 1; virtuePoints -= 1;');
    var updates = {};
    updates['players/' + userId + '/Hero/Virtues/' + virtue] = eval(virtue);
    updates['players/' + userId + '/Hero/Virtues/virtuePoints'] = virtuePoints;
    firebase.database().ref().update(updates);
  } else {
    alert('Sem pontos disponíveis!');
  }
}

function removeVirtuePoint(virtue){
  var currentPoints = parseInt(document.getElementById(virtue).innerHTML);
  if (currentPoints > 0) {
    eval(virtue + ' -= 1; virtuePoints += 1;');
    var updates = {};
    updates['players/' + userId + '/Hero/Virtues/' + virtue] = eval(virtue);
    updates['players/' + userId + '/Hero/Virtues/virtuePoints'] = virtuePoints;
    firebase.database().ref().update(updates);
  } else {
    alert('Sem pontos para devolver!');
  }
}

function logoutUser(){
  firebase.auth().signOut()
  .then(function() {
    window.location.replace('index.html');
  }).catch(function (error) {
    alert("ERRO: " + error.message);
  });
}