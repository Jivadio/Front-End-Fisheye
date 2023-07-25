import photographerFactory from "../factories/photographer.js"

async function getPhotographers() {
    let response = await fetch('data/photographers.json')
    let data = await response.json()

    return ({
        photographers: [...data.photographers],
    })

}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}


function init() {
    getPhotographers().then(data => displayData(data.photographers));
}

init();

