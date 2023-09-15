let res = null;
let list = document.querySelector(".sidenav");
let list_array = document.querySelector(".sidenav a");

let custom_template = document.querySelector(".custom-template");

let content = document.querySelector(".content");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzFlMTFkYjQzMWNhYjM1YWY1Njk4NmJjYTAwYTFiOSIsInN1YiI6IjY1MDJlOTViZWZlYTdhMDExYWI5MzA4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F-Z0vt-dN1i93snrbwxeACGaIoBw0N63yaF0QT8ptU8",
  },
};

window.onload = () => {
  apiMovieGenreCalling();
};

//funcction displaying genres of movies available.
function apiMovieGenreCalling() {
  fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
    .then((response) => response.json())
    .then((response) => {
      res = response;
      myfun1(response);
      createGenreDisplay();
      fetchMovieByGenres();
    })
    .catch((err) => console.error(err));
}

//to print the value content of response
function myfun1(response) {
  // console.log(response);
  // let size = response.genres.length;
  // for (let i = 0; i < size; i++) { console.log(response.genres[i].name) }
}

function fetchMovieByGenres(movie_genre = 18) {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${movie_genre}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      myfun2(response);
      createMoviesDisplay(response);
    })
    .catch((err) => console.error(err));
}

//to print out movie titles on console display
function myfun2(response) {
  // console.log(response);
  // console.log(response.results);
  // let size = response.results.length;
  // for (let i = 0; i < size; i++) { console.log(response.results[i].title) }
}

//it will append movies genre to the sidenav bar
function createGenreDisplay() {
  let arr = res.genres;

  for (let i = 0; i < arr.length; i++) {
    let element = document.createElement("a");
    element.innerText = arr[i].name;
    element.href = "#";
    element.onclick = () => {
      fetchMovieByGenres(arr[i].id);
    };
    // console.log(element);
    list.appendChild(element);
  }
}

function createMoviesDisplay(response) {
  let exe = custom_template.cloneNode(true);
  content.innerHTML = "";
  content.appendChild(exe);

  let size = response.results.length;
  for (let i = 0; i < size; i++) {
    // let ele=exe.cloneNode(true);
    let ele = custom_template.cloneNode(true);

    ele.style.display = "block";

    let poster = ele.querySelector(".card-img-top");
    let title = ele.querySelector(".card-body h5");
    let release_date = ele.querySelector(".card-body p");

    // let poster_path= response.results[i].poster_path;
    poster.src = `https://image.tmdb.org/t/p/original${response.results[i].poster_path}`;

    // let movie_title= response.results[i].original_title;
    title.innerText = `${response.results[i].original_title}`;

    // let movie_response=response.results[i].release_date;
    release_date.innerText = `${response.results[i].release_date}`;

    content.appendChild(ele);
  }
}

function closeNav() {
  document.querySelector(".menue").style.display = "none";
}
