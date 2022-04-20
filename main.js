const input = document.getElementById('input');
const go = document.getElementById('go');
const output = document.getElementById('output');

function ObjectDetected(arrayOutput, j){
  let bornageObjet = [];
  bornageObjet.push(j);
  let count = 0;
  for (j; j<arrayOutput.length; j++){
    if (arrayOutput[j][1]){
      if (arrayOutput[j][1].trim().substring(0,1) === '}' && count===1){
        bornageObjet.push(j);
      }
      if(arrayOutput[j][1].trim().substring(0,1) === '{'){
        count += 1;
      }
      if(arrayOutput[j][1].trim().substring(0,1) === '}'){
        count -= 1;
      }
    }else{
      if(arrayOutput[j][0].trim().substring(0,1) === '}' && count ===1){
        bornageObjet.push(j);
      }
      if(arrayOutput[j][0].trim().substring(0,1) === '{'){
        count += 1;
      }
      if(arrayOutput[j][0].trim().substring(0,1) === '}'){
        count -= 1;
      }
    }
  }
  return bornageObjet;
}

function asClicker(){
  let lines = input.value.split("\n");
  let newLines = []
  let arrayOutput = [];
  for(let i=0; i<lines.length; i++){
    newLines = lines[i].trim().split(":");
    arrayOutput.push(newLines);
  }
  let outputResult = [];
  for(let j=0; j<arrayOutput.length; j++){
    let type = "";
    if(arrayOutput[j][1]){
      if(arrayOutput[j][1].trim().substring(0,1) === '{'){
        let bornage = ObjectDetected(arrayOutput, j);
        type = arrayOutput[j][0].trim().substring(1,2).toUpperCase() + arrayOutput[j][0].trim().substring(2,arrayOutput[j][0].trim().length-1).toLowerCase();
        outputResult.push('<p>' + "private " + type + " " + arrayOutput[j][0].substring(1, arrayOutput[j][0].length-1)+ ';' + '<p>');
        j = bornage[1]+1;
      }
      switch(arrayOutput[j][1].trim().substring(0,1)){
        case '{':
          type = "Objet";
        break;
        case '[':
          type = "Array";
        break;
        case 't':
        case'f':
          type = "Boolean";
        break;
        case '"':
          type = "String";
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
          type = "Number";
        break;
        default:
          type = "Inconnu";
      }
      outputResult.push('<p>' + "private " + type + " " + arrayOutput[j][0].substring(1, arrayOutput[j][0].length-1)+ ';' + '<p>');
    }
  }
  output.innerHTML = outputResult.join('');
}
