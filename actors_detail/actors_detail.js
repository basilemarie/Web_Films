const API_KEY = '235f18c6dedac9eb6cd3020b665313ec';
const BASE_URL = 'https://api.themoviedb.org/3';

const actorId = localStorage.getItem('actorId');

const actor = fetchActor(actorId);

const name = actor?.name || "Nom inconnu";
const birthday = actor?.birthday || "Date de naissance inconne"
const deathday = actor?.deathday || "";
const image = actor.profile_path
? `https://image.tmdb.org/t/p/w500${actor.profile_path}/credits?api_key=${API_KEY}`
: "../assets/unknown.png";

async function render_details(){

    const detailEl = document.getElementById("details");

    const nameEl = document.getElementById("title");
    nameEl.textContent = name;

    const datesEl = document.getElementById("dates_title");
    datesEl.textContent = birthday + (deathday === "" ? "" : ` - ${deathday}`);
    
    const imageEl = document.getElementById("actor_frame");
    imageEl.src = image;
}

render_details();

async function fetchActor(person_id){
    fetch(BASE_URL + `/person/${person_id}/credits?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
}