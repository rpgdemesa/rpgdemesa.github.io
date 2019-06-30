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
    userId = firebase.auth().currentUser.uid;
    console.log('Wellcome, Master!');
  }
  getTableData();
});

var table, userId, wallet;
var tableMoral = 0;

function getTableData(){
  firebase.database().ref('players').on('value', function(snapshot) {
    //SET THE TABLE ----------------------------------------------------------------------------------------------
    table = snapshot.val();
    delete table[userId];
    
    wallet = snapshot.val().cSy2WaZT3bVxApaCAFrGx8q99Nv2.thisTable.wallet;
    document.getElementById('wallet').innerHTML = wallet;
  });
}

function increaseWallet(){
  var walletChanger = parseInt(document.getElementById('walletChanger').value);
  var newWallet = wallet + walletChanger;
  firebase.database().ref('players/' + userId + '/thisTable').update({'wallet': newWallet});
}

function decreaseWallet(){
  var walletChanger = parseInt(document.getElementById('walletChanger').value);
  var newWallet = wallet - walletChanger;
  firebase.database().ref('players/' + userId + '/thisTable').update({'wallet': newWallet});
}

function getTableMoral(){
  tableMoral = 0;
  Object.keys(table).forEach(function(key) {
    tableMoral += table[key]['Hero']['Virtues']['trustworthy'];
    document.getElementById('tableMoral').value = tableMoral;
  });
}

function updateTableMoral(){
  Object.keys(table).forEach(function(key) {
    var newTableMoral = parseInt(document.getElementById('tableMoral').value)
    var updateMoral = {};
    updateMoral['players/' + key + '/Hero/AdvancedAtributes/moral'] = newTableMoral;
    firebase.database().ref().update(updateMoral);
  });
}

var playersDivHTML = document.getElementById('playersDiv');
var myPlayers = '';

function getPlayers(){
  Object.keys(table).forEach(function(key) {
    myPlayers += `<button type="button" onclick="getPlayerId('` + key + `', '` + table[key]['Account']['name'] + `')">` + table[key]['Account']['name'] + `</button>`;
  });
  
  playersDivHTML.innerHTML = myPlayers;
}

var playerId = null;

var selectedPlayer = document.getElementById('selectedPlayer');

function getPlayerId(string, name){
  playerId = string;
  selectedPlayer.innerHTML = name;
}

var normal, envenenado, dormindo, atordoado;

function switchBattleStatus(status){
  if(playerId === null){
    alert('Selecione um jogador!');
  } else {
    switch(status){
      case 'normal':
        normal = table[playerId]['Hero']['Battle']['status']['normal'];
        if(normal === true){
          firebase.database().ref('players/' + playerId + '/Hero/Battle/status').update({'normal': false});
        } else {
          firebase.database().ref('players/' + playerId + '/Hero/Battle/status').update({'normal': true});
        }
        break;
      case 'envenenado':
        envenenado = table[playerId]['Hero']['Battle']['status']['envenenado'];
        if(envenenado === true){
          firebase.database().ref('players/' + playerId + '/Hero/Battle/status').update({'envenenado': false});
        } else {
          firebase.database().ref('players/' + playerId + '/Hero/Battle/status').update({'envenenado': true});
        }
        break;
      case 'dormindo':
        dormindo = table[playerId]['Hero']['Battle']['status']['dormindo'];
        if(dormindo === true){
          firebase.database().ref('players/' + playerId + '/Hero/Battle/status').update({'dormindo': false});
        } else {
          firebase.database().ref('players/' + playerId + '/Hero/Battle/status').update({'dormindo': true});
        }
        break;
      case 'atordoado':
        atordoado = table[playerId]['Hero']['Battle']['status']['atordoado'];
        if(atordoado === true){
          firebase.database().ref('players/' + playerId + '/Hero/Battle/status').update({'atordoado': false});
        } else {
          firebase.database().ref('players/' + playerId + '/Hero/Battle/status').update({'atordoado': true});
        }
        break;
    }
  }
}

function beginBattle(){
  Object.keys(table).forEach(function(key) {
    var updateBattleState = {};
    updateBattleState['players/' + key + '/Hero/Battle/battling'] = true;
    firebase.database().ref().update(updateBattleState);
  });
  
  getTableMoral();
  updateTableMoral();
}

var turn = 1;

function changeTurn(){
  newTurn = turn + 1;
  turn = newTurn;
  Object.keys(table).forEach(function(key) {
    var changeTurn = {};
    changeTurn['players/' + key + '/Hero/Battle/turn'] = turn;
    firebase.database().ref().update(changeTurn);
    var abilityUserId = key;
    var abilities = table[key]['Hero']['Abilities'];
    Object.keys(abilities).forEach(function(key){
      if(key != 'dummy'){
        timer = abilities[key]['timer'];
        if(timer > 0){
          newTimer = timer - 1;
          var updateTimer = {};
          updateTimer['players/'+ abilityUserId + '/Hero/Abilities/' + key + '/timer'] = newTimer;
          firebase.database().ref().update(updateTimer);
        }
      }
    });
  });
}

