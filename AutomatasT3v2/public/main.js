/* REFERENCIAS A OTRAS FUNCIONES */
/** -------------------------- **/
import { afdToEr } from './AFDtoER.js';
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

  console.log("Valores: ", valores);
  console.log("Valores Largo: ", valores.length);

  //Procediendo a validar si los datos corresponden
  if (auxu !== "" && aux > 0 && valores !== "") {
    //Válidando valores
    let expRepValoresCaso1 = /^([a-x](,){1,})/; //Debe ser: a,b,c...
    let expRepValoresCaso2 = /^([a-x]$)/; //Debe ser, simplemente: a
    if (valores.includes(',')){
      if (valores.length === 1){
        console.log("Pase las validaciones... 1");
        //Caso 2
        console.log("Linea 57: ", expRepValoresCaso2.test(valores) === true);
        if (expRepValoresCaso2.test(valores) === true){
          console.log("Pase las validaciones... 1.1");
          //Solo es una unidad, por lo tanto
          valoresAu = valores[0];
        } else {
          adv = `ERROR: "Valores" no se encuentra en formato pedido(1)<br>`;
          insertarTerminal.innerHTML += adv;
        }
      } else {
        console.log("Pase las validaciones... 2");
        //Caso 1
        console.log("Linea 69: ", expRepValoresCaso1.test(valores) === true);
        if (expRepValoresCaso1.test(valores) === true){//Si cumple con el formato pedido
          //Guardando valores
          console.log("Pase las validaciones... 2.1");
          let arr = valores.split(/\s*,+\s*/);//Ni espacios ni "," se tomarán en cuenta
          for (let i = 0; i < arr.length; i++) {
            valoresAu.push(arr[i]);//a luego b ...
            //valoresAu = [a,b,c...]
          }
          console.log("Valores guardados: ", valoresAu);
        } else {
          adv = `ERROR: "Valores" no se encuentra en formato pedido(2)<br>`;
          insertarTerminal.innerHTML += adv;
        }
      }
    } else {
      adv = `ERROR: "Valores" no se encuentra en formato pedido<br>`;
      insertarTerminal.innerHTML += adv;
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
}

//Recolectados los datos de la part1, se procederá a recolectar los de la part2 y su posterior validación
function datosPartDer(){
  //Recolectando información
  let estado = document.getElementById("estado").value;
  let direcciones = document.getElementById("direcciones").value;
  var estadoFinal = document.getElementById("final").value;// 0: Si | 1: No

  console.log("Estado: ", estado);
  console.log("Direccion: ", direcciones);
  console.log("Estados Finales: ", estadoFinal);

  //Variables auxiliares y de comprobacion
  let limiteDeEstados = 0, ultimo = valoresAu[valoresAu.length-1];
  let arregloAux,  temporal = [], arrOrganDirecciones = [];
  
  if (verificacionDatosUno === true){
    if (estado !== "" && direcciones !== ""){
      //Hacer una comprobación que "estado" debe ser [A-Z] en MAYUSCULAS
      if (limiteDeEstados <= cantidadEstados){
        if (estadoInicial !== estadoFinal){
          //Hacer comprobación de cumplir formato Direcciones [a-z][A-Z]"," (termina sin coma)
          //Válidando valores
          let expRepDireccionesCaso1 = /(^[a-z][A-Z](,)){1,}/;// Debe ser aB, bC
          let expRepDireccionesCaso2 = /(^[a-z][A-Z]$)/;//Debe ser aB
          //if (direcciones.includes(',')){
          if (expRepDireccionesCaso1.test(direcciones) === true || expRepDireccionesCaso2.test(direcciones) === true || direcciones === 'zZ'){
            console.log("Entre a comprobación...");
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
            console.log("Antes de rellenar con null... ", arrOrganDirecciones);
            for(let i = 0; i < valoresAu.length; i++){//a: B
              if(arrOrganDirecciones[i] === undefined){
                arrOrganDirecciones[i].push(null);
              }
            }
            console.log("Dirrecciones: ", arrOrganDirecciones);

            //Ingresando los datos del automata
            //Ingresa los estados
            estadosAu.push(estado);
            limiteDeEstados++;

            //Ingresa los estados finales
            if (estadoFinal === 0){
              estadosAceptadores.push(estado);
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
            console.log("PreArray: ", preArray);//0 1 2
            
            //Llenando automata T
            let automata_T = new Array (preArray.length).fill(null);
            console.log("AAAA: ", automata_T);

            console.log("pre array L: ", preArray.length);

            for (let k = 0; k < preArray.length; k++){
              console.log("PreArray[",k,"]: ", preArray[k]);
              automata_T[k] = preArray[k];
            }

            console.log("Agregando a: automata_t... ", automata_T);

            //Copiando los datos a la variable original
            automata.push(automata_T);
            automata_T = [];//Vaciando temporal
            
            } else {
              adv = `ERROR: "Direcciones" no cumple el formato establecido<br>`;
              insertarTerminal.innerHTML += adv;
            } 
          //}
          
          console.log("Automata final: ", automata);

        } else {
          adv = `ERROR: El estado inicial: ${estado} no puede ser estado Aceptador... No se registrarán sus datos<br>`;
          insertarTerminal.innerHTML += adv;
        }

        
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


/* DATOS INGRESADOS... SE PROCEDE A EJECUTAR LA FUNCIÓN */
/** ------------------------------------------------- **/
window.onload = async ()=>{
  let botonEnviar = document.getElementById("enviar");
  let botonAgregar = document.getElementById("agregar");
  let botonFinalizaLlenado = document.getElementById("finalizar");
  let imprimio = 0;

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

        console.log("a l: ", automata.length);
        for(let i = 0; i < automata.length; i++){
          for(let j = 1; j < valoresAu.length+1; j++){
            if (automata[i][j] === undefined){
              automata[i][j] = null;
            }
          }
        }
        console.log("a: ", automata);

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

        //Llama y envía los datos a la función AFDtoER
        afdToEr(automata, estadosAu, valoresAu, insertarTerminal);
        //console.log(insertarTerminal);
        imprimio = 1;
      }
      });
    });
  });
};
/** -----------------------o------------------------ **/