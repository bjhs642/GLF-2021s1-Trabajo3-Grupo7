/*
let estados = ['A', 'B', 'C', 'D', 'E'];
//              0    1    2    3    4
let valores = ['a', 'b', 'c'];

Ej.1
let AFD = [
  //e    a    b     c
  //0    1    2     3
  ['A', 'B', null, null],
  ['B', 'D', 'C', null],
  ['C', null, 'D', 'C'],
  ['D', null, null, 'E'],
  ['E', 'D', 'E', null]
];

//Ej.2
let AFD = [
  //e    a    b     
  //0    1    2     
  ['A', 'C', 'B'],
  ['B', 'B', null],
  ['C', 'B', 'D'],
  ['D', null, null]
];
*/

export function afdToEr(AFD, estados, valores, insertarTerminal) {
  let calculo = [];
  let msm;
  let aux1 = "", auxLetra, auxEstado, primero = 0;
  //Realizando la nomenclatura del AFD, tal como: aD | bE
  for (let i = AFD.length - 1; i >= 0; i--) {
    for (let k = 1; k <= valores.length; k++) {
      if (AFD[i][k] != null) {
        auxLetra = valores[k - 1];
        auxEstado = AFD[i][k];
        if (primero == 0) {
          aux1 += auxLetra + auxEstado;
          primero = 1;
        } else {
          aux1 += ",";
          aux1 += auxLetra + auxEstado;
        }
      }
    }
    primero = 0;
    calculo.push(aux1);
    aux1 = "";
    console.log("Calculo: ", calculo);
  }

  //En caso de llamarse a si mismo, reemplazar, ej E = aD | bE
  //                                               E = aD | b*

  let temporal = "";
  let e = estados.length - 1;
  for (let i = 0; i < calculo.length; i++) {
    console.log("-------------------------");
    console.log("Cal: ", calculo[i]);
    console.log("Est: ", estados[e]);
    console.log("Es? ", calculo[i].includes(estados[e]));
    if (calculo[i].includes(estados[e])) {
      aux1 = calculo[i];
      console.log("Aux: ", aux1);
      for (let s = 0; s < aux1.length; s++) {
        console.log("A: ", aux1[s]);
        console.log("E: ", estados[e]);
        console.log("Es? ", aux1[s] != estados[e]);
        if (aux1[s] != estados[e]) {
          temporal += aux1[s];
          console.log("Temporal DENTRO: ", temporal);
        } else {
          console.log("Lo reemplace");
          temporal += '*';
        }
      }
      console.log("TEMPORAL ", i, ": ", temporal);
      calculo[i] = temporal;
    }
    e--;
    temporal = "";
    console.log("Calculo 2: ", calculo[i]);
  }
  console.log("Calculo FINAL: ", calculo);

  //Imprimiendo Paso (1)
  let imprimiendo = calculo;
  let c = estados.length-1;

  msm = `--------------------------------------------<br>
  PASO 2: Interpretando los datos del paso (1)<br>
  --------------------------------------------<br>
  Mostrando ecuaciones...<br>`;
  insertarTerminal.innerHTML += msm;

  for (let i = 0; i < calculo.length; i++){
    msm = `${estados[c]}: ${imprimiendo[i]}<br>`;
    insertarTerminal.innerHTML += msm;
    c--;
  }

  //Reversando calculo
  //Ej:
  //['aD,b*', 'cE', 'bD,c*', 'aD,bC', 'aB' ]
  //   0        1     2         3       4
  //En reversa
  //[ aB,  aD, bC   bD, c*   cE   aD,b* ]
  //   0     1        2      3      4
  let a = [];
  aux1 = calculo.reverse();
  calculo = aux1;
  let concretado = 0, z;
  console.log("Calculo reversado: ", calculo);

  aux1 = "";
  let aux;
  for (let i = calculo.length - 1; i >= 0; i--){
    console.log("___ # PART 1 # ___");
    for (let k = calculo.length - 1; k >= i; k--){
      console.log("___ # part 1.2 # ___");
      console.log("Estado[",k,"]: ", estados[k]);
      console.log("Calculo[",i-1,"]: ", calculo[i-1]);
      if(i-1 != -1){
        console.log("... esta en ? ", calculo[i-1].includes(estados[k]));
        if (calculo[i-1].includes(estados[k])){
          aux = calculo[i-1];
          console.log()
          for (let s = 0; s < aux.length; s++){
            console.log("aux[",s,"]: ", aux[s]);
            console.log("Estado[",k,"]: ", estados[k]);
            if (aux[s] == estados[k]){
              console.log("Insertando... ", calculo[k]);
              aux1 += "(" + calculo[k] + ")";
            } else {
              aux1 += aux[s];
            }
          }
          concretado = 1;
          console.log("aux concretado... ", aux1);
        }

        console.log("___ # PART 2 # ___");
        aux ="";
        console.log("aux1: ", aux1);
        console.log("estados[",i-1,"]: ", estados[i-1]);
        if (aux1.includes(estados[i-1])){
          for (let s = 0; s < aux1.length; s++){
            console.log("aux1[",s,"]: ", aux1[s]);
            console.log("estados[",i-1,"]: ", estados[i-1]);
            if (aux1[s] == estados[i-1]){
              console.log("Reemplazado");
              z = 0;
              //aux += "*";
            } else {
              aux += aux1[s];
            }
          }
          if (z == 0){
            aux = "(" + aux + ")*";
            z = 1;
          }

          concretado = 2;
        }
        console.log("Aux: ", aux);
        console.log("en Calculo[",i-1,"]");

        console.log("concretado: ", concretado);
        if (concretado == 1 || concretado == 2){
          if (concretado == 1){
            calculo[i-1] = aux1;
            console.log("Se inserto: ", aux1, "en calculo[",i-1,"]");
            concretado = 0;
          }
          if (concretado == 2){
            calculo[i-1] = aux;
            console.log("Se inserto: ", aux, "en calculo[",i-1,"]");
            concretado = 0;
          } 
        }
        aux1 = "";
        aux = "";
      }//
    }
  }

  //Imprimiendo paso 3
  msm = `<br><br>---------------------------------------------------------<br>
  PASO 3: Reemplazando en las var en los estados incógnitos<br>
  ---------------------------------------------------------<br>
   ___________<br>
  |Por ej.:............|<br>
  | D = aC | b*......|<br>
  | C = eD............|<br>
  | C = e (aC | b*)|<br>
  |___________|<br><br>`;
  insertarTerminal.innerHTML += msm;
  for (let s = calculo.length-1; s >= 0; s--){
    msm = `${estados[s]}: ${calculo[s]}<br>`;
    insertarTerminal.innerHTML += msm;
  }

  msm = `<br>`;
  insertarTerminal.innerHTML += msm;
  
  aux = "";
  //Cambiando "," por "|"
  for (let s = 0; s < calculo[0].length; s++){
    console.log("Entre for");
    console.log("calculo[0][",s,"]: ", calculo[0][s]);
    if (calculo[0][s] == ','){
      console.log("reemplace");
      aux += "|";
    } else {
      aux += calculo[0][s];
    }
  }
  calculo[0] = aux;

  //Mostrando paso final
  console.log("Respuesta: ", calculo[0]);
  msm = `<br><br>-------------------------<br>
  PASO 4: Mostrar respuesta<br>
  -------------------------<br>
  (NOTA) : proceda a factorizar de ser necesario...<br>`;
  insertarTerminal.innerHTML += msm;
  
  msm = `La expresión regular del AFD es:     ${calculo[0]}<br>`;
  insertarTerminal.innerHTML += msm;
}