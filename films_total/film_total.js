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


async function renderFilms(films) {

    for (const film of films) {
        const base_El = document.createElement("div");
        document.getElementById("wrapper").appendChild(base_El);
        base_El.className = "film";


        const imageEl = document.createElement("img");
        imageEl.src = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
        imageEl.className = 'poster'

        imageEl.addEventListener("click", async function () {
            localStorage.setItem('selectedFilm', JSON.stringify(film));
            window.location.href = '../film_details/film_details.html';
        })

        base_El.appendChild(imageEl);


        const nameEl = document.createElement("div");
        nameEl.textContent = film.title;
        base_El.appendChild(nameEl);
        nameEl.className = 'title'

        const noteEl = document.createElement("div");
        noteEl.textContent = `⭐ Note : ${film.vote_average.toFixed(1)} / 10`;
        base_El.appendChild(noteEl);
        noteEl.className = 'note'

    }

}

async function initialRender() {
    const films = await fetch_films();
    renderFilms(films);
}

initialRender();


function recupText() {
    let texte = document.getElementById("type_bar").value;
    console.log(texte);
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

        // Prend le premier film de la liste

        for (let i = 0; i < data.results.length; i++) {
            
            const film = data.results[i];

            const base_El = document.createElement("div");
            document.getElementById("wrapper").appendChild(base_El);
            base_El.className = "film";


            const imageEl = document.createElement("img");
            imageEl.src = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
            imageEl.className = 'poster'

            imageEl.addEventListener("click", async function () {
                localStorage.setItem('selectedFilm', JSON.stringify(film));
                window.location.href = '../film_details/film_details.html';
            })

            base_El.appendChild(imageEl);


            const nameEl = document.createElement("div");
            nameEl.textContent = film.title;
            base_El.appendChild(nameEl);
            nameEl.className = 'title'

            const noteEl = document.createElement("div");
            noteEl.textContent = `⭐ Note : ${film.vote_average.toFixed(1)} / 10`;
            base_El.appendChild(noteEl);
            noteEl.className = 'note'
        }


    } catch (error) {
        console.error(`Erreur lors du fetch du film ${search} :`, error);
    }

}




