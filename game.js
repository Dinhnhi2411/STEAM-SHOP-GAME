// event click allgame and trending
document.querySelector(".click-allgames").addEventListener("click",()=>{
    renderAllGame();
});
document.querySelector(".click-trending").addEventListener("click",()=>{
    renderFeaturedGame();
});

// get FuturedGame

async function getFeaturedGame() {
    const url="https://cs-steam-game-api.herokuapp.com/features";
    let res = await  fetch(url);
    let data = await res.json();
    console.log("data:",data)
    return data;
}
// getFeaturedGame();

async function renderFeaturedGame() {
    let gamesList = document.querySelector(".trend-wrapper");
    gamesList.innerHTML = `<div class="loadingBx"><div class="loading"></div></div>`;
    const dataGame = await getFeaturedGame();
    gamesList.innerHTML="";
    let titleAllgames = document.querySelector(".title-game-trending");
    titleAllgames.innerHTML = `Trending Game `;
    //
  
    dataGame.data.forEach((data, index) => {
        let listGame = document.createElement("div");
        listGame.className = "cover";
        listGame.setAttribute("id", `${data.appid}`);
        listGame.innerHTML = `
      
          <img src= ${data.header_image} alt=""/>
          <div class="game-info">
          <p>${data.name}</p>
          <p class="feature-price"> ${data.price}$ </p>
          <p class="feature-genres"> ${data.genres.toString()}</p>
          </div>
          `;
      gamesList.appendChild(listGame);
    });
    gameClick()
}
renderFeaturedGame();

// searchBox
async function searchBox() {
let url="https://cs-steam-game-api.herokuapp.com/games";
let searchValue = document.querySelector("#search-input").value;
if(searchValue) {
    url = url+=`?q=${searchValue}`;
    let titleSearch = document.querySelector(".title-game-trending");
    titleSearch.innerHTML = `Result for "${searchValue}"`;
}
const res = await fetch(url);
const data = await res.json();
return data;
}
//renderSearchBox
async function renderSearch() {
    let gamesList = document.querySelector(".trend-wrapper");
    gamesList.innerHTML = `<div class="loadingBx"><div class="loading"></div></div>`;
    const dataGame = await searchBox();
    gamesList.innerHTML="";

    dataGame.data.forEach((data, index) => {
        let listGame = document.createElement("div");
        listGame.className = "cover";
        listGame.setAttribute("id", `${data.appid}`);
        listGame.innerHTML = `
      
          <img src= ${data.header_image} alt=""/>
          <div class="game-info">
          <p>${data.name}</p>
          <p class="feature-price"> ${data.price}$ </p>
          <p class="feature-genres"> ${data.genres.toString()}</p>
          </div>
          `;
      gamesList.appendChild(listGame);
    });
    gameClick()
}


async function getGameDetail(gameID) {
    let url = `https://cs-steam-game-api.herokuapp.com/single-game/${gameID}`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}

async function renderGameDetails(gameID) {
    let gamesList = document.querySelector(".trend-wrapper");
    gamesList.innerHTML = `<div class="loadingBx"><div class="loading"></div></div>`;
    let dataGame = await getGameDetail(gameID);
    gamesList.innerHTML="";
    let titleAllgames = document.querySelector(".title-game-trending");
    titleAllgames.innerHTML = `${dataGame.data.name}`;
    //
  
   
        let listGame = document.createElement("div");
        listGame.className = "detail-game";
        
        listGame.innerHTML = `
              <div class="onlygame">
              <div class="title-contain ">
    
              <div class="price">Price: ${dataGame.data.price}$</div>
              </div>
  
              <div class="img-detail">
              <img src=${dataGame.data.header_image} alt=""> </div>
  
              <div class="game-details">
              <div class="game-description"> ${dataGame.data.description}</div>
              
              <div class="game-informations">
              
              <p>Release Date: ${dataGame.data.release_date.toString()}</p><br>
              <p>Developer: ${dataGame.data.developer}</p>
              <p>Platforms: ${dataGame.data.platforms}
              </div>
              <div class="tags-contain">
              Popular user-defined tags for this product:
              <div class="tags">
              <div class="tag"> ${dataGame.data.steamspy_tags.toString()}
              </div>
              </div>
              </div>`;
      gamesList.appendChild(listGame);
  
      // ẩn các detail games //
    };
    

// renderGameDetails();
async function getAllGames(){
    const url ="https://cs-steam-game-api.herokuapp.com/games";
    const res = await fetch(url);
    const data = await res.json();
    console.log("data allgame:", data)
    return data;
}
// getAllGames();
async function renderAllGame() {
    
    let gamesList = document.querySelector(".trend-wrapper");
    gamesList.innerHTML = `<div class="loadingBx"><div class="loading"></div></div>`;
    const dataGame = await getAllGames();
    gamesList.innerHTML="";
    let titleAllgames = document.querySelector(".title-game-trending");
    titleAllgames.innerHTML = `All Games `;
    //
  
    dataGame.data.forEach((data, index) => {
        let listGame = document.createElement("div");
        listGame.className = "cover";
        listGame.setAttribute("id", `${data.appid}`);
        listGame.innerHTML = `
      
          <img src= ${data.header_image} alt=""/>
          <div class="game-info">
          <p>${data.name}</p>
          <p class="feature-price"> ${data.price}$ </p>
          <p class="feature-genres"> ${data.genres.toString()}</p>
          </div>
          `;
      gamesList.appendChild(listGame);
    });
    gameClick()
    // gameClick()
}
// renderAllGame();

