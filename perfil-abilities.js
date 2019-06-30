// function shoot(key){
//   oldQuantity = ;
//   newQuantity = ;
// }

var damageModal = document.getElementById("damageModal");

window.onclick = function(event) {
  if (event.target == damageModal) {
    damageModal.style.display = "none";
    document.getElementById('diceInput').value = '';
    document.getElementById('diceResult').innerHTML = '';
  }
};

var weaponDamage, totalDamage, shooterDamage = 0;
function openInputAlert(damage, shooter){
  document.getElementById('damageModal').style.display = 'block';
  weaponDamage = parseInt(damage) + shooter;
}

function calculateDiceResult(){
  var diceNumber = document.getElementById('diceInput').value;
  totalDamage = (weaponDamage + damage) * diceNumber ;
  document.getElementById('diceResult').innerHTML = totalDamage;
}

function decreaseAmmoNumber(key){
  var newValue = parseInt(document.getElementById(key).innerHTML);
  newValue -= 1;
  firebase.database().ref('players/' + userId + '/Hero/Armour/' + key).update({'quantity': newValue});
}

function doNothing(){
  //I do nothing :)
}

function decreaseMana(number){
  if(manaPoints < number) {
    alert('Sem pontos de mana suficientes.');
  } else {
    var decreaseMana = manaPenalty + number;
    firebase.database().ref('players/' + userId + '/Hero/Battle').update({'manaPenalty': decreaseMana});
  }
}

function setCooldown(key, number){
  firebase.database().ref('players/' + userId + '/Hero/Abilities/' + key).update({'timer': number});
}