/* REFERENCIAS A OTRAS FUNCIONES */
/** -------------------------- **/

/** ------------o----------- **/

/* DEFINICION DE DATOS A UTILIZAR */
/** --------------------------- **/
let automata_1 = [];
let estadosNoAceptadores_A1 = [];
let estadosAceptadores_A1 = []; //Estado final
let tipoDeAutomata_1;


//Variables temporales
let automataTemporal = [];
let estadosNoAceptadores_T = [];
let estadosAceptadores_T = []; //Estado final
let tipoDeAutomata_T;
/** --------------o------------- **/

/* DATOS EXTRA PARA VÁLIDACIÓN DE DATOS */
/** --------------------------------- **/
let cantEstados;
let datosAutomataIngresados = false;
let finalizoAutomata = false; //Cuando finalice automata
/** --------------o----------------- **/

//** VARIABLES PARA MSM POR PANTALLA **/
/** ------------------------------- **/
let insertarTerminal = document.querySelector(".terminal");
let adv;
/** --------------O--------------- **/

/* RECOLECCIÓN DE DATOS Y VALIDACIÓN DE ESTOS PARA SU INGRESO */
/** ------------------------------------------------------- **/
function automata() {//*****  ---meh
  var aux = document.getElementById("cantest").value;//cant de estados
  var auxu = document.getElementById("inicio").value;//Estado inicial

  if ((aux >= 0 && auxu >= 0) && (aux % 1 === 0) && (auxu % 1 === 0) && (auxu <= aux)) {
    let tipoDeAutomata = document.getElementById("afdon").value;
    console.log(tipoDeAutomata);//0: AFD | 1: AFND
    tipoDeAutomata_T = tipoDeAutomata;

    let cantidadDeEstados = document.getElementById("cantest").value;
    console.log(cantidadDeEstados);
    cantEstados = cantidadDeEstados;
    console.log("c: ", cantEstados);

    let estadoInicial = document.getElementById("inicio").value;
    console.log(estadoInicial);
    //*

    datosAutomataIngresados = true;
  }
  else {
    let insertarTerminal = document.querySelector(".terminal");
    let adv = `ERROR: Los datos NO PUDIERON ser agregados<br>`;
    insertarTerminal.innerHTML += adv;
    if (aux < 0) {
      adv = `ERROR: La cantidad de estados debe ser POSITIVA el valor NO SERA AGREGADO<br>`;
      insertarTerminal.innerHTML += adv;
    }
    if (auxu < 0) {
      adv = `ERROR: El estado inicial debe ser POSITIVO el valor NO SERA AGREGADO<br>`;
      insertarTerminal.innerHTML += adv;
    }
    if (aux % 1 !== 0) {
      adv = `ERROR: La cantidad de estados debe ser un número ENTERO el valor NO SERA AGREGADO<br>`;
      insertarTerminal.innerHTML += adv;
    }
    if (auxu % 1 !== 0) {
      adv = `ERROR: El estado inicial debe ser un número ENTERO el valor NO SERA AGREGADO<br>`;
      insertarTerminal.innerHTML += adv;
    }
    if (auxu > aux) {
      adv = `ERROR: El estado inicial debe ser MENOR que la cantidad de estados el valor NO SERA AGREGADO<br>`;
      insertarTerminal.innerHTML += adv;
    }
  }
}

