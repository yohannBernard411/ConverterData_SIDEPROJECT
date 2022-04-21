const input = document.getElementById('input');
const output = document.getElementById('output');
let dataAvecEspaces = [];
let dataNonSplit = [];
let data = [];
let outputResult = [];
let currentLine = 0;

function asClicker(){
  outputResult = [];
  output.innerText = "";
  //remise en forme des data
  dataAvecEspaces = input.value.split("\n");
  dataAvecEspaces.forEach(element => {
    dataNonSplit.push(element.trim());
  });
  dataNonSplit.forEach(element =>{
    data.push(element.split(':'));
  });
  //retrait des objets
  let count = 0
  let start = 0;
  let end = 0;
  let objetsASupprimer = [];
  for(let rank = 0; rank<data.length; rank++){
    currentLine ++;
    if(data[rank][1]){
      if(data[rank][1].trim().substring(0,1) === "{" && count === 0){
        start = rank;
      }
      if(data[rank][1].trim().substring(0,1) === "}" && count === 1){
        end = rank+1;
        objetsASupprimer.push([start, end]);
      }
      if(data[rank][1].trim().substring(0,1) === "{"){
        count ++;
      }
      if(data[rank][1].trim().substring(0,1) === "}"){
        count --;
      }
    }else{
      if(data[rank][0].trim().substring(0,1) === "{" && count === 0){
        start = rank;
      }
      if(data[rank][0].trim().substring(0,1) === "}" && count === 1){
        end = rank+1;
        objetsASupprimer.push([start, end]);
      }
      if(data[rank][0].trim().substring(0,1) === "{"){
        count ++;
      }
      if(data[rank][0].trim().substring(0,1) === "}"){
        count --;
      }
    }
  }
  objetsASupprimer = objetsASupprimer.reverse();
  objetsASupprimer.forEach(element =>{
    outputResult.push("private " + data[element[0]][0].substring(1,2).toUpperCase()+data[element[0]][0].substring(2,data[element[0]][0].length-1) + " " + data[element[0]][0].substring(1,data[element[0]][0].length-1)+";");
    data.splice(element[0], element[1]-element[0]);
  });
  //retrait des arrays
  count = 0
  start = 0;
  end = 0;
  let arrayASupprimer = [];
  for(let rank = 0; rank<data.length; rank++){
    currentLine ++;
    if(data[rank][1]){
      if(data[rank][1].trim().substring(0,1) === "[" && count === 0){
        start = rank;
        if(data[rank][1].trim().substring(1,2) === "]"){
          end = rank+1;
          arrayASupprimer.push([start, end]);
          count --;
        }
      }
      if(data[rank][1].trim().substring(0,1) === "]" && count === 1){
        end = rank+1;
        arrayASupprimer.push([start, end]);
      }
      if(data[rank][1].trim().substring(0,1) === "["){
        count ++;
      }
      if(data[rank][1].trim().substring(0,1) === "]"){
        count --;
      }
    }else{
      if(data[rank][0].trim().substring(0,1) === "[" && count === 0){
        start = rank;
        if(data[rank][1].trim().substring(1,2) === "]"){
          end = rank+1;
          arrayASupprimer.push([start, end]);
          count --;
        }
      }
      if(data[rank][0].trim().substring(0,1) === "]" && count === 1){
        end = rank+1;
        arrayASupprimer.push([start, end]);
      }
      if(data[rank][0].trim().substring(0,1) === "["){
        count ++;
      }
      if(data[rank][0].trim().substring(0,1) === "]"){
        count --;
      }
    }
  }
  arrayASupprimer = arrayASupprimer.reverse();
  arrayASupprimer.forEach(element =>{
    outputResult.push("private ArrayList<"+ data[element[0]][0].substring(1,2).toUpperCase()+data[element[0]][0].substring(2,data[element[0]][0].length-1) + "> " + data[element[0]][0].substring(1,data[element[0]][0].length-1)+";");
    data.splice(element[0], element[1]-element[0]);
  });
  //detection type de donnees
  data.forEach(array =>{
    currentLine ++;
    if(array[1]){
      switch(array[1].trim().substring(0,1)){
        case 't':
        case'f':
          booleanDetected(array);
        break;
        case '"':
          stringDetected(array);
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
          numberDetected(array);
        break;
        default:
          stringDetected(array);
      }
    }
  });
  output.innerText = outputResult.join('\n');

 
  function booleanDetected(el){
    outputResult.push("private " + "Boolean" + " " + el[0].substring(1, el[0].length-1)+";");
    return;
  }
  function stringDetected(el){
    outputResult.push("private " + "String" + " " + el[0].substring(1, el[0].length-1)+";");
    return;
  }
  function numberDetected(el){
    outputResult.push("private " + "Number" + " " + el[0].substring(1, el[0].length-1)+";");
    return;
  }
}
