const API_KEY = '235f18c6dedac9eb6cd3020b665313ec';
const BASE_URL = 'https://api.themoviedb.org/3';

const actorId = localStorage.getItem('actorId');

const actor = fetchActor(actorId);

const name = actor?.name || "Nom inconnu";
const birthday = actor?.birthday || "Date de naissance inconne"
const deathday = actor?.deathday || "";
const image = actor.profile_path
? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
: "https://picsum.photos/300/450";

async function render_details(){

    const detailEl = document.getElementById("details");

    const nameEl = document.createElement("h1");
    nameEl.textContent = name;
    detailEl.appendChild(nameEl);
    nameEl.className = 'title'

    const datesEl = document.createElement("label");
    datesEl.textContent = birthday + (deathday === "" ? "" : ` - ${deathday}`);
    detailEl.appendChild(datesEl);
    datesEl.className = 'dates_title';

    const imageEl = document.createElement("img");
    imageEl.src = image;
    imageEl.className = 'actor_image';
    detailEl.appendChild(imageEl);
}

render_details();

async function fetchActor(person_id){
    fetch(BASE_URL + `/person/${person_id}?language=fr-fr`)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
}