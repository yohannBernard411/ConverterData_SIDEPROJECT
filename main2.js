const input = document.getElementById('input');
const output = document.getElementById('output');
let count = 0;
let dataTrim = [];
let outputResult = [];
let listeObjets = [];

function asClicker(data = input.value.split("\n"), rang = 0){ //recuperer l'array ou l'input par default   recuperer la ligne en cours ou 0 par default
  //creer un compteur sans for => count
  data.forEach(element => {  //remise en forme des data
    dataTrim.push(element.trim().split(":"));
  });
  console.log(dataTrim);
  console.log('data 1:' + dataTrim[count]);

  dataTrim.forEach((element, index) =>{
    if(element[1]){
      console.log('element : ' + element[1].trim().substring(0,1));
      switch(element[1].trim().substring(0,1)){
        case '{':
            console.log('entree dans le case');
            objectDetected(element, dataTrim, index );
            console.log('datatrim: '+dataTrim);
          break;
          case '[':
            arrayDetected(element);
          break;
          case 't':
          case'f':
            booleanDetected(element);
          break;
          case '"':
            stringDetected(element);
          break;
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            numberDetected(element);
          break;
        }
    }else{
      switch(dataTrim[count][0].trim().substring(0,1)){}
    }
  });
  output.innerHTML = outputResult;
  console.log('listeObjets : ' + listeObjets);
}

function objectDetected(el, data, index){
  //premierement trouver la ligne de fin d objet
  let count = 0;
  let finObjet = 0;
  let rank = 0;
  console.log('enntre dans la fonction');
  for(rank=index; rank<data.length; rank++){
    console.log('nb de count : '+count);
    if(data[rank][1]){
      if (data[rank][1].trim().substring(0,1) === '}' && count===1){
        console.log('niveau 1, ligne: ' + rank);
        finObjet = rank;
        console.log('objet detecte de ligne ' + index + ' a ligne '+rank);
        let objet = [];
        for(let x=index; x<rank; x++){
          objet.push(data[x]);
        }
        listeObjets.push(objet);
        dataTrim.splice(index, rank-index+1);
        return;
      }
      if(data[rank][1].trim().substring(0,1) === '{'){
        console.log('niveau 2, ligne: ' + rank);
        count += 1;
      }
      if(data[rank][1].trim().substring(0,1) === '}'){
        console.log('niveau 3, ligne: ' + rank);
        count -= 1;
      }
    }else{
      if (data[rank][0].trim().substring(0,1) === '}' && count===1){
        console.log('niveau 4, ligne: ' + rank);
        finObjet = rank;
        console.log('objet detecte de ligne ' + index + ' a ligne '+rank);
        let objet = [];
        for(let x=index; x<rank; x++){
          objet.push(data[x]);
        }
        listeObjets.push(objet);
        dataTrim.splice(index, rank-index+1);
        return;
      }
      if(data[rank][0].trim().substring(0,1) === '{'){
        console.log('niveau 5, ligne: ' + rank);
        count += 1;
      }
      if(data[rank][0].trim().substring(0,1) === '}'){
        console.log('niveau 6, ligne: ' + rank);
        count -= 1;
      }
    }
  }
}
function arrayDetected(el){
  console.log('array detecte');
}
function booleanDetected(el){
  console.log('boolean detecte');
  outputResult.push('<p>' + "private " + "Boolean" + " " + el[0].substring(1, el[0].length-1)+ ';' + '<p>');
  return;
}
function stringDetected(el){
  console.log('string detecte');
  outputResult.push('<p>' + "private " + "String" + " " + el[0].substring(1, el[0].length-1)+ ';' + '<p>');
  return;
}
function numberDetected(el){
  console.log('number detecte');
  outputResult.push('<p>' + "private " + "Number" + " " + el[0].substring(1, el[0].length-1)+ ';' + '<p>');
  return;
}
  // pour chaque ligne de l'array:
        // revoyer a la fonction string si ca commence par "
        // renvoyer a la fonction Number si ca commence pr 0-9
        // renvoyer a la fonction boolean si ca commence par f ou t
        // renoyer al afonction array si ca commence par [
        // renvoyer a la fonction objet si ca commence par {  

        

// fonction string, number, boolean:
      // ajouter la donnee => private XXXXX YYYYY;
      //modifier les variables (ligne en cours);
      //retourner a la fonction asclicker();

//fonction array: objet:
      // compter les ouvertures et fermetures d'array pour trouver ou finit l'array
      //pour cette partie la rappeler la fonction asClicker()
      //retourner a la fonction asclicker() pour le reste.
    