function endBattle(){
  turn = 1;
  Object.keys(table).forEach(function(key) {
    var updateBattleState = {};
    updateBattleState['players/' + key + '/Hero/Battle/battling'] = false;
    updateBattleState['players/' + key + '/Hero/Battle/turn'] = turn;
    firebase.database().ref().update(updateBattleState);
    var abilityUserId = key;
    var abilities = table[key]['Hero']['Abilities'];
    Object.keys(abilities).forEach(function(key){
      if(key != 'dummy'){
        var updateTimer = {};
        updateTimer['players/'+ abilityUserId + '/Hero/Abilities/' + key + '/timer'] = 0;
        firebase.database().ref().update(updateTimer);
      }
    });
  });
}

function giveItem(){
  if(playerId === null){
    alert('Selecione um jogador!');
  } else {
    var itemName = document.getElementById('itemNameInput').value;
    var itemQuantity = document.getElementById('itemQuantityInput').value;
    var itemWeight = document.getElementById('itemWeightInput').value;
    var itemType = document.getElementById('itemTypeInput').value;
    var itemEffect = document.getElementById('itemEffectInput').value;
    
    switch(itemType){
      case 'bounty':
        firebase.database().ref('players/' + playerId + '/Hero/Inventory/' + itemName).update({
          'quantity': itemQuantity,
          'type': itemType,
          'weight': itemWeight,
        });
        break;
      case 'consumable':
        firebase.database().ref('players/' + playerId + '/Hero/Inventory/' + itemName).update({
          'quantity': itemQuantity,
          'type': itemType,
          'weight': itemWeight,
          'effect': itemEffect,
        });
        break;
    }
  }
}

function giveAbility(){
  if(playerId === null){
    alert('Selecione um jogador!');
  } else {
    var abilityName = document.getElementById('abilityNameInput').value;
    var abilityType = document.getElementById('abilityTypeInput').value;
    var abilityReusable = document.getElementById('abilityReusableInput').value;
    var abilityTest = document.getElementById('abilityTestInput').value;
    var abilityCooldown = document.getElementById('abilityCooldownInput').value;
    var abilityTimer = document.getElementById('abilityTimerInput').value;
    var abilityCost = document.getElementById('abilityCostInput').value;
    var abilityEffect = document.getElementById('abilityEffectInput').value;
    var abilityExplanation = document.getElementById('abilityExplanationInput').value;
    
    switch(abilityType){
      case 'teste':
        firebase.database().ref('players/' + playerId + '/Hero/Abilities/' + abilityName).update({
          'type': abilityType,
          'reusable': abilityReusable,
          'test': abilityTest,
          'cooldown': abilityCooldown,
          'timer': abilityTimer,
          'cost': abilityCost,
          'explanation': abilityExplanation,
        });
        break;
      case 'ataque':
        firebase.database().ref('players/' + playerId + '/Hero/Abilities/' + abilityName).update({
          'type': abilityType,
          'reusable': abilityReusable,
          'cooldown': abilityCooldown,
          'timer': abilityTimer,
          'cost': abilityCost,
          'explanation': abilityExplanation,
        });
        break;
      case 'status':
        firebase.database().ref('players/' + playerId + '/Hero/Abilities/' + abilityName).update({
          'type': abilityType,
          'reusable': abilityReusable,
          'cost': abilityCost,
          'explanation': abilityExplanation,
        });
        break;
    }
    
  }
}

function giveArmour(){
  if(playerId === null){
    alert('Selecione um jogador!');
  } else {
    var armourName = document.getElementById('armourNameInput').value;
    var armourDice = document.getElementById('armourDiceInput').value;
    var armourQuantity = document.getElementById('armourQuantityInput').value;
    var armourWeight = document.getElementById('armourWeightInput').value;
    var armourType = document.getElementById('armourTypeInput').value;
    var armourDamage = document.getElementById('armourDamageInput').value;
    var armourDefense = document.getElementById('armourDefenseInput').value;
    var armourCost = document.getElementById('armourCostInput').value;

    switch(armourType){
      case 'armadura':
        firebase.database().ref('players/' + playerId + '/Hero/Armour/' + armourName).update({
          'quantity': armourQuantity,
          'weight': armourWeight,
          'type': armourType,
          'defense': armourDefense,
        });
        break;
      case 'arma':
        firebase.database().ref('players/' + playerId + '/Hero/Armour/' + armourName).update({
          'dice': armourDice,
          'quantity': armourQuantity,
          'weight': armourWeight,
          'type': armourType,
          'damage': armourDamage,
        });
        break;
      case 'disparador':
        firebase.database().ref('players/' + playerId + '/Hero/Armour/' + armourName).update({
          'quantity': armourQuantity,
          'weight': armourWeight,
          'type': armourType,
          'damage': armourDamage,
        });
        break;
      case 'munição':
        firebase.database().ref('players/' + playerId + '/Hero/Armour/' + armourName).update({
          'dice': armourDice,
          'quantity': armourQuantity,
          'weight': armourWeight,
          'type': armourType,
          'damage': armourDamage,
        });
        break;
      case 'conduíte':
        firebase.database().ref('players/' + playerId + '/Hero/Armour/' + armourName).update({
          'dice': armourDice,
          'quantity': armourQuantity,
          'weight': armourWeight,
          'type': armourType,
          'damage': armourDamage,
          'cost': armourCost,
        });
        break;
      
    }
    
  }
}

