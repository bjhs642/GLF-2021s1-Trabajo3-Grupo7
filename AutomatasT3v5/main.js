/* REFERENCIAS A OTRAS FUNCIONES */
/** -------------------------- **/
import { afdToEr } from './AFDtoER.js';
import { DFA2, FSA, Transition } from './kleene.js';
//import  pLog  from './node_modules/p-log/index.js';

/** ------------o----------- **/

/* DEFINICION DE DATOS A UTILIZAR */
/** --------------------------- **/
let automata = [];//Sus nodos y direcciones
let valoresAu = [];//a,b,c...
let estadosAu = [];//Estados
let estadosAceptadores = []; //Estado final
/** --------------o------------- **/

//** VARIABLES PARA MSM POR PANTALLA **/
/** ------------------------------- **/
let insertarTerminal = document.querySelector(".terminal");
let adv;
/** --------------o--------------- **/

/* DATOS EXTRA PARA VÁLIDACIÓN DE DATOS */
/** --------------------------------- **/
let verificacionDatosUno = false;
/** --------------o----------------- **/

/* VARIABLES GLOABLES PARA EL TRASPASO DE INFO */
/** ---------------------------------------- **/
let estadoInicial;
let cantidadEstados;
/** -------------------o------------------- **/


/* RECOLECCIÓN DE DATOS Y VALIDACIÓN DE ESTOS PARA SU INGRESO */
/** ------------------------------------------------------- **/
//Recolección de la parte izq, para su posterior validación y así proceder a la sig fun
function datosParIzq(){
  //Recibiendo datos de la pág web y almacenandolos en variables
  let aux = document.getElementById("Cestados").value;//cant de estados
  let auxu = document.getElementById("Einicial").value;//Estado inicial
  let valores = document.getElementById("valores").value;//valores

  //LOGS
//  Promise.resolve(valores)
//	.then(pLog()) // Logs `unicorn`
//	.then(value => {
		// `value` is still `unicorn`
        plog.info("Valores ingresados (Pre Validación):"+valores);
    console.log("Valores ingresados (Pre Validación):", valores);
    //console.log(value);
	//});
  //Fin LOGS

  //Procediendo a validar si los datos corresponden
  if (auxu !== "" && aux > 0 && valores !== "") {
    //Válidando valores
    let expRepValoresCaso1 = /^([a-x](,){1,})/; //Debe ser: a,b,c...
    let expRepValoresCaso2 = /^([a-x]$)/; //Debe ser, simplemente: a
    if (valores.length === 1){
      //LOGS
//      Promise.resolve(expRepValoresCaso2.test(valores) === true)
//	    .then(pLog()) // Logs `unicorn`
//	    .then(value => {
//		    // `value` is still `unicorn`
            plog.info("Validación caso 2 (a): "+(expRepValoresCaso2.test(valores) === true));
            console.log('Válidación caso 2 (a): ', expRepValoresCaso2.test(valores) === true );
//        console.log(value);
//	    });
      //Fin LOGS
      
      //Caso 2
      if (expRepValoresCaso2.test(valores) === true){
        //Solo es una unidad, por lo tanto
        valoresAu = valores[0];
      } else {
        adv = `ERROR: "Valores" no se encuentra en formato pedido(1)<br>`;
        insertarTerminal.innerHTML += adv;
      }
    } else {
      if (valores.includes(',')){
        //LOGS
//        Promise.resolve(expRepValoresCaso1.test(valores) === true)
//	      .then(pLog()) // Logs `unicorn`
//	      .then(value => {
//	      	// `value` is still `unicorn`
	      	plog.info("Validación caso 1 (a,b,c, ...): "+(expRepValoresCaso1.test(valores) === true));
        console.log('Válidación caso 1 (a,b,c, ...): ', expRepValoresCaso1.test(valores) === true);
//        console.log(value);
//	      });
        //Fin LOGS
        
        //Caso 1
        if (expRepValoresCaso1.test(valores) === true){//Si cumple con el formato pedido
          //Guardando valores
          let arr = valores.split(/\s*,+\s*/);//Ni espacios ni "," se tomarán en cuenta
          for (let i = 0; i < arr.length; i++) {
            valoresAu.push(arr[i]);//a luego b ...
            //valoresAu = [a,b,c...]
          }
          //LOGS
//          Promise.resolve(valoresAu)
//	        .then(pLog()) // Logs `unicorn`
//	        .then(value => {
//	      	// `value` is still `unicorn`
	      	plog.info(" Valores pasaron posibles errores: "+valoresAu);
          console.log(' "Valores" pasaron posibles errores: ', valoresAu);
//          console.log(value);
//	        });
          //Fin LOGS
          
        } else {
          adv = `ERROR: "Valores" no se encuentra en formato pedido(2)<br>`;
          insertarTerminal.innerHTML += adv;
        }
      }
    }

    //Pasandolos a variables globales
    estadoInicial = auxu;
    cantidadEstados = aux;

    verificacionDatosUno = true;

  } else {//En caso de no cumplir los requisitos...
    adv = `LOS DATOS NO PUDIERON SER AGREGADOS<br>`;
    insertarTerminal.innerHTML += adv;
    if (auxu === ""){
      adv = `ERROR: El campo "Estado inicial" esta vacío<br>`;
      insertarTerminal.innerHTML += adv;
    }
    if (valores === ""){
      adv = `ERROR: El campo "Valores" esta vacío<br>`;
      insertarTerminal.innerHTML += adv;
    }
    if (aux  === 0){
      adv = `ERROR: El campo "Cantidad de estados" no puede ser 0<br>`;
      insertarTerminal.innerHTML += adv;
    }
    if (aux < 0){
      adv = `ERROR: El campo "Cantidad de estados" no puede ser entero negativo<br>`;
      insertarTerminal.innerHTML += adv;
    }
  }
}//Fin función

