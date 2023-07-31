import Photographer from "../models/photographer.js"

export default function photographerFactory(data) {
    const photographer = new Photographer(data)
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const price = document.createElement('p');
    const link = document.createElement('a');
    const contactButton = document.createElement("input");

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

        div.classList.add("photographer__information");
        div.appendChild(h3);
        div.appendChild(h4);
        div.appendChild(price);

        link.setAttribute("href", "photographer.html?id=" + photographer.id);
        link.setAttribute("aria-label", 'Page de ' + photographer.name);
        link.classList.add("photographer__link");

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(div);
        article.setAttribute("aria-label", "Carte de " + photographer.name);
        div.setAttribute("aria-label", "Informations de " + photographer.name);
        link.appendChild(article);

        return (link);
    }

    function getPersonnalCardDOM() {
        img.classList.add("photographer__page__img");
        img.setAttribute("src", photographer.picture)
        img.setAttribute("alt", "Photo de " + photographer.name)
        div.classList.add("photographer__page__information");
        div2.classList.add("photographer__page__containertext");
        div3.classList.add("photographer__page__containerbutton");
        div4.classList.add("photographer__page__containerphoto");
        h1.classList.add("photographer__page__name");
        h1.textContent = photographer.name;
        h2.classList.add("photographer__page__location");
        h2.textContent = photographer.city.concat(", ", photographer.country);
        h3.classList.add("photographer__page__tagline");
        h3.textContent = photographer.tagline;
        contactButton.classList.add("photographer__page__button");
        contactButton.id = "contactbuton";
        contactButton.type = "button";
        contactButton.setAttribute("aria-label", "Contact Me");
        contactButton.value = "Contactez-moi";


        div.appendChild(div2);
        div.appendChild(div3);
        div.appendChild(div4);
        div2.appendChild(h1);
        div2.appendChild(h2);
        div2.appendChild(h3);
        div3.appendChild(contactButton);
        div4.appendChild(img);

        return (div);
    }

    return { getUserCardDOM, getPersonnalCardDOM }
}