function alterMultiplier(){
  if(playerId === null){
    alert('Selecione um jogador!');
  } else {
    var multiplier = document.getElementById('multiplierSelect').value;
    var newValue = parseInt(document.getElementById('multiplierInput').value);
    var updateMultiplier = {};
    updateMultiplier['players/' + playerId + '/Hero/Battle/Multiply/' + multiplier] = newValue;
    firebase.database().ref().update(updateMultiplier);
  }
}

function alterBonus(){
  if(playerId === null){
    alert('Selecione um jogador!');
  } else {
    var bonus = document.getElementById('battleBonusSelect').value;
    var newValue = parseInt(document.getElementById('battleBonusInput').value);
    var updateBattleBonus = {};
    updateBattleBonus['players/' + playerId + '/Hero/Battle/Bonus/' + bonus] = newValue;
    firebase.database().ref().update(updateBattleBonus);
  }
}

function alterPenalty(){
  if(playerId === null){
    alert('Selecione um jogador!');
  } else {
    var penalty = document.getElementById('battlePenaltySelect').value;
    var newValue = parseInt(document.getElementById('battlePenaltyInput').value);
    var updateBattlePenalty = {};
    updateBattlePenalty['players/' + playerId + '/Hero/Battle/Bonus/' + penalty] = newValue;
    firebase.database().ref().update(updateBattlePenalty);
  }
}

function causeDamage(){
  if(playerId === null){
    alert('Selecione um jogador!');
  } else {
    var monsterDice = parseInt(document.getElementById('monsterDice').value);
    var monsterDamageBase = parseInt(document.getElementById('monsterDamageBase').value);
    var defense = table[playerId]['Hero']['AdvancedAtributes']['defense'];
    var currentLifePenalty = table[playerId]['Hero']['Battle']['lifePenalty'];
    currentLifePenalty += (monsterDice * monsterDamageBase) - defense;
    var updateLifePenalty = {};
    updateLifePenalty['players/' + playerId + '/Hero/Battle/lifePenalty'] = currentLifePenalty;
    firebase.database().ref().update(updateLifePenalty);

  }
}

function cure(){
  if(playerId === null){
    alert('Selecione um jogador!');
  } else {
    var value = parseInt(document.getElementById('cureLife').value);
    var currentLifeBonus = table[playerId]['Hero']['Battle']['lifeBonus'];
    currentLifeBonus += value;
    var updateLifeCure = {};
    updateLifeCure['players/' + playerId + '/Hero/Battle/lifeBonus'] = currentLifeBonus;
    firebase.database().ref().update(updateLifeCure);

  }
}

// function createMultiply(){
//   firebase.database().ref('players/' + playerId + '/Hero/Battle/Multiply').update({
//     'vigorMultiply': 1,
//     'agilityMultiply': 1,
//     'inteligenceMultiply': 1,
//     'bargemanMultiply': 1,
//     'charismaticMultiply': 1,
//     'trustworthyMultiply': 1,
//     'diplomatMultiply': 1,
//     'strategistMultiply': 1,
//     'scholarMultiply': 1,
//     'impassiveMultiply': 1,
//     'preciseMultiply': 1,
//     'sagaciousMultiply': 1,
//     'sneakyMultiply': 1,
//     'valiantMultiply': 1,
//     'swiftMultiply': 1,
//     'toxineResistanceMultiply': 1,
//     'heatResistanceMultiply': 1,
//     'eletricResistanceMultiply': 1,
//     'coldResistanceMultiply': 1,
//     'lifePointsMultiply': 1,
//     'manaPointsMultiply': 1,
//     'strengthMultiply': 1,
//     'focusMultiply': 1,
//     'velocityMultiply': 1,
//     'damageMultiply': 1,
//     'defenseMultiply': 1,
//   });
// }