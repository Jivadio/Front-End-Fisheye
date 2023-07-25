import Photographer from "../models/photographer.js"

export default function photographerFactory(data) {
    const photographer = new Photographer(data)
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const informationPhotographer = document.createElement('div');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const price = document.createElement('p');

    function getUserCardDOM() {
        img.classList.add("photographer__img");
        img.setAttribute("src", photographer.picture)
        img.setAttribute("alt", "Photo de " + photographer.name)
        h2.classList.add("photographer__name");
        h2.textContent = photographer.name;
        h3.classList.add("photographer__location");
        h3.textContent = photographer.city.concat(", ", photographer.country);
        h4.classList.add("photographer__tagline");
        h4.textContent = photographer.tagline;
        price.classList.add("photographer__price");
        price.textContent = photographer.price + "€/jour";

        informationPhotographer.classList.add("photographer__information");
        informationPhotographer.appendChild(h3);
        informationPhotographer.appendChild(h4);
        informationPhotographer.appendChild(price);

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(informationPhotographer);
        article.setAttribute("aria-label", "Carte de " + photographer.name);
        informationPhotographer.setAttribute("aria-label", "Informations de " + photographer.name);

        return (article);
    }
    return { getUserCardDOM }
}