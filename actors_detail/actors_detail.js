const API_KEY = '235f18c6dedac9eb6cd3020b665313ec';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzVmMThjNmRlZGFjOWViNmNkMzAyMGI2NjUzMTNlYyIsIm5iZiI6MTc0MDA0ODA0OS4yNTgsInN1YiI6IjY3YjcwNmIxZWQwYmJjYzUwZjY1NmUzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dcdFkqLzOIahKJ3PctShNTE_g6NeUBoT5MQwL7uXn-g'
    }
  };

const BASE_URL = 'https://api.themoviedb.org/3';

const actorId = localStorage.getItem('actorId');

async function render_details(){
    
    fetch(BASE_URL + `/person/${actorId}?language=fr-fr`, options)
    .then(res => res.json())
    .then(actor => {
        console.log(actor);
        const birthday = actor?.birthday || "Date de naissance inconnue"
        const deathday = actor?.deathday || "";
        const imageURL = actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : "../assets/unknown.png";
        
        const nameEl = document.getElementById("title");
        nameEl.textContent = actor?.name || "Nom inconnu";

        const datesEl = document.getElementById("dates_title");
        datesEl.textContent = birthday + (deathday === "" ? "" : ` - ${deathday}`);
        
        const imageEl = document.getElementById("actor_frame");
        imageEl.src = imageURL;
    })
.catch(err => console.log(err));
}

render_details();

async function render_actor_films(person_id){
  console.log("ici c'estbon");
  fetch(BASE_URL + `/person/${person_id}/movie_credits?language=fr-fr`, options) 
    .then(res => res.json())
    .then(res => {
      console.log(res);
      const roles = res.cast.sort((a, b) => b.popularity - a.popularit);
      const roleDiv = document.getElementById('films');
      for(let role of roles){
        const filmName = role?.title || "Titre Inconnu";
        const filmImgURL = `https://image.tmdb.org/t/p/w500${role.poster_path}`;
        const roleName = role?.character || "";

        const filmEl = document.createElement("div");
        filmEl.className = "film";

        const filmImg = document.createElement("img");
        filmImg.src = filmImgURL;
        filmImg.alt = filmName;
        filmImg.className = "film_img"

        const filmNameEl = document.createElement("div");
        filmNameEl.textContent = filmName;
        filmNameEl.className="film_title"

        const roleNameEl = document.createElement("div");
        roleNameEl.textContent = roleName;
        roleNameEl.id="role_name"

        filmEl.appendChild(filmImg);
        filmEl.appendChild(filmNameEl);
        filmEl.appendChild(roleNameEl);
        roleDiv.appendChild(filmEl);

        filmEl.addEventListener("click", async function () {
          const film = await fetch(`${BASE_URL}/movie/${role.id}?api_key=${API_KEY}&language=fr-fr`)
          .then(res => res.json())
          .catch(err => console.error(err));
          localStorage.setItem('selectedFilm', JSON.stringify(film));
          window.location.href = '../film_details/film_details.html';  
      })

    }
  })
}

render_actor_films(actorId);