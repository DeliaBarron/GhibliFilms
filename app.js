
let GhibliFilmOG=[]
let directors=[]


function GhibliCardsFilms(GhibliFilms) {
    document.getElementById('cardsDisplay').innerHTML=''


    GhibliFilms.forEach(GhibliFilm => {
        // console.log(GhibliFilm)
        
        let carddiv = document.createElement('div')
        carddiv.classList.add("col-auto", "card", "my-3", "mx-3")
        carddiv.style.width = "13rem";

        let cardImage = document.createElement('img')
        cardImage.classList.add("card-img-top", "border", "border-warning", "border-3")
        cardImage.setAttribute('src', GhibliFilm.image);
        carddiv.append(cardImage)

        let cardTitle = document.createElement('h4')
        cardTitle.classList.add("card-title")
        cardTitle.innerHTML = '<b>Título: </b>' + GhibliFilm.title
        carddiv.append(cardTitle)


        let cardInfo = document.createElement('ul')
        cardInfo.classList.add("list-group", "list-group-flush")
        carddiv.append(cardInfo)

        let cardDirector = document.createElement('li')
        cardDirector.classList.add("list-group-item")
        cardDirector.innerHTML = '<b>Director: </b>' + GhibliFilm.director;
        cardInfo.append(cardDirector)

        let cardDate = document.createElement('li')
        cardDate.classList.add("list-group-item")
        cardDate.innerHTML = '<b>Lanzamiento: </b>' + GhibliFilm.release_date;
        cardInfo.append(cardDate)

        let cardRT = document.createElement('li')
        cardRT.classList.add("list-group-item",)
        cardRT.innerHTML = '<b>RT Puntaje: </b>' + GhibliFilm.rt_score;
        cardInfo.append(cardRT)

        let cardTime = document.createElement('li')
        cardTime.classList.add("list-group-item")
        cardTime.innerHTML = '<b>Duración: </b>' + GhibliFilm.running_time;
        cardInfo.append(cardTime)

        document.getElementById("cardsDisplay").append(carddiv)

        
        


    })

}

function DirectorsArr (GhibliFilmOG){
    GhibliFilmOG.forEach(film => {
        directors.indexOf(film.director)=== -1 &&
        directors.push(film.director)
        // console.log(film.director)
        
    });

console.log(directors)
}

document.getElementById('btnDirector').addEventListener("click", function(evt){
    DirectorsArr(GhibliFilmOG)
    document.getElementById('dropdown-menu').innerHTML=''
    directors.forEach(directorEl => {
        let ddwn1= document.createElement('li')
        ddwn1.classList.add("dropdown-item")
        ddwn1.setAttribute('data-director',directorEl)
        ddwn1.innerHTML=''+directorEl
        document.getElementById('dropdown-menu').append(ddwn1)
    });
})

document.getElementById('dropdown-menu').addEventListener('click',function(evt){
    
    var liText=evt.target.textContent
    console.log(liText)
    console.log(evt.target.getAttribute('data-director'))  
    directorCardsArr=[];    
    GhibliFilmOG.forEach(GhibliFilm=>{
        if(GhibliFilm.director.toLowerCase().includes(liText.toLowerCase())){
            directorCardsArr.push(GhibliFilm)
        }
    });GhibliCardsFilms(directorCardsArr);

})

         //Funcion del 'Input Buscar'///

    document.getElementById('buscar').addEventListener('keyup', function (evt) {
        //    /* var input=document.getElementById('buscar').value;    esto es otra forma de hacer  */console.log(evt.target.value)
        //   console.log(evt.target.value)                                          
        searchOutput = [];
        if (evt.target.value.length >= 3) {

            GhibliFilmOG.forEach(GhibliFilm => {
                if (GhibliFilm.title.toLowerCase().includes(evt.target.value.toLowerCase()) || GhibliFilm.director.toLowerCase().includes(evt.target.value.toLowerCase())) {
                    searchOutput.push(GhibliFilm)
                }
                
            });


            GhibliCardsFilms(searchOutput);
            // console.log(searchOutput)
        }else {
            // GhibliFilms=GhibliFilmOG
            GhibliCardsFilms(GhibliFilmOG);
        }
    })

    ///Funcion del Btn Score

    document.getElementById('btn-score').addEventListener('click', function(evt){
        
        // console.log(GhibliFilms)
       function ScoreOrder (a,b){
           return Number(a.rt_score)>Number(b.rt_score) ? 1: -1;
       }
       GhibliFilmOG.sort(ScoreOrder)
       console.log(GhibliFilmOG)
       GhibliCardsFilms(GhibliFilmOG)

    })


    /////Orden btn AZ/////
    document.getElementById('btn-AZ').addEventListener('click', function(evt){
        function AZOrder(a,b){
            if(a.title<b.title){return -1}
            if(a.title>b.title){return 1}
            return 0;   
        }
        GhibliFilmOG.sort(AZOrder)
        console.log(GhibliFilmOG)
        GhibliCardsFilms(GhibliFilmOG)
    })

    

            










//                 <!-- <div class="card-body">
//               <p class="card-text">Descripción:...EN FORMA DE POP UP"</p>
//             </div> -->
//             </div>


fetch("https://ghibliapi.herokuapp.com/films")
    .then(response => response.json())
    .then(GhibliFilms => {
        GhibliFilmOG=GhibliFilms
        GhibliCardsFilms(GhibliFilms)

    })


