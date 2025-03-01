const MAX_FETCHED_FILMS = 2;
const MAX_ACTORS = 5;

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

async function fetch_actors(film_id) {
    const url_actors = `https://api.themoviedb.org/3/movie/${film_id}/credits?api_key=${API_KEY}`;
    actors_name = [];
    actors_image = [];


    try {
        const response = await fetch(url_actors);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des acteurs");
        }

        const actors_resp = await response.json();
        const actors = actors_resp.cast;

        for (let actor of actors) {
            actors_name.push(actor.name);
            actors_image.push(actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : "https://picsum.photos/300/450" // Image par défaut si l'acteur n'a pas d'image
            );
        }

        localStorage.setItem('actorNames', JSON.stringify(actors_name));
        localStorage.setItem('actorImages', JSON.stringify(actors_image));

    } catch (error) {
        console.error("Erreur lors du fetch des acteurs :", error);
    }
}

async function renderFilm(image_path, title, note, id) {


    const base_El = document.createElement("div");
    document.getElementById("wrapper").appendChild(base_El);
    base_El.className = "film";


    const imageEl = document.createElement("img");
    imageEl.src = `https://image.tmdb.org/t/p/w500${image_path}`;
    imageEl.className = 'poster';

    imageEl.addEventListener("click", async function () {

        await fetch_actors(id);

        const reponse = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr`);
        const film = await reponse.json(); //on récupère le film depuis l'id

        localStorage.setItem('selectedFilm', JSON.stringify(film));

        window.location.href = '../film_details/film_details.html';
    })

    base_El.appendChild(imageEl);



    const nameEl = document.createElement("div");
    nameEl.textContent = title;
    base_El.appendChild(nameEl);
    nameEl.className = 'title'

    const noteEl = document.createElement("div");
    noteEl.textContent = note;
    base_El.appendChild(noteEl);
    noteEl.className = 'note'

    const filmIdEl = document.createElement("div");
    filmIdEl.textContent = id;
    filmIdEl.className = "id_film";
    filmIdEl.style.display = "none"; // Cacher l'élément
    base_El.appendChild(filmIdEl);

    const url_genre = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`;

    const genreEl = document.createElement("div");
    const response_genre = await fetch(url_genre);
    const data_genre = await response_genre.json();
    genreEl.textContent = data_genre.genres[0].name;
    genreEl.className = "genre";
    base_El.appendChild(genreEl);


}


async function renderFilms(films) {

    for (const film of films) {
        await renderFilm(film.poster_path, film.title, `⭐ Note : ${film.vote_average.toFixed(1)} / 10`, film.id);
    }
}

let initialFilms = [];


async function initialRender() {
    const films = await fetch_films();
    await renderFilms(films);
    await new Promise(resolve => setTimeout(resolve, 100));

    if (initialFilms.length === 0) {
        initialFilms = recupDisplayedFilms();
    }
    localStorage.setItem('films', JSON.stringify(films));
}

async function loadFilms() {
    const load_film = JSON.parse(localStorage.getItem('films'));
    await renderFilms(load_film);
    await new Promise(resolve => setTimeout(resolve, 100));

    if (initialFilms.length === 0) {
        initialFilms = recupDisplayedFilms();
    }
}

if (localStorage.getItem('films')) {
    loadFilms();
    console.log("localStorage")
} else {
    initialRender();
    console.log("initialrender")
}


function recupText() {
    let texte = document.getElementById("type_bar").value;
}

document.getElementById("type_bar").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        renderSearch();
    }
})

async function renderSearch() {
    let search = document.getElementById("type_bar").value;

    //on va venir delet tout les autres films pour n'afficher que le film qui nous intéresse 

    const wrapper = document.getElementById("wrapper");
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }

    try {
        const reponse = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}&language=fr`);

        'https://api.themoviedb.org/3/search/movie?api_key=235f18c6dedac9eb6cd3020b665313ec&query=Incep&language=fr'

        if (!reponse.ok) { //ici on regarde ci le lien http est bon et nous emmène bien vers une page 
            console.warn(`Film avec le nom ${search} introuvable (404)`);
        }

        const data = await reponse.json();

        // Vérifie si on a bien des résultats
        if (data.results.length === 0) {
            console.warn(`Aucun film trouvé pour "${search}"`);
            return;
        }

        for (let i = 0; i <= data.results.length; i++) {


            const film = data.results[i];
            renderFilm(film.poster_path, film.title, `⭐ Note : ${film.vote_average.toFixed(1)} / 10`, film.id);

        }

    } catch (error) {
        console.error(`Erreur lors du fetch du film ${search} :`, error);
    }

}

//Section du choix du type de film

function recupSelect() {

    let checkboxes = document.querySelectorAll('.category:checked');
    let genres = [];

    checkboxes.forEach(checkbox => {
        genres.push(checkbox.value);
    });
    return genres;

}

function recupDisplayedFilms() {

    const displayed_Film = [];
    const film_div = document.querySelectorAll("#wrapper .film");

    film_div.forEach(filmDiv => {
        const title = filmDiv.querySelector(".title").textContent;
        const image = filmDiv.querySelector(".poster").src;
        const note = filmDiv.querySelector(".note").textContent;
        const genre = filmDiv.querySelector(".genre").textContent;
        const id = filmDiv.querySelector(".id_film").textContent;

        displayed_Film.push({ title, image, note, genre, id });
    })

    return (displayed_Film);
}

async function display_genres() {
    const display_film = recupDisplayedFilms();
    const genres = recupSelect();

    wrapper.innerHTML = '';

    for (let film of display_film) {
        if (genres.includes(film.genre)) {

            renderFilm(film.image, film.title, film.note, film.id);
        }
    }
}

async function render_initialFilms() {

    const checkboxes = document.querySelectorAll('.category');

    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    const wrapper = document.getElementById("wrapper");
    wrapper.innerHTML = '';

    for (let film of initialFilms) {
        renderFilm(film.image, film.title, film.note, film.id);
    }

}