//Recolectados los datos de la part1, se procederá a recolectar los de la part2 y su posterior validación
function datosPartDer(){
  //Recolectando información
  let estado = document.getElementById("estado").value;
  let direcciones = document.getElementById("direcciones").value;
  var estadoFinal = document.getElementById("final").value;// 0: Si | 1: No
  console.log("Estados Finales: ", estadoFinal);
  //Variables auxiliares y de comprobacion
  let limiteDeEstados = 0;
  let arregloAux,  temporal = [], arrOrganDirecciones = [];
  
//  Promise.resolve('Datos Parte izq verificados y guardados con exito: ')
//	.then(pLog()) // Logs `unicorn`
//	.then(value => {
//		// `value` is still `unicorn`
            plog.info("Datos Parte izq verificados y guardados con exito: "+verificacionDatosUno);
            console.log("Datos Parte izq verificados y guardados con exito: ", verificacionDatosUno);
//	});

  //LOGS
//  Promise.resolve(estado !== '' && direcciones !== '')
//  .then(pLog()) // Logs `unicorn`
//  .then(value => {
//    // `value` is still `unicorn`
    plog.info("Datos recibidos PRE verificación de formato no se encuentran vacio "+(estado !== '' && direcciones !== ''));
    plog.info("Estado: " + estado);
    plog.info("Direccion: " + direcciones);
    plog.info("Estados Finales: " + estadoFinal);
    
    console.log("Datos recibidos PRE verificación de formato no se encuentran vacio ", estado !== '' && direcciones !== '');
    console.log("Estado: ", estado);
    console.log("Direccion: ", direcciones);
    console.log("Estados Finales: ", estadoFinal);
//  });
  //Fin LOGS
  
  if (verificacionDatosUno === true){
    if (estado !== "" && direcciones !== ""){
      //Hacer una comprobación que "estado" debe ser [A-Z] en MAYUSCULAS
      if (limiteDeEstados <= cantidadEstados){
        //if (estadoInicial !== estadoFinal){
          //Hacer comprobación de cumplir formato Direcciones [a-z][A-Z]"," (termina sin coma)
          //Válidando valores
          let expRepDireccionesCaso1 = /(^[a-z][A-Z](,)){1,}/;// Debe ser aB, bC
          let expRepDireccionesCaso2 = /(^[a-z][A-Z]$)/;//Debe ser aB
          //if (direcciones.includes(',')){
          
          //LOGS
//          Promise.resolve(expRepDireccionesCaso1.test(direcciones) === true ||  expRepDireccionesCaso2.test(direcciones) === true || direcciones === 'zZ')
//          .then(pLog()) // Logs `unicorn`
//          .then(value => {
//          // `value` is still `unicorn`

          plog.info("Cumple algún formato: "+(expRepDireccionesCaso1.test(direcciones) === true ||  expRepDireccionesCaso2.test(direcciones) === true || direcciones === 'zZ'));
          plog.info("Cumple formato 1 (aB, bC, cD): "+(expRepDireccionesCaso1.test(direcciones) === true));
          plog.info("Cumple formato 2 (aB): "+(expRepDireccionesCaso2.test(direcciones) === true));
          plog.info("Cumple formato rezagado (zZ | caso vacío): "+(direcciones === 'zZ'));
          
          console.log("Cumple algún formato: ", expRepDireccionesCaso1.test(direcciones) === true ||  expRepDireccionesCaso2.test(direcciones) === true || direcciones === 'zZ');
          console.log("Cumple formato 1 (aB, bC, cD): ", expRepDireccionesCaso1.test(direcciones) === true);
          console.log("Cumple formato 2 (aB): ", expRepDireccionesCaso2.test(direcciones) === true);
          console.log("Cumple formato rezagado (zZ | caso vacío): ", direcciones === 'zZ');
//          });
          //Fin LOGS

          if (expRepDireccionesCaso1.test(direcciones) === true || expRepDireccionesCaso2.test(direcciones) === true || direcciones === 'zZ'){
            //Insertando direcciones .... direcciones almacena: aB,bB
            if (direcciones.includes(',')){
              arregloAux = direcciones.split(/\s*,+\s*/);//Ni espacios ni "," se tomarán en cuenta
              for (let i = 0; i < arregloAux.length; i++) {
                temporal.push(arregloAux[i]);//guardo en [0]: aB | [1]: bB
                //Formato de ingreso:
                //Si valoresAu son: a, b, c
                //  e    a    b    c
                //Entonces direcciones
                //['A', 'C', 'B', null]
                //Si valoresAu son a, b
                //  e    a    b  
                //['A', 'C', 'B']
              }
            } else {
              temporal.push(direcciones);//aB
            }

            //Creando List Ady
            for (let k = 0; k < valoresAu.length; k++){
              arrOrganDirecciones.push([]);
            }

            for (let k = 0; k < temporal.length; k++){
              if (temporal[k] === 'zZ'){//temporal[i] = zZ ... es decir, su nodo no apunta a nada -> llene de "null"
                arrOrganDirecciones[k].push(null);
              } else {// temporal[0]  -> aB  | temporal[0][0]: a -> temporal[0][1]: B
                for (let i = 0; i < valoresAu.length; i++)
                  if (temporal[k][0] === valoresAu[i]){//valoresAu[0]: a | valoresAu[1]: b | ...
                    arrOrganDirecciones[i].push(temporal[k][1]);
                  }
              }
            }

            //Rellenando con null en caso de no haber camino
            //ej: a, b = 2
            for(let i = 0; i < valoresAu.length; i++){//a: B
              if(arrOrganDirecciones[i] === undefined){
                arrOrganDirecciones[i].push(null);
              }
            }
            plog.info("Direcciones: " + arrOrganDirecciones);
            console.log("Direcciones: ", arrOrganDirecciones);

            //Ingresando los datos del automata
            //Ingresa los estados
            estadosAu.push(estado);
            limiteDeEstados++;

            //Ingresa los estados finales
            console.log("Estado f: ", estadoFinal);
            console.log("Es cero? ", estadoFinal === 0);
            if (parseInt(estadoFinal) === 0){
              estadosAceptadores.push(estado);
              console.log("Estado aceptador: ", estadosAceptadores);
            }
          
            //Ingresa el automataTemporal
            let preArray = [];//Cuando den agregar, preArray ya se encuentra vacío para otra linea más
            for(let k = 0; k < arrOrganDirecciones.length; k++){
              if (preArray.length === 0){//Si esta vacío
                preArray.push(estado); //[Estado, ...]
                preArray.push(arrOrganDirecciones[k].pop());
              } else {
                //*En caso de ser dos
                preArray.push(arrOrganDirecciones[k].pop()); //[ estado, arrOrganDirecciones[0], ... ]
                                                    //     0              1(a)           (n)n
              }
            }

//            Promise.resolve(preArray.length != 0)
//	          .then(pLog()) // Logs `unicorn`
//	          .then(value => {
//		        // `value` is still `unicorn`
            plog.info("Formando parte del automata con datos ingresados para su agregado: "+preArray);
            console.log("Formando parte del automata con datos ingresados para su agregado: ", preArray);
//	          });
            
            //Llenando automata T
            let automata_T = new Array (preArray.length).fill(null);

            for (let k = 0; k < preArray.length; k++){
              automata_T[k] = preArray[k];
            }

            //Copiando los datos a la variable original
            automata.push(automata_T);
            automata_T = [];//Vaciando temporal
            
            } else {
              adv = `ERROR: "Direcciones" no cumple el formato establecido<br>`;
              insertarTerminal.innerHTML += adv;
            } 
          //}
          
          console.log("Automata final: ", automata);

        //} else {
        //  adv = `ERROR: El estado inicial: ${estado} no puede ser estado Aceptador... No se registrarán sus datos<br>`;
        //  insertarTerminal.innerHTML += adv;
        //}

        
      } else {
        adv = `ERROR: Ha ingresado un estado: ${estado} supera a la "Cantidad de nodos", recuerde que son: ${cantidadEstados}... No se registrarán sus datos<br>`;
        insertarTerminal.innerHTML += adv;
      }
    } else {
      adv = `<br>LOS DATOS NO PUDIERON SER AGREGADOS<br>`;
      insertarTerminal.innerHTML += adv;
      if (estado === ""){
        adv = `ERROR: El campo "Estado" esta vacío<br>`;
        insertarTerminal.innerHTML += adv;
      }
      if (direcciones === ""){
        adv = `ERROR: El campo "Direcciones" esta vacío<br>`;
        insertarTerminal.innerHTML += adv;
      }
    }
    //Si paso todos los errores
  }
  
}
/** -------------------------o---------------------------- **/
/* GENERAR LOG*/
var storage = new plog.storages.LocalStorage({ maxSize: 300 });
plog.useStorage(storage);

function archivo() {
  
  plog.info("ARCHIVO LOG");
  var aux = "";
  var events = storage.getEvents();
  for (var i = 0; i < events.length - 1; i++) {
    aux = aux + JSON.stringify(events[i]) + "\n";
  }

  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:events/plain;charset=utf-8," + encodeURIComponent(aux)
  );
  element.setAttribute("download", "log.txt");
  console.log(element);
  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

document.getElementById("download").addEventListener(
  "click",
  function() {

    archivo();
  },
  false
);

/* DATOS INGRESADOS... SE PROCEDE A EJECUTAR LA FUNCIÓN */
/** ------------------------------------------------- **/
let imprimio = 0;
window.onload = async ()=>{
  let botonEnviar = document.getElementById("enviar");
  let botonAgregar = document.getElementById("agregar");
  let botonFinalizaLlenado = document.getElementById("finalizar");
  let botonDescargar = document.getElementById("descargar");

  botonEnviar.addEventListener("click", function () {
    datosParIzq();
    //Si no completa izq y no cliquea en "enviar", no podrá ingresar datos de la parte der
    botonAgregar.addEventListener("click", function () {
      datosPartDer();
      //Una vez finalizado los datos podrá acceder a la función
      botonFinalizaLlenado.addEventListener("click", function () {
        if (imprimio === 0){
        //Mostrando simbología
        adv = `<br>----------------------------------<br>
        PASO 0: Simbología<br>
        ----------------------------------<br>`;
        insertarTerminal.innerHTML += adv;
        adv = `* : Se apunta a sí mismo<br>
        | : ó<br>Ø: Vacío<br>`;
        insertarTerminal.innerHTML += adv;
        //Mostrando datos del AFD ingresado
        //---------------------------------
        adv = `<br><br>----------------------------------<br>
        PASO 1: Mostrando datos ingresados<br>
        ----------------------------------<br>`;
        insertarTerminal.innerHTML += adv;

        for(let i = 0; i < automata.length; i++){
          for(let j = 1; j < valoresAu.length+1; j++){
            if (automata[i][j] === undefined){
              automata[i][j] = null;
            }
          }
        }
        //LOGS
//        Promise.resolve(automata)
//	      .then(pLog()) // Logs `unicorn`
//	      .then(value => {
//		    // `value` is still `unicorn`
//        console.log("Reemplazar 'null' en campos vacios");
//	      });
        //Fin LOGS

        for (let i = 0; i < valoresAu.length; i++){
          //Forma de impresion
          //| estado | a | b |
          //------------------
          //|    A   | C | B |
          //------------------
          //|    B   | Ø | B |
          if (i === 0){
            adv = `|estado | `;
          }
          adv += `${valoresAu[i]} |`;
        }
        adv += `<br>`;
        insertarTerminal.innerHTML += adv;

        for (let u = 0; u < automata.length; u++){
          for (let v = 0; v < valoresAu.length+1; v++){
            if (automata[u][v] !== null){
            adv = `  ${automata[u][v]}`;// estado -> a -> b
            insertarTerminal.innerHTML += adv;
            } else {
              adv = `  Ø`;// estado -> a -> b
              insertarTerminal.innerHTML += adv;
            }
          }
          adv = `<br>`;
          insertarTerminal.innerHTML += adv;
        }
        adv += `<br><br>`;
        insertarTerminal.innerHTML += adv;
        //---------------------------------
        //Fin impresion

        //LOGS
//        Promise.resolve(automata.length != 0 && estadosAu.length != 0 && valoresAu.length != 0)
//	      .then(pLog()) // Logs `unicorn`
//	      .then(value => {
//		    // `value` is still `unicorn`
        plog.info("Campos terminados para usarlos en la función afdToEr ?"+(automata.length !== 0 && estadosAu.length !== 0 && valoresAu.length !== 0));
        console.log("Campos terminados para usarlos en la función afdToEr ?", automata.length !== 0 && estadosAu.length !== 0 && valoresAu.length !== 0);
//	      });
        //Fin LOGS


        //Imprimo = 1 ***** finalizar aqui?
        imprimio = 1;
        //Transformar la tabla a las necesidades
        /*
        const dfa = new DFA2(
          new Set(['a', 'b']),             // Input alphabet
          ['q0', 'q1', 'q2'],                    // Set of states
          'q0',                              // Initial state
          [                                // Transitions
            new Transition('q0', 'a', 'q1'),
            new Transition('q0', 'b', 'q2'),
            new Transition('q1', 'a', 'q1'),
            new Transition('q1', 'b', 'q1'),
            new Transition('q2', 'a', 'q0'),
            new Transition('q2', 'b', 'q2'),
          ],
          ['q1', 'q2']                             // Set of final states
        );
        */
        
        //Estado inicial
        let aux1 = "";
        //estadoInicial = B
        let indice;
        for (let u = 0; u < estadosAu.length; u++){
          if (estadoInicial === estadosAu[u]){
            indice = u;
          }
        }
        aux1 = 'q'+indice;
        estadoInicial = aux1.toString();
        console.log("estados inicial: ", aux1);
        //

        //Transformación de estados
        //[A,   B,  C]
        //[q0, q1, q2]
        let estadosAu2 = [];
        aux1 = "";
        for (let u = 0; u < estadosAu.length; u++){
          aux1 = 'q'+u;
          estadosAu2.push(aux1.toString());
        }
        console.log("estadosAu: ", estadosAu2);
        //

        //Transformación de final
        let estadoFinal2 = []; //estadosAceptadores
        aux1 = "";
        // q0 q1 q2 q3
        //[A, B, C, D] L4 
        // 0  1  2  3
        //   [B, C, D] L3
        //    0  1  2
        console.log("Estados au largo: ", estadosAu.length);
        console.log("Estados au: ", estadosAu);
        for (let u = 0; u < estadosAu.length; u++){
          console.log("Largo de aceptador: ", estadosAceptadores.length);
          for (let o = 0; o < estadosAceptadores.length; o++){
            console.log("Es acep: ", estadosAceptadores[o]);
            console.log("est: ", estadosAu[u] );
            console.log("Es vdd? ", estadosAceptadores[o] === estadosAu[u]);
            if (estadosAceptadores[o] === estadosAu[u]){
              indice = u;
              aux1 = 'q'+indice;
              estadoFinal2.push(aux1.toString());
            }
          }
        }
        console.log("estados final: ", estadoFinal2);
        //
        
        let automata2 = [];
        //Transformación de tabla a arreglo
        //      e    a    b
        //      0    1    2
        // 0: ['A', 'B', 'C'];
        // 1: ['B', 'B', 'A'];
        //ó
        //   e    a    b    c
        // ['A', 'B', 'A', 'C'];
        //   q0   q1   q0   q2
        let origen, alf, destino;
        console.log("Estados au largo: ", automata.length);
        console.log("Estados au: ", automata);
        for (let u = 0; u < automata.length; u++){
          for(let i = 0; i < valoresAu.length; i++){ //[a,b]
            if (automata[u][i+1] !== null){
              origen = 'q' + u;//v
              alf = valoresAu[i];//v}
              console.log("des: ", automata[u][i+1]);
              for (let j = 0; j < estadosAu.length; j++){
                console.log("estado a comparar: ", estadosAu[j]);//A B C D
                if (automata[u][i+1] === estadosAu[j]){
                  destino = 'q'+j;
                  console.log("destino: ", destino);
                }
              }
              //destino = 'q' + estadosAu[u][i+1];//x 
              
              //Ingresando datos
              console.log("¿?: ", origen, " ", alf, " ", destino);
              automata2.push(new Transition( origen.toString(), alf.toString(), destino.toString() ) );
            }
          }
        }
        //

        const dfa = new DFA2(
          new Set(valoresAu),             // Input alphabet
          estadosAu2,                    // Set of states
          estadoInicial,                              // Initial state
          automata2                                // Transitions
          ,
          estadoFinal2                             // Set of final states
        );
        //

        //Llama y envía los datos a la función AFDtoER
        const item = new FSA(dfa.sigma, dfa.states, dfa.initialState, dfa.transitions, dfa.finalStates);
        const regexString = item.toRegularExpression().toString();
        console.log(regexString);
        adv = `<br>Tener en cuenta:<br>
        "A" corresponde a: "q0"<br>"B" corresponde a: "q1"<br>(...) así sucesivamente...<br><br>AFD a ER es: ${regexString}<br><br>`;
        insertarTerminal.innerHTML += adv;
        //afdToEr(automata, estadosAu, valoresAu, insertarTerminal);
        //console.log(insertarTerminal);
        imprimio = 1;
      }
      });
    });
  });

   botonDescargar.addEventListener("click", function () {
    archivo();
  });
};
/** -----------------------o------------------------ **/