// event click button search 
const searchClick = document.querySelector("#search-logo")
searchClick.addEventListener("click", ()=>{
    renderSearch();
});

const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keypress", (event) =>{
    if (event.key === "Enter") {
        event.preventDefault();
        renderSearch();
    }
});

//get API Genres
async function getGenres(){
    let url = "https://cs-steam-game-api.herokuapp.com/genres";
    let res =  await fetch(url);
    let data = await res.json();
    return data;
    
}
// render data Genres
async function renderGenres() {
    const data = await getGenres();
    const genresList = document.querySelector(".genres-list");
    genresList.innerHTML ="";

    data.data.forEach((genres,index)=>{
        let x = document.createElement("div");
        x.className="genresgroup";
        x.innerHTML = `${genres.name}`;
        genresList.appendChild(x);
    });
    attachGenresClickEvent()
}
renderGenres();

// Get API Tags
async function getTags(){
    let url="https://cs-steam-game-api.herokuapp.com/steamspy-tags";
    let res = await fetch(url);
    let data = await res.json();
    return data;
}

// render data Tags
async function renderTags(){
    let data = await getTags();
    let tagsList = document.querySelector(".tag-list");
    tagsList.innerHTML ="";

    data.data.forEach((tag,index)=>{
        let x = document.createElement("div");
        x.className="taggroup";
        x.innerHTML = `${tag.name}`;
        tagsList.appendChild(x);
    });
    attachTagsClickEvent(); 

}
renderTags();


// get data genres when user click 
async function getGenresData(genres) {
let url ="https://cs-steam-game-api.herokuapp.com/games";
let genresKey = genres.replace("&", "%26");
url = url + `?genres=${genresKey}`;
let titleSearch = document.querySelector(".title-game-trending");
titleSearch.innerHTML = `Genres:"${genres}"`;
let res = await fetch(url);
let data = await res.json();
return data;

}
// filter
async function filGenres(genres) {
    let gamesList = document.querySelector(".trend-wrapper");
    gamesList.innerHTML = `<div class="loadingBx"><div class="loading"></div></div>`;
    let dataGame = await getGenresData(genres);
    gamesList.innerHTML="";
   
    dataGame.data.forEach((data, index) => {
        let listGame = document.createElement("div");
        listGame.className ="cover";
        listGame.setAttribute("id", `${data.appid}`);
        listGame.innerHTML = `
      
          <img src= ${data.header_image} alt=""/>
          <div class="game-info">
          <p>${data.name}</p>
          <p class="feature-price"> ${data.price}$ </p>
          <p class="feature-genres"> ${data.genres.toString()}</p>
          </div>
          `;
      gamesList.appendChild(listGame);
    });
    gameClick()
    
}
//attach event for all class genresgroup 
function attachGenresClickEvent() {
    let selectGenresBtn = document.querySelectorAll(".genresgroup");
    selectGenresBtn.forEach((button)=>{
        let replace = button.innerHTML
        .replace("&amp;","&")
        .replace("&lt;","<")
        .replace("&gt;", ">");

        button.addEventListener("click",()=>{
            filGenres(replace);
        });
    })
}

// get data when user click 

async function getTagData(tags) {
let url = "https://cs-steam-game-api.herokuapp.com/games";
let tagsKey = tags.replace("&", "%26");
url = url + `?steamspy_tags=${tagsKey}`;
let titleTags = document.querySelector(".title-game-trending");
titleTags.innerHTML = `Tags:"${tags}"`;
const res = await fetch(url);
const data = await res.json();

return data;
}

// filter
async function filClickTags(tags) {
    let gamesList = document.querySelector(".trend-wrapper");
    gamesList.innerHTML = `<div class="loadingBx"><div class="loading"></div></div>`;
    const dataGame = await getTagData(tags);
    gamesList.innerHTML="";
  
    dataGame.data.forEach((data, index) => {
        let listGame = document.createElement("div");
        listGame.className = "cover";
        listGame.setAttribute("id", `${data.appid}`);
        listGame.innerHTML = `
      
          <img src= ${data.header_image} alt=""/>
          <div class="game-info">
          <p>${data.name}</p>
          <p class="feature-price"> ${data.price}$ </p>
          <p class="feature-genres"> ${data.genres.toString()}</p>
          </div>
          `;
      gamesList.appendChild(listGame);
    });
    gameClick()
}
// attach
function attachTagsClickEvent() {
    let selectTagsBtn = document.querySelectorAll(".taggroup");
  
    selectTagsBtn.forEach((button)=>{
        
        let replace = button.innerHTML
        .replace("&amp;","&")
        .replace("&lt","<")
        .replace("&gt;", ">");

        button.addEventListener("click",()=>{
            filClickTags(replace);
        });
    });
}

// create event click game for all class cover 

function gameClick() {
    let selectGameBtn = document.querySelectorAll(".cover");
    selectGameBtn.forEach((button)=>{
        let gameID = button.getAttribute("id");
        
        button.addEventListener("click", ()=>{
            renderGameDetails(gameID);
        });
    });
}

//