function datos() {
  var estado = document.getElementById("estado").value;
  var direccionA = document.getElementById("varA").value;
  var direccionB = document.getElementById("varB").value;
  var estadoFinal = document.getElementById("final").value;// 0: Si | 1: No

  console.log("Estado: ", estado);
  console.log("Direccion A: ", direccionA);
  console.log("Direccion B: ", direccionB);
  console.log("Estado Final: ", estadoFinal);

  //COMPRUEBA SI SON DATOS VÁLIDOS ANTES DE SU INGRESO AL OBJETO
  //------
  let errores = 0;

  if (datosAutomataIngresados === true) {
    if (parseInt(estado) < 0) {
      adv = `ERROR: El estado debe ser POSITIVO... los datos NO SERAN AGREGADOS<br>`;
      insertarTerminal.innerHTML += adv;
      errores++;
    }
    if (parseInt(estado) % 1 !== 0) {
      adv = `ERROR: El estado debe ser un número ENTERO... los datos NO SERAN AGREGADOS<br>`;
      insertarTerminal.innerHTML += adv;
      errores++;
    }
    console.log("Cant estados: ", cantEstados);
    console.log("Estado: ", parseInt(estado));
    if (cantEstados === parseInt(estado) || cantEstados < parseInt(estado)) {
      let adv = `ERROR: El estado debe ser un número MENOR A LA CANTIDAD DE ESTADOS... los datos NO SERAN AGREGADOS<br>`;
      insertarTerminal.innerHTML += adv;
      errores++;
    }

    if (parseInt(direccionB) < -1) {
      adv = `ERROR: El valor en B debe ser MAYOR O IGUAL A -1... el valor NO SERA AGREGADO<br>`;
      insertarTerminal.innerHTML += adv;
      errores++;
    }

    if (parseInt(direccionA) < -1) {
      adv = `ERROR: El valor en A debe ser MAYOR O IGUAL A -1... el valor NO SERA AGREGADO<br>`;
      insertarTerminal.innerHTML += adv;
      errores++;
    }
    //------ *

    if (errores === 0) {
      //INGRESA ESTADOS FINALES DEL AUTOMATA
      //------
      if (parseInt(estadoFinal) === 0)
        estadosAceptadores_T.push(parseInt(estado));
      //------ *

      //COMPRUEBA SI EXISTEN DOS O MÁS ELEMENTOS EN CADA ALFABETO
      //------ 
      let arr = [], arr2 = [], array = [], array2 = [];//Variables auxilixares
      if (parseInt(direccionA) === -1 && parseInt(direccionB) === -1) {
        automataTemporal.push({ estado: parseInt(estado), a: null, b: null });
      }

      else if (parseInt(direccionA) === -1 && direccionB.length === 1) {
        automataTemporal.push({ estado: parseInt(estado), a: null, b: parseInt(direccionB) });
      }

      else if (direccionA.length === 1 && parseInt(direccionB) === -1) {
        automataTemporal.push({ estado: parseInt(estado), a: parseInt(direccionA), b: null });
      }

      else if (direccionA.length === 1 && direccionB.length === 1) {
        automataTemporal.push({ estado: parseInt(estado), a: parseInt(direccionA), b: parseInt(direccionB) });
      }
      //En caso de existir -> Elemento A: 1,2
      else if (direccionA.length !== 1 && direccionB.length !== 1) {
        arr = direccionA.split(',');
        arr2 = direccionB.split(',');
        for (let i = 0; i < arr.length; i++) {
          array[i] = parseInt(arr[i]);
        }
        for (let i = 0; i < arr2.length; i++) {
          array2[i] = parseInt(arr2[i]);
        }

        automataTemporal.push({ estado: parseInt(estado), a: array, b: array2 });
      }

      else if (direccionA.length !== 1 && direccionB.length === 1) {
        arr = direccionA.split(',');
        for (let i = 0; i < arr.length; i++) {
          array[i] = parseInt(arr[i]);
        }

        automataTemporal.push({ estado: parseInt(estado), a: array, b: parseInt(direccionB) });
      }

      else if (direccionA.length === 1 && direccionB.length !== 1) {
        let arr = direccionB.split(',');
        for (let i = 0; i < arr.length; i++) {
          array[i] = parseInt(arr[i]);
        }
        automataTemporal.push({ estado: parseInt(estado), a: parseInt(direccionA), b: array });
      }

      else if (direccionA.length !== 1 && direccionB.length === -1) {
        arr = direccionA.split(',');
        for (let i = 0; i < arr.length; i++) {
          array[i] = parseInt(arr[i]);
        }

        automataTemporal.push({ estado: parseInt(estado), a: array, b: null });
      }

      else if (direccionA.length === -1 && direccionB.length !== 1) {
        let arr = direccionB.split(',');
        for (let i = 0; i < arr.length; i++) {
          array[i] = parseInt(arr[i]);
        }
        automataTemporal.push({ estado: parseInt(estado), a: null, b: array });
      }
      //------ *
    }
  } else {
    adv = `ERROR: Debe ENVIAR primero los elementos de la izq para ingresar datos del automata... los datos NO SERAN AGREGADOS<br>`;
    insertarTerminal.innerHTML += adv;
  }

  //automata1.push({estado: estado, a: direccionA, b: direccionB});
  console.log("T: ", automataTemporal);
  console.log("E F: ", estadosAceptadores_T);
}
/** -------------------------o----------------------------- **/

//
{//function auxiliar(esta, tablaFinales){// 0 - 4
//  for (let k = 0; k < tablaFinales.length; k++){
//    console.log("ESS: ", esta);
//    console.log("IGUAL A: ", tablaFinales[k]);
//    if (esta.length !== 1){//arreglo
//      for (let i = 0; i < esta.length; i++){
//        if(esta[i] === tablaFinales[k]){
//          return true;
//        }
//      }
//    } else {
//    if (esta === tablaFinales[k]){ //4 = 1, 4, 5?
//        return true;
//      }
//    }
//  }
//
//  return false;
//}
}
{//function funciones(automata_1, tipoDeAutomata_1, estadosAceptadores_A1) {
  //Ingreso los datos correctamente
  //Si es un automata AFN proceder a su transformación
  // 0: AFD | 1: AFND
  //----------
//  console.log("Entre a funciones")
//  let afdTransformado_1 = [];
//  console.log("Tipo de au 1: ", parseInt(tipoDeAutomata_1));

//  if (parseInt(tipoDeAutomata_1) === 1){
//    //es AFND
//    afdTransformado_1 = AFN(automata_1);
//    console.log("af1: ", afdTransformado_1);
////    afdTransformado_2 = AFN(automata_2);
////    console.log("af2: ", afdTransformado_2);
//
////    adv = `SE HAN INGRESADO DOS AFND<br>Se inicia su transformación: <br><br>`;
////    insertarTerminal.innerHTML += adv;
//    //Imprimiendo automata 1 transformado
//    automata_1 = JSON.parse(JSON.stringify(afdTransformado_1));
//    adv = `Automata 1 transformado: <br>`;
//    insertarTerminal.innerHTML += adv;
//    for(let k = 0; k < automata_1.length; k++){
//      let aux = automata_1[k].estado;
//      if(k === 0){
//        adv = `-> e: ${automata_1[k].estado}  a: ${automata_1[k].a}  b: ${automata_1[k].b}<br>`;
//      } else {
//        if (auxiliar(aux, estadosAceptadores_A1) == true){
//          adv = `* e: ${automata_1[k].estado}  a: ${automata_1[k].a}  b: ${automata_1[k].b}<br>`;
//          //console.log("* ", interseccionDeEstados[i]);
//        } else {
//          //console.log("   ", interseccionDeEstados[i]);
//          adv = `  e: ${automata_1[k].estado}  a: ${automata_1[k].a}  b: ${automata_1[k].b}<br>`;
//        }
//      }
//      insertarTerminal.innerHTML += adv;
//    }
//
//    //Imprimiendo automata 2 transformado
//    automata_2 = JSON.parse(JSON.stringify(afdTransformado_2));
//    adv = `Automata 2 transformado: <br>`;
//    insertarTerminal.innerHTML += adv;
//    for(let k = 0; k < automata_2.length; k++){
//      let aux = automata_2[k].estado;
//      if(k === 0){
//        adv = `-> e: ${automata_2[k].estado}  a: ${automata_2[k].a}  b: ${automata_2[k].b}<br>`;
//      } else {
//        if (auxiliar(aux, estadosAceptadores_A2) == true){
//          adv = `* e: ${automata_2[k].estado}  a: ${automata_2[k].a}  b: ${automata_2[k].b}<br>`;
//          //console.log("* ", interseccionDeEstados[i]);
//        } else {
//          //console.log("   ", interseccionDeEstados[i]);
//          adv = `  e: ${automata_2[k].estado}  a: ${automata_2[k].a}  b: ${automata_2[k].b}<br>`;
//        }
//      }
//      insertarTerminal.innerHTML += adv;
//    }
//
//  }
//  else if (parseInt(tipoDeAutomata_1) === 1 && parseInt(tipoDeAutomata_2) !== 1){
//    //Solo A_1 es AFND
//    afdTransformado_1 = AFN(automata_1);
//    console.log("af1: ", afdTransformado_1);
//    
//    adv = `SE HAN INGRESADO UN AFND<br>Se inicia su transformación: <br><br>`;
//    insertarTerminal.innerHTML += adv;
//    //Imprimiendo automata 1 transformado
//    adv = `Automata 1 transformado: <br>`;
//    automata_1 = JSON.parse(JSON.stringify(afdTransformado_1));
//    insertarTerminal.innerHTML += adv;
//    for(let k = 0; k < automata_1.length; k++){
//      let aux = automata_1[k].estado;
//      if(k === 0){
//        adv = `-> e: ${automata_1[k].estado}  a: ${automata_1[k].a}  b: ${automata_1[k].b}<br>`;
//      } else {
//        if (auxiliar(aux, estadosAceptadores_A1) == true){
//          adv = `* e: ${automata_1[k].estado}  a: ${automata_1[k].a}  b: ${automata_1[k].b}<br>`;
//          //console.log("* ", interseccionDeEstados[i]);
//        } else {
//          //console.log("   ", interseccionDeEstados[i]);
//          adv = `  e: ${automata_1[k].estado}  a: ${automata_1[k].a}  b: ${automata_1[k].b}<br>`;
//        }
//      }
//      insertarTerminal.innerHTML += adv;
//    }
//  }
//  else if (parseInt(tipoDeAutomata_1) !== 1 && parseInt(tipoDeAutomata_2) === 1){
//    //Solo A_2 es AFND
//    afdTransformado_2 = AFN(automata_2);
//    console.log("af2: ", afdTransformado_2);
//    adv = `SE HAN INGRESADO UN AFND<br>Se inicia su transformación: <br><br>`;
//    insertarTerminal.innerHTML += adv;
//    //Imprimiendo automata 2 transformado
//    adv = `Automata 2 transformado: <br>`;
//    automata_2 = JSON.parse(JSON.stringify(afdTransformado_2));
//    insertarTerminal.innerHTML += adv;
//    for(let k = 0; k < automata_2.length; k++){
//      let aux = automata_2[k].estado;
//      if(k === 0){
//        adv = `-> e: ${automata_2[k].estado}  a: ${automata_2[k].a}  b: ${automata_2[k].b}<br>`;
//      } else {
//        if (auxiliar(aux, estadosAceptadores_A2) == true){
//          adv = `* e: ${automata_2[k].estado}  a: ${automata_2[k].a}  b: ${automata_2[k].b}<br>`;
//          //console.log("* ", interseccionDeEstados[i]);
//        } else {
//          //console.log("   ", interseccionDeEstados[i]);
//          adv = `  e: ${automata_2[k].estado}  a: ${automata_2[k].a}  b: ${automata_2[k].b}<br>`;
//        }
//      }
//      insertarTerminal.innerHTML += adv;
//    }
//  }

  //---------- *
  //Simplificando
//  adv = `SIMPLIFICANDO AUTOMATAS<br>Se inicia su minimización: <br><br>`;
//  insertarTerminal.innerHTML += adv;
//  let simpli = simplificar(automata_1, estadosAceptadores_A1);
//  automata_1 = JSON.parse(JSON.stringify(simpli[0]));
//  estadosAceptadores_A1 = JSON.parse(JSON.stringify(simpli[1]));
//  //Imprimiendo automata 1 simplificacion
//  adv = `Automata 1 simplificanco: <br>`;
//  insertarTerminal.innerHTML += adv;
//  for(let k = 0; k < automata_1.length; k++){
//    let aux = automata_1[k].estado;
//    if(k === 0){
//      adv = `-> e: ${automata_1[k].estado}  a: ${automata_1[k].a}  b: ${automata_1[k].b}<br>`;
//    } else {
//      if (auxiliar(aux, estadosAceptadores_A1) == true){
//        adv = `* e: ${automata_1[k].estado}  a: ${automata_1[k].a}  b: ${automata_1[k].b}<br>`;
//      } else {
//        adv = `  e: ${automata_1[k].estado}  a: ${automata_1[k].a}  b: ${automata_1[k].b}<br>`;
//      }
//    }
//    insertarTerminal.innerHTML += adv;
//  }
//
//  //let simpli = simplificar(automata_2, estadosAceptadores_A2);
//  automata_2 = JSON.parse(JSON.stringify(simpli[0]));
//  estadosAceptadores_A2 = JSON.parse(JSON.stringify(simpli[1]));
//  //Imprimiendo automata 2 transformado
//  adv = `Automata 2 simplificacion: <br>`;
//  insertarTerminal.innerHTML += adv;
//  for(let k = 0; k < automata_2.length; k++){
//    let aux = automata_2[k].estado;
//    if(k === 0){
//      adv = `-> e: ${automata_2[k].estado}  a: ${automata_2[k].a}  b: ${automata_2[k].b}<br>`;
//    } else {
//      if (auxiliar(aux, estadosAceptadores_A2) == true){
//        adv = `* e: ${automata_2[k].estado}  a: ${automata_2[k].a}  b: ${automata_2[k].b}<br>`;
//      } else {
//        adv = `  e: ${automata_2[k].estado}  a: ${automata_2[k].a}  b: ${automata_2[k].b}<br>`;
//      }
//    }
//    insertarTerminal.innerHTML += adv;
//  }

//  adv = `UNIONENDO <br>`;
//  insertarTerminal.innerHTML += adv;
//  let au = controladora(automata_1, automata_2);


  
  //Imprimir las funciones según lo pedido
  //a.  Obtener el AFD equivalente (si es AFND) y simplificarlos.
  //b.  Obtener el autómata a partir del complemento, unión, c     
  //    concatenación e intersección entre ambos autómatas.
  //c.  Pasar los autómatas del punto anterior a AFD y simplificarlos.
  //----------
  
  //---------- *
//}
} //FUNCIONES HAY QUE MODIFICAR TODO ESTO

