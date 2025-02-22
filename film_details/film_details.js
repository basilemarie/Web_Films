const API_KEY = '235f18c6dedac9eb6cd3020b665313ec';
const BASE_URL = 'https://api.themoviedb.org/3';

const film = JSON.parse(localStorage.getItem('selectedFilm'));

const title = film?.title || "Titre inconnu";
const description = film?.overview || "Aucune description disponible.";
const image = film?.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : "https://picsum.photos/300/450";
const note = film?.vote_average ? `${film.vote_average.toFixed(1)}` : "N/A";

console.log(film);


const actorsName = JSON.parse(localStorage.getItem('actorNames'));
const actorsImage = JSON.parse(localStorage.getItem('actorImages'));

async function render_details(){

    const detailEl = document.getElementById("details");

    const imageEl = document.createElement("img");
    imageEl.src = image;
    imageEl.className = 'movie_image';
    detailEl.appendChild(imageEl);

    const nameEl = document.createElement("div");
    nameEl.textContent = title;
    detailEl.appendChild(nameEl);
    nameEl.className = 'title'

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