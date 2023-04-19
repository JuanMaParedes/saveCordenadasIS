const apiURL = "http://localhost:8080/api/coordenadas";

let newLatitud = document.getElementById("latitud");
let newLongitud = document.getElementById("longitud");
let newUsuario = document.getElementById("usuario");
let idForm = document.getElementById("idForm");
let datoP= document.createElement('p');

let usuarioP= document.createElement('p');
function clearForm() {
    idForm.reset();
    } 

function createObjetCoord() {
    let newCoord = {
    latitud: newLatitud.value,
    longitud: newLongitud.value,
    usuario: newUsuario.value,
    };
    return newCoord;
  }

async function postCoord(coord) {
    const response = await fetch(apiURL,{
        method: 'POST',
        body: JSON.stringify(coord),  
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response)=> response.json())
    .then((json)=> console.log(json));
   
    return response;

}

function btnCreate(){
    let newCoord= createObjetCoord();
    postCoord(newCoord).then(()=>{
          
    });      
    alert("Se ha guardado correctamente las coordenadas");    
    setTimeout(()=>{
        location.href="/index.html";
    },2000);
      
  }

async function getCoord() {
    const response = await fetch(apiURL);
    let data = await response.json();
    return data;
}

function mostarCoord(){
    let cardBody = document.createElement("div");
    let arrayCoord=[];
    let coord= getCoord();
    let elementoPadre= document.querySelector('.columna1');
    let elementoPadre2= document.querySelector('.columna2');
    coord.then((response) => {
        console.log(response);
        let todoD= "";
        let usuarios="";
        response.coord.forEach((coord) => {
            let selCoord= document.createElement("div");

            let rLatitud=coord.latitud;
            let rLongitud=coord.longitud
            selCoord.innerHTML= "<div class='hCoord' id='hCoord'><strong >Latitud: </strong>" + coord.latitud + "<strong> Longitud: </strong>" + coord.longitud + "</div>";
            selCoord.addEventListener("click", () => {
                buscarCord(coord.latitud, coord.longitud);
              }); 
            
            
            let usuario= "<div>" + coord.usuario + "</div>";
            usuarios= usuarios + usuario;
             setTimeout(()=>{
            
            elementoPadre.appendChild(selCoord);
            usuarioP.innerHTML= usuarios;
            elementoPadre2.appendChild(usuarioP); 
        },1000);
         
        });
    
    });
  }


function buscarCord(lat, long){
    newLatitud.value=lat;
    newLongitud.value=long;
    console.log(lat);
    
    
}


  mostarCoord();