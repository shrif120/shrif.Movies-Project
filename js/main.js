let ROW = document.getElementById("ROW");
let searchByWord = document.getElementById("searchByWord");
let search = document.getElementById("search");
let allResults = [];
async function getAllMovies(type = "now_playing", pageNumber) {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=9b1745ca52af52147ba8957fc667d4d6&language=en-US&page=${pageNumber}`);
    response = await response.json();
    allResults = response.results;
    displayAllMovies(allResults);
};
getAllMovies();

function displayAllMovies(allResults) {
    let container = ``;
    for (let i = 0; i < allResults.length; i++) {
        container += `    <div class="col-md-4">
                                <div class="movies position-relative overflow-hidden mt-5">
                                     <img class="img-fluid" src="https://image.tmdb.org/t/p/w500${allResults[i].poster_path}" alt="movie-photo">
                                       <div class="overLay position-absolute text-center pt-5">
                                               <h2>${allResults[i].title}</h2>
                                                 <p>${allResults[i].overview}</p>
                                                   <h3>${allResults[i].vote_average}</h3>
                                                   <span>${allResults[i].release_date}</span>
                                         </div>
                                 </div>
                         </div>`;

    }
    ROW.innerHTML = container;
};

// ================================= search ============================
/*
search.addEventListener("keyup", () => {

});
*/
function searchInput(search) {
    let container = ``;
    for (let i = 0; i < allResults.length; i++) {
        if (allResults[i].title.toLowerCase().includes(search.toLowerCase()) == true) {
            container += `    <div class="col-md-4">
            <div class="movies position-relative overflow-hidden mt-5">
                 <img class="img-fluid" src="https://image.tmdb.org/t/p/w500${allResults[i].poster_path}" alt="movie-photo">
                   <div class="overLay position-absolute text-center pt-5">
                           <h2>${allResults[i].title}</h2>
                             <p>${allResults[i].overview}</p>
                               <h3>${allResults[i].vote_average}</h3>
                               <span>${allResults[i].release_date}</span>
                     </div>
             </div>
     </div>`;
        }


    }
    ROW.innerHTML = container;
};

// =================================== searchByWord ================================
/*
searchByWord.addEventListener("keyup", () => {

});
*/
async function SearchByWord(term) {
    if (term == '')
        return;
    let allResults = [];
    let respons = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9b1745ca52af52147ba8957fc667d4d6&language=en-US&query=${term}&page=1&include_adult=false`);
    respons = await respons.json();
    allResults = respons.results;
    displayAllMovies(allResults);
};

// =================================== sideBar ================================
let isOpen = true;
let LeftSide = $("#LeftSide").outerWidth(true);
let menuItems = $(".movieType li");
$("#Icon1").click(() => {
    if (isOpen) {
        $("#Icon1").removeClass("fas fa-bars");
        $("#Icon1").addClass("fas fa-times");
        $("#SideBar").animate({
            left: `0`
        }, 500);
        for (let i = 0; i < menuItems.length; i++) {
            $(`.Item${i}`).animate({
                marginTop: '32px'
            }, i * 200 + 1000);

        };
        isOpen = false;
    } else {
        $("#Icon1").removeClass("fas fa-times").addClass("fas fa-bars");
        $("#SideBar").animate({
            left: `-${LeftSide+17}`
        }, 500);
        $("ul li").animate({
            marginTop: '500px'
        }, 1000);
        isOpen = true;
    };

});
for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", () => {
        getAllMovies(menuItems[i].getAttribute("moviesTypes"));
    });
}

/* ========================================== search validation =================================================*/
let regex = /^[A-Z][a-z]{1,6}$/;
let alertSearch = document.getElementById("alertSearch");

function validateSearch(searchWord) {
    if (regex.test(searchWord) == true) {
        search.classList.remove("is-invalid");
        search.classList.add("is-valid");
        alertSearch.classList.remove("d-block");
        alertSearch.classList.add("d-none");
        searchInput(search.value);
    } else {
        search.classList.remove("is-valid");
        search.classList.add("is-invalid");
        alertSearch.classList.remove("d-none");
        alertSearch.classList.add("d-block");
    }
};
search.addEventListener("keyup", () => {
    validateSearch(search.value);
});
/* ========================================== search validation by word =================================================*/
let regex2 = /^(1-100)?[A-Z][a-z]{1,6}$/;
let alertByWord = document.getElementById("alertByWord");

function validateSearchWord(searchWord2) {
    if (regex2.test(searchWord2) == true) {
        searchByWord.classList.remove("is-invalid");
        searchByWord.classList.add("is-valid");
        alertByWord.classList.remove("d-block");
        alertByWord.classList.add("d-none");
        SearchByWord(searchByWord.value);
    } else {
        alertByWord.classList.remove("d-none");
        alertByWord.classList.add("d-block");
        searchByWord.classList.remove("is-valid");
        searchByWord.classList.add("is-invalid");
    };
};
searchByWord.addEventListener("keyup", () => {
    validateSearchWord(searchByWord.value);
});
/* ========================================== pagination =================================================*/
let pages = $(".pagination .page-link")
for (let i = 0; i < pages.length; i++) {
    pages[i].addEventListener("click", () => {
        getAllMovies(type = "now_playing", pages[i].getAttribute("Page"));
    });
};