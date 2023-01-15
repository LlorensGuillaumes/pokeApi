export var pokemons = []   //array con todos los Pokémon y características
var numIntentos = 0;    //Numero de intentos en el juego




let containerPokemons = document.createElement("div");
    containerPokemons.classList.add("album");
let divBarraProgreso = document.getElementById('barraProgreso')
let barraProgreso = document.querySelector('meter')

export const llenarArrayPokemons = async () => {
    //for (let i = 1; i < 10; i++) {
    for (let i = 1; i < 601; i++) {

        const result = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
        const pokemon = await result.json();
        pokemons.push(pokemon);
        let porcentajeBarra = (100*i)/601
        barraProgreso.value = porcentajeBarra
        if (porcentajeBarra === 100){
          
        }
       
    }

      divBarraProgreso.classList.add('noSee')
      //aqui el array está completo
      generarCartas(pokemons)

}

export let generarCartas = (misPokemon, conImagen=true) => {   //Si conImagen es true(muestra imagenes) si el false NO 
    containerPokemons.innerHTML=""
    let pokeTipos = [];

    for (const miPokemon of misPokemon) {
      let id = miPokemon.id;
      let name = miPokemon.name;
      let heightPokemon = miPokemon.height;
      let peso = miPokemon.weight;
      let imagen = miPokemon.sprites.front_default;
      let types = miPokemon.types;                                           
      let divCard = document.createElement("div");
        divCard.classList.add("divCard");
        divCard.setAttribute("id", id);
        divCard.addEventListener('click', imgClick )

      let divCaracteristicas = document.createElement("div");
        divCaracteristicas.classList.add("caracteristicas");
        //Controlo una exepción dentro de los primeros 600 Pokémon para evitar un nombre excesivamente largo
        //que sucede en el id (555), modificando su nombre de 'darmanitan-starndard' a 'darmanitan-std
        //para que quepa todo en una sola línea y no modifique el formato de la carta

        if (id===555){
          name = 'darmanitan-std'
        }
      
      let espType 
            for (const type of types) {
              
              //traduzco los tipos a español
              espType = traducirTipo(type.type.name);
              divCaracteristicas.classList.add(espType);

                        
              if (pokeTipos.indexOf(espType) == -1) {
                pokeTipos.push(espType);
     
              }
            }
      let pokeId = document.createElement("h3");
        pokeId.classList.add("numCarta");
        pokeId.textContent = id;

      let pokeName = document.createElement("h2");
        pokeName.textContent = name;

      let pokeHeight = document.createElement("p");
        pokeHeight.textContent = "Altura: " + heightPokemon/10 + " m";

      let pokeWeight = document.createElement("p");
        pokeWeight.textContent = "Peso: " + peso/10 + " Kg";

      let pokeTipe = document.createElement("p");
        pokeTipe.textContent = "Tipo: " + espType;
        pokeTipe.classList.add("miCaracteristica");

      let contenedorImagen = document.createElement('div')
            contenedorImagen.setAttribute('id','contenedorImagen')
      let pokeImg = document.createElement("img");
        pokeImg.classList.add("imagenes");
        pokeImg.setAttribute("id", "pokeFoto");

            if (conImagen){
            pokeImg.setAttribute("src", imagen);
            } else{
            pokeImg.setAttribute('src', './img/PokeBall.png')
            }
      contenedorImagen.appendChild(pokeImg)
      divCaracteristicas.appendChild(pokeHeight);
      divCaracteristicas.appendChild(pokeWeight);
      divCaracteristicas.appendChild(pokeTipe);
      divCard.appendChild(pokeId);
      divCard.appendChild(pokeName);



      divCard.appendChild(contenedorImagen);



      divCard.appendChild(divCaracteristicas);

      containerPokemons.appendChild(divCard);    
      let divJugar = document.getElementById("jugar");
      divJugar.appendChild(containerPokemons);
    };
   
    let botonJugar = document.getElementById("btnEmpezarJugar")
    botonJugar.disabled = false
    }

    function traducirTipo(tipo) {
        // console.log(tipo)
        switch (tipo) {
          case "grass":
            return "Planta";
            break;
      
          case "bug":
            return "Bicho";
            break;
      
          case "electric":
            return "Electrico";
            break;
      
          case "fighting":
            return "Lucha";
            break;
      
          case "ghost":
            return "Fantasma";
            break;
      
          case "fire":
            return "Fuego";
            break;
      
          case "normal":
            return "Normal";
            break;
      
          case "ground":
            return "Tierra";
            break;
      
          case "psychic":
            return "Psiquico";
            break;
      
          case "ice":
            return "Hielo";
            break;
      
          case "water":
            return "Agua";
            break;
      
          case "poison":
            return "Veneno";
            break;
      
          case "fairy":
            return "Hada";
            break;
      
          case "rock":
            return "Roca";
            break;
      
          case "dragon":
            return "Dragon";
            break;
      
          case "steel":
            return "Acero";
            break;
      
          case "dark":
            return "Siniestro";
            break;
      
          case "flying":
            return "Volador";
            break;
      
          default:
            return tipo;
        }
      }


export function fncSeleccionarFamilia() {
  let todosLosTipos = document.getElementsByClassName("clTipoImagen");

  for (let i = 0; i < todosLosTipos.length; i++) {
    if (todosLosTipos[i].classList.contains("zoom")) {
      todosLosTipos[i].classList.remove("zoom");
    }
  }

  let idFamiliaSeccionada = event.currentTarget.id;

  let familiaSelecionada = document.getElementById(idFamiliaSeccionada);
  familiaSelecionada.classList.add("zoom");
}

let imgClick = function () {
  let targetaActual = event.currentTarget;
  let pokemonId = targetaActual.id;
  let cartaSeleccionada = document.getElementById(pokemonId);

  if (targetaActual.classList[1] == "seleccionada") {
    let antiguaTargetaAsignada = targetaActual.lastElementChild;
    antiguaTargetaAsignada.lastElementChild.remove();
  }

  let imagenTipo = document.createElement("img");
  imagenTipo.setAttribute("id", "imagenTipo");
  imagenTipo.setAttribute("class", "imagenTipo");

  let tipoSeleccionado = document.getElementsByClassName("zoom");
  if (tipoSeleccionado) {
    let idTipoSeleccionado = tipoSeleccionado[0].id;
    let nombreImagen = idTipoSeleccionado.substring(14);
    imagenTipo.setAttribute("class", nombreImagen);
    let rutaImagen = "./img/" + nombreImagen + ".png";

    imagenTipo.setAttribute("src", rutaImagen);
    let cartaSeleccionadaCaracteristicas = cartaSeleccionada.childNodes[3]
        cartaSeleccionadaCaracteristicas.childNodes[0].classList.add('noSee')
        cartaSeleccionadaCaracteristicas.childNodes[1].classList.add('noSee')
    

    cartaSeleccionada.childNodes[3].appendChild(imagenTipo);
    event.currentTarget.classList.add("seleccionada");
  } else {
    alert("Debes seleccionar un tipo");
  }
};