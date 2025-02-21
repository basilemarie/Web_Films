const MAX_FETCHED_FILMS = 2;

const API_KEY = '235f18c6dedac9eb6cd3020b665313ec';
const BASE_URL = 'https://api.themoviedb.org/3';

//We're going to return a list of film with the format jason in order to recover special data

async function fetch_films() {
    const films = [];
    for (let i = 0; i < MAX_FETCHED_FILMS; i++) {
        const randomId = Math.floor(Math.random() * 500) + 1;

        try {
            const reponse = await fetch(`${BASE_URL}/movie/${randomId}?api_key=${API_KEY}&language=fr`);

            if (!reponse.ok) { //ici on regarde ci le lien http est bon et nous emmène bien vers une page 
                console.warn(`Film avec ID ${randomId} introuvable (404)`);
                i--; // On décrémente pour récupérer un autre film à la place
                continue;
            }

            const film = await reponse.json();
            films.push(film); //si c'est bon alors on push dans la liste 

        } catch (error) {
            console.error(`Erreur lors du fetch du film ${randomId} :`, error);
        }

    }
    return films;
}

async function renderFilms(films) {

    for (const film of films) {
        const base_El = document.createElement("div");
        document.getElementById("wrapper").appendChild(base_El);
        base_El.className = "film";

        const imageEl = document.createElement("img");
        imageEl.src = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
        imageEl.className = 'poster'
        base_El.appendChild(imageEl);

        const nameEl = document.createElement("div");
        nameEl.textContent = film.title;
        base_El.appendChild(nameEl);

        const noteEl = document.createElement("div");
        noteEl.textContent = `⭐ Note : ${film.vote_average.toFixed(1)} / 10`;
        base_El.appendChild(noteEl);

    }

}

async function initialRender() {
    const films = await fetch_films();
    renderFilms(films);
}

initialRender();