window.onload = async ()=>{
  var botonEnviar = document.getElementById("enviar");
  var botonAgregar = document.getElementById("agregar");
  var botonGuardaAutomata1 = document.getElementById("finalizara1");

  botonEnviar.addEventListener("click", function () {
    automata();
  });

  botonAgregar.addEventListener("click", function () {
    datos();
  });

  //EN CASO DE FINALIZAR EL LLENADO GUARDAR EN VARIABLES GLOBALES
  //------
  //Si es Automata 1...
  botonGuardaAutomata1.addEventListener("click", function () {
    console.log("Guardando automata 1...");
    automata_1 = JSON.parse(JSON.stringify(automataTemporal));
    console.log("Au 1: ", automata_1);
    tipoDeAutomata_1 = JSON.parse(JSON.stringify(tipoDeAutomata_T));
    console.log(tipoDeAutomata_1);
    estadosAceptadores_A1 = JSON.parse(JSON.stringify(estadosAceptadores_T));
    console.log(estadosAceptadores_A1);
    automataTemporal = [];//Vacias temporal
    estadosAceptadores_T = [];//Vacia finales
    finalizoAutomata = true;
  });
  //Si es Automata 2...
//  botonGuardaAutomata2.addEventListener("click", function () {
//    console.log("Guardando automata 2...");
//    automata_2 = JSON.parse(JSON.stringify(automataTemporal));
//    console.log("Au 2: ", automata_2);
//    tipoDeAutomata_2 = JSON.parse(JSON.stringify(tipoDeAutomata_T));
//    estadosAceptadores_A2 = JSON.parse(JSON.stringify(estadosAceptadores_T));
//    finalizoAutomata = true;


    console.log("es? ", finalizoAutomata);
    if (finalizoAutomata === true){
      //funciones(automata_1, automata_2, tipoDeAutomata_1, tipoDeAutomata_2, estadosAceptadores_A1, estadosAceptadores_A2);
      console.log("LISTO");
    }
  //});
  //------ *



  //console.log("es? ", finalizoAutomata);
  //if (finalizoAutomata === true){
  //  funciones();
  //}
};