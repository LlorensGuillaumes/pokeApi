
import { pokemons } from "./publicFunctions.js";
import { llenarArrayPokemons } from "./publicFunctions.js";
import { generarCartas } from "./publicFunctions.js";
import { fncSeleccionarFamilia } from "./publicFunctions.js";
llenarArrayPokemons() //lleno el array con el fetch

let botonMas = document.querySelector('#butMas')
let botonMenos = document.querySelector('#butMenos')
let coleccionInput = document.querySelectorAll('#coleccionInput')
let imagenInput = document.querySelector('#imagenInput')
let btnEmpezarJugar = document.querySelector('#btnEmpezarJugar')
let conImagen = document.getElementById("imagenInput") //.checked; // devuelve (true o false) según esté marcado o no

//Esta funcion, se ejecutará cuando se seleccione una etiqueta familia FUNCIONA


//Esta funcion, se ejecutará cuando se clike sobre una carta, para asignar familia FUNCIONA


//pulsar boton MAS --> FUNCIONA
function fnButMas() {
  let dondeSumo = document.getElementById("numCantidad");
  let valorDondeSumo = parseInt(dondeSumo.textContent);

  if (valorDondeSumo === 600){
    let boton = document.getElementById('butMenos')
    boton.disabled = true
  }
  if (valorDondeSumo < 600) {
    let nuevaSuma = valorDondeSumo + 64;
    dondeSumo.textContent = nuevaSuma;
  }

  //generarCartas(arrPokemons);
  calcularNivel();
}

//pulsar boton MENOS -->FUNCIONA
function fnButMenos() {
  let dondeResto = document.getElementById("numCantidad");
  let valorDondeResto = parseInt(dondeResto.textContent);

  if (valorDondeResto === 24){
    let boton = document.getElementById('butMas')
    boton.disabled = true
  }

  if (valorDondeResto > 24) {
    let nuevaResta = valorDondeResto - 64;
    dondeResto.textContent = nuevaResta;
  }

  calcularNivel();
}



function btnComprobarResultado(pista) {
  let contadorAcertados = 0;
  let contadorFallados = 0;
  let cartaComprobar = document.getElementsByClassName("divCard");
  let contenedor = document.getElementById("textoInstrucciones");
  let marcador = document.getElementById("puntos");
  let contador = document.getElementById("indicadorNivel");
  let contadorTexto = document.getElementById("nivelJuegoEtiqueta");
  let contadorTextoBlanco = document.getElementById("nivelJuegoEtiqueta2");

  calcularNivel();

  let datosNivel = calcularNivel();
  let puntosPorCarta = datosNivel[0];
  let cartasJuego = datosNivel[1];

  for (i = 0; i < cartasJuego; i++) {
    let tipoCartaPokemon = cartaComprobar[i].childNodes[3].classList[1];
    //Aquí da el tipo real que es
    let tipoCartaPokemonAsignada = cartaComprobar[i].childNodes[3];
    let imagenCartaPokemonAsignada = tipoCartaPokemonAsignada.childNodes[3];

    //if (imagenCartaPokemonAsignada) {

    if (imagenCartaPokemonAsignada.classList.value === tipoCartaPokemon) {
      contadorAcertados++;
    } else {
      if (pista === "pintar") {
        console.log("entra");
        imagenCartaPokemonAsignada.parentNode.classList.add("red");
      }
      contadorFallados++;
    }
  }

  let puntosPosibles = cartasJuego * puntosPorCarta;
  let valorResultado = puntosPorCarta * contadorAcertados;

  if (pista === "pintar") {
    for (let i = 1; i <= numIntentos; i++) {
      valorResultado = valorResultado * 0.9;
    }
  }

  contador.textContent = valorResultado;
  contadorTexto.textContent = "SCORE";
  contadorTextoBlanco.textContent = "de: " + puntosPosibles + " posibles";

  marcador.textContent = "";

  if (valorResultado === puntosPosibles) {
    return true;
  } else {
    return false;
  }
}

//calcular NIVEL --> FUNCIONA
function calcularNivel() {
  let cantidadMostrar = document.getElementById("numCantidad").textContent; // devuelve cantidad a mostar
  let coleccion = document.getElementById("coleccionInput").checked; // devuelve True(los primeros) y False(todos)
  let conImagen = document.getElementById("imagenInput").checked; // devuelve (true o false) según esté marcado o no
  cantidadMostrar = parseInt(cantidadMostrar); //lo paso a integer
  let nivel = 0;
  let puntosCarta = 0;
  
  if (cantidadMostrar == 24) {
    nivel = 1;
    puntosCarta = 5;
  } else if (cantidadMostrar > 24 && cantidadMostrar <= 88) {
    nivel = 2;
    puntosCarta = 7;
  } else if (cantidadMostrar > 88 && cantidadMostrar <= 152) {
    nivel = 3;
    puntosCarta = 9;
  } else if (cantidadMostrar > 152 && cantidadMostrar <= 216) {
    nivel = 4;
    puntosCarta = 11;
  } else if (cantidadMostrar > 216 && cantidadMostrar <= 280) {
    nivel = 5;
    puntosCarta = 13;
  } else if (cantidadMostrar > 280 && cantidadMostrar <= 344) {
    nivel = 6;
    puntosCarta = 15;
  } else if (cantidadMostrar > 344 && cantidadMostrar <= 408) {
    nivel = 7;
    puntosCarta = 17;
  } else if (cantidadMostrar > 408 && cantidadMostrar <= 472) {
    nivel = 8;
    puntosCarta = 19;
  } else if (cantidadMostrar > 472 && cantidadMostrar <= 536) {
    nivel = 9;
    puntosCarta = 21;
  } else {
    nivel = 10;
    puntosCarta = 23;
  }

  if (!coleccion) {
    puntosCarta += 5;
  }
 
  if (conImagen) {
    puntosCarta += 15;
  }

  let totalPuntosCarta = puntosCarta * cantidadMostrar;
  let totalPuntosCarta100 = 0;
  totalPuntosCarta100 = totalPuntosCarta * 100;

  let miNivel = 0;
  miNivel = totalPuntosCarta100 / 25800;

  let mostrarNivel = document.getElementById("indicadorNivel");
  mostrarNivel.textContent = Math.round(miNivel);

  mostrarTablero(cantidadMostrar, coleccion, conImagen)

  return [puntosCarta, cantidadMostrar];
}

