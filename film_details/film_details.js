const API_KEY = '235f18c6dedac9eb6cd3020b665313ec';
const BASE_URL = 'https://api.themoviedb.org/3';
const MAX_ACTORS = 5;

const film = JSON.parse(localStorage.getItem('selectedFilm'));

const title = film?.title || "Titre inconnu";
const description = film?.overview || "Aucune description disponible.";
const image = film?.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : "https://picsum.photos/300/450";
const note = film?.vote_average ? `${film.vote_average.toFixed(1)}` : "N/A";

async function render_details(){

    const detailEl = document.getElementById("details");

    const nameEl = document.createElement("h1");
    nameEl.textContent = title;
    detailEl.appendChild(nameEl);
    nameEl.className = 'title'

    const imageEl = document.createElement("img");
    imageEl.src = image;
    imageEl.className = 'movie_image';
    detailEl.appendChild(imageEl);

    const noteEl = document.createElement("div");
    noteEl.textContent = `⭐ Note : ${note} / 10`;
    detailEl.appendChild(noteEl);
    noteEl.className = 'note'

    const descriptionEl = document.createElement("div");
    descriptionEl.textContent = description;
    detailEl.appendChild(descriptionEl);
    descriptionEl.className = 'description'
    
}

render_details();


async function fetch_actors(film) {
    const url_actors = `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${API_KEY}`;
    actorsArray = [];
    const response = await fetch(url_actors);
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des acteurs");
    }

    const actors_resp = await response.json()
    actors = actors_resp.cast;
    
    if(actors.length > MAX_ACTORS){
        actors = actors.slice(0, MAX_ACTORS);
    }

    for (let actor of actors) {
        acteurMap = {
            'name' : actor.name,
            'imageURL' : actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : "../assets/unknown.png",
            'id' : actor.id,
            'role': actor.character /*On peut ajouter des éléments à afficher*/
        };
        actorsArray.push(acteurMap);
    }
    console.log(actorsArray);
    return actorsArray;
    
}


async function render_actors(){
    const actorsArray = await fetch_actors(film);
    
    const actorsEl = document.getElementById("actors");

    if (actorsArray.length > 0) {
        for (let i = 0; i < MAX_ACTORS && i < actorsArray.length; i++) {
            const actorEl = document.createElement("div");
            actorEl.className = "actor";

            const actorImg = document.createElement("img");
            actorImg.src = actorsArray[i]["imageURL"];
            actorImg.alt = actorsArray[i]["name"];
            actorImg.className = "photo_actor"

            const actorNameEl = document.createElement("div");
            actorNameEl.textContent = actorsArray[i]['name'];
            actorNameEl.className="name_actor"

            const roleNameEl = document.createElement("div");
            roleNameEl.textContent = actorsArray[i]["role"] || "";
            roleNameEl.id="role_name"

            actorEl.appendChild(actorImg);
            actorEl.appendChild(actorNameEl);
            actorEl.appendChild(roleNameEl);
            actorsEl.appendChild(actorEl);

            actorEl.addEventListener("click", function () {
                
                localStorage.setItem('actorId', actorsArray[i]["id"]);
                window.location.href = '../actors_detail/actors_detail.html';
                
            })
        }
    } else {
        actorsContainer.innerHTML = "<p>Aucun acteur trouvé.</p>";
    }
}

render_actors();