window.addEventListener('load', (event) => {

    // fetch(`./recipe?search=chicken`)

    // Location.reload(true)

    console.log('page is fully loaded');
});

let startSearch = document.getElementById("look")

let userInput

function fetchValue(){

  userInput = document.getElementById("search").value

  console.log("search: ", userInput);

  fetch(`./search?search=${userInput}`)


}

startSearch.addEventListener("click", fetchValue)

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
