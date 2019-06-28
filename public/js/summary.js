let recipePic = localStorage.getItem('recipe');

console.log(recipePic);

document.getElementById("picture").src = recipePic
