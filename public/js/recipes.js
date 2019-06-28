window.addEventListener('load', (event) => {

    // fetch(`./recipe?search=chicken`)

    // Location.reload(true)

    console.log('page is fully loaded');
});

let startSearch = document.getElementById("look")

let moreInfo = document.getElementById("info")

let userInput

function fetchValue(){

  userInput = document.getElementById("search").value

  console.log("search: ", userInput);

  window.location.href = `/search?search=${userInput}`

  // fetch(`/search?search=${userInput}`)

}

function getMoreInfo(){

  let picture = moreInfo.getAttribute("data-picture")

  let objectId = moreInfo.getAttribute("data-id")

  console.log("picture source: ", picture, "id: ", objectId)

  localStorage.setItem('recipe', picture)

  // /summary?id=<%= recipes.results[i].id %>

  window.location.href = `/summary?id=${objectId}`

  // fetch(`/summary?id=${objectId}`)
}



startSearch.addEventListener("click", fetchValue)

moreInfo.addEventListener("click", getMoreInfo)



// const request = ``
//
// WindowOrWorkerGlobalScope.fetch(request)
//   .then(response => {
//     if (response.status === 200) {
//       return response.json();
//     } else {
//       throw new Error('Something went wrong on api server!');
//     }
//   })
//   .then(response => {
//     console.debug(response);
//     // ...
//   }).catch(error => {
//     console.error(error);
//   });