// boton JUGAR / COMPROBAR RESULTADO /  PISTA -->
function opcionesBoton() {
  let esteBoton = document.getElementById("btnEmpezarJugar");
  let texto = esteBoton.textContent.trim();

  if (texto === "JUGAR") {
    fnJugar();
    esteBoton.textContent = "COMPROBAR RESULTADO";
  } else if (texto === "COMPROBAR RESULTADO") {
    if (btnComprobarResultado()) {
      esteBoton.textContent = "JUGAR";
    } else {
      esteBoton.textContent = "DAME UNA PISTA";
    }
  } else if (texto === "DAME UNA PISTA") {
    numIntentos++;
    btnComprobarResultado("pintar");
    esteBoton.textContent = "COMPROBAR RESULTADO";
  } else {
    console.log("error");
  }
}

function mostrarTablero(numMostrar, coleccion, conImagen){
pokemonsMostrar = [...pokemons]
let intCantidadMostrar = parseInt(numMostrar)
let mostrarImagen = Boolean

  if (coleccion) {
    //Solo los primeros de la lista de Pokemons
    pokemonsMostrar.splice(intCantidadMostrar)
    pokemonsMostrar =[...aleatorizarArray(pokemonsMostrar)]
    
  } else {  //entre todas las cartas
    
    pokemonsMostrar =[...aleatorizarArray(pokemonsMostrar)]
    let inicio = numeroAleatorio (0, pokemons.length - intCantidadMostrar)
    pokemonsMostrar = pokemonsMostrar.slice(inicio, intCantidadMostrar)

  }

  if (conImagen){    //vienen sin imagen
    mostrarImagen = false
  }else{
    mostrarImagen = true
  }

    generarCartas(pokemonsMostrar, mostrarImagen)

}
//boton JUGAR
let pokemonsMostrar = []

function fnJugar() {
        
  let boton = document.getElementById('butMas')
  if (!boton.disabled){
    fnButMas()
  }
  let tiposActuales = document.querySelectorAll('.caracteristicas')
  let cargando = document.getElementById('barraCargar')
      
  let tiposActivos = []
  let cantidadTotal = tiposActivos.length
  for (const tipo of tiposActuales) {
    
    let classes = tipo.className.split(' ')
    for (const classe of classes) {
     
          if((!tiposActivos.includes(classe)) &&(classe !== 'caracteristicas')){
              tiposActivos.push(classe)
          } 
    }
  }

  let rbListTipesContainer = document.querySelector("#tipes");  
  
  for (const tipoActivo of tiposActivos) {

    let imagenTipoPokemon = document.createElement("img");

        let stringImagen = "./img/" + tipoActivo + ".png";
        let stringId = "imgTipoPokemon" + tipoActivo;

        imagenTipoPokemon.setAttribute("src", stringImagen);
        imagenTipoPokemon.setAttribute("class", "clTipoImagen");
        imagenTipoPokemon.setAttribute("id", stringId);
        imagenTipoPokemon.addEventListener('click', fncSeleccionarFamilia)
        rbListTipesContainer.appendChild(imagenTipoPokemon);
  }            

  let opciones = document.getElementById("tipes");
      opciones.classList.remove("noSee");

  let grupoCaracteristicas = document.getElementsByClassName("miCaracteristica");
  for (const elemento of grupoCaracteristicas) {
    elemento.classList.add("noSee");
  }

}

function aleatorizarArray(arr) {
  
  let arrAleatorio =[]

  for (let i = 0; i < arr.length; i++){
    const posicionAleatoria = Math.floor(Math.random()*arr.length);
    arrAleatorio.push(arr[posicionAleatoria])
    arr.splice(posicionAleatoria, 1)
    i--
  }
  return arrAleatorio
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function par(num) {
  let resultado = num % 2;

  if (resultado === 0) {
    return true;
  } else {
    return false;
  }
}



function alCargar() {
  let opciones = document.getElementById("tipes");
  opciones.classList.add("noSee");
}

function fnImagen(){
  
  if (imagenInput.checked){
    calcularNivel(false)
  }else{
    calcularNivel(true)
  }  
 
}

botonMas.addEventListener('click', fnButMenos)
botonMenos.addEventListener('click', fnButMas)
for (const item of coleccionInput) {
  item.addEventListener('change', calcularNivel)
}

conImagen.addEventListener('change', fnImagen())

imagenInput.addEventListener('click', fnImagen)
btnEmpezarJugar.addEventListener('click', opcionesBoton)

onload = alCargar();
