const API_KEY = '235f18c6dedac9eb6cd3020b665313ec';
const BASE_URL = 'https://api.themoviedb.org/3';

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

const actorsName = JSON.parse(localStorage.getItem('actorNames'));
const actorsImage = JSON.parse(localStorage.getItem('actorImages'));

async function render_actors(){

    const actorsEl = document.getElementById("actors");

    if (actorsName.length > 0 && actorsImage.length > 0) {
        for (let i = 0; i < 5; i++) {
            const actorEl = document.createElement("div");
            actorEl.className = "actor";

            const actorImg = document.createElement("img");
            actorImg.src = actorsImage[i] || "https://via.placeholder.com/150";
            actorImg.alt = actorsName[i];
            actorImg.className = "photo_actor"

            const actorNameEl = document.createElement("div");
            actorNameEl.textContent = actorsName[i];
            actorNameEl.className="name_actor"

            actorEl.appendChild(actorImg);
            actorEl.appendChild(actorNameEl);
            actorsEl.appendChild(actorEl);
        }
    } else {
        actorsContainer.innerHTML = "<p>Aucun acteur trouvé.</p>";
    }
}

render_actors();