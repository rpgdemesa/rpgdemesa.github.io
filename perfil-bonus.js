function setRaceBonus(race) {
  firebase.database().ref('players/' + userId + '/Hero/PersonalInformation/RaceBonus').update({
    'vigorBonus': 0,
    'vigorPenalty': 0,
    'agilityBonus': 0,
    'agilityPenalty': 0,
    'inteligenceBonus': 0,
    'inteligencePenalty': 0,
    'bargemanBonus': 0,
    'bargemanPenalty': 0,
    'charismaticBonus': 0,
    'charismaticPenalty': 0,
    'trustworthyBonus': 0,
    'trustworthyPenalty': 0,
    'diplomatBonus': 0,
    'diplomatPenalty': 0,
    'strategistBonus': 0,
    'strategistPenalty': 0,
    'scholarBonus': 0,
    'scholarPenalty': 0,
    'impassiveBonus': 0,
    'impassivePenalty': 0,
    'preciseBonus': 0,
    'precisePenalty': 0,
    'sagaciousBonus': 0,
    'sagaciousPenalty': 0,
    'sneakyBonus': 0,
    'sneakyPenalty': 0,
    'valiantBonus': 0,
    'valiantPenalty': 0,
    'swiftBonus': 0,
    'swiftPenalty': 0,
    'toxineResistanceBonus': 0,
    'toxineResistancePenalty': 0,
    'heatResistanceBonus': 0,
    'heatResistancePenalty': 0,
    'eletricResistanceBonus': 0,
    'eletricResistancePenalty': 0,
    'coldResistanceBonus': 0,
    'coldResistancePenalty': 0,
  });
  switch(race){
    case 'Humana':
      firebase.database().ref('players/' + userId + '/Hero/PersonalInformation/RaceBonus').update({
        vigorBonus: 1,
        agilityBonus: 1,
        bargemanBonus: 2,
        charismaticBonus: 1,
        strategistBonus: 2,
        scholarPenalty: 1,
        sagaciousBonus: 1,
        valiantBonus: 2,
        toxineResistancePenalty: 1,
        heatResistanceBonus: 2,
        eletricResistancePenalty: 1,
        coldResistancePenalty: 1,
      });
      break;
    case 'Élfica':
      firebase.database().ref('players/' + userId + '/Hero/PersonalInformation/RaceBonus').update({
        vigorBonus: 1,
        inteligenceBonus: 1,
        charismaticPenalty: 1,
        scholarBonus: 1,
        preciseBonus: 1,
        sagaciousBonus: 2,
        swiftBonus: 1,
        toxineResistanceBonus: 2,
        heatResistancePenalty: 1,
        eletricResistancePenalty: 1,
        coldResistancePenalty: 1,
      });
      break;
    case 'Anânica':
      firebase.database().ref('players/' + userId + '/Hero/PersonalInformation/RaceBonus').update({
        vigorBonus: 2,
        agilityPenalty: 1,
        inteligencePenalty: 1,
        bargemanBonus: 1,
        charismaticPenalty: 1,
        scholarPenalty: 1,
        impassiveBonus: 2,
        valiantBonus: 1,
        toxineResistanceBonus: 1,
        heatResistanceBonus: 1,
        eletricResistancePenalty: 1,
        coldResistancePenalty: 1,
      });
      break;
    case 'Genasi':
      firebase.database().ref('players/' + userId + '/Hero/PersonalInformation/RaceBonus').update({
        agilityBonus: 1,
        inteligenceBonus: 1,
        charismaticPenalty: 1,
        trustworthyPenalty: 1,
        strategistBonus: 2,
        scholarBonus: 1,
        preciseBonus: 1,
        sagaciousBonus: 1,
        sneakyBonus: 1,
        swiftBonus: 1,
        toxineResistanceBonus: 2,
        heatResistanceBonus: 2,
        eletricResistanceBonus: 2,
        coldResistanceBonus: 2,
      });
      break;
  }
}

function setSizeBonus(size) {
  firebase.database().ref('players/' + userId + '/Hero/PersonalInformation/SizeBonus').update({
    'vigorBonus': 0,
    'vigorPenalty': 0,
    'agilityBonus': 0,
    'agilityPenalty': 0,
  });
  switch(size){
    case 'Esguio':
      firebase.database().ref('players/' + userId + '/Hero/PersonalInformation/SizeBonus').update({
        'vigorPenalty': 1,
        'agilityBonus': 1,
      });
      break;
    case 'Médio':
      break;
    case 'Forte':
      firebase.database().ref('players/' + userId + '/Hero/PersonalInformation/SizeBonus').update({
        'vigorBonus': 1,
        'agilityPenalty': 1,
      });
      break;
  }
}