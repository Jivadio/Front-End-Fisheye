import Media from "../models/media.js"

export default function mediaFactory(data, openLightbox, index) {
    const media = new Media(data)
    const article = document.createElement('article');
    const div = document.createElement('div');
    const pictureName = document.createElement('p');
    const divLike = document.createElement('div');
    const numberLike = document.createElement('p');
    const likeSVG = document.createElement('img');
    const source = document.createElement('source');
    const video = document.createElement('video');
    const img = document.createElement('img');
    const linkLightbox = document.createElement('a');
    let liked = false;


    function getMediaCardDOM() {
        linkLightbox.setAttribute("href", "#");
        linkLightbox.classList.add("media__linklightbox");
        linkLightbox.setAttribute("aria-label", "Ouvrir la lightbox");

        if (media.video !== 'assets/images/undefined') {
            video.classList.add("media__video");
            video.setAttribute("alt", "Vidéo de " + media.title)
            video.setAttribute('controls', 'controls');
            source.setAttribute('src', media.video);
            source.setAttribute('type', 'video/mp4');
            video.appendChild(source);
        }
        else {
            img.classList.add("media__img");
            img.setAttribute("src", media.image)
            img.setAttribute("alt", "Photo de " + media.title)
        }

        article.classList.add("media__card");
        div.classList.add("media__container");
        pictureName.classList.add("media__name");
        pictureName.textContent = media.title;
        divLike.classList.add("media__like");
        numberLike.classList.add("media__numberlike");
        numberLike.textContent = media.likes;
        likeSVG.classList.add("media__like__svg");
        likeSVG.setAttribute("src", "assets/icons/like.svg");
        likeSVG.setAttribute("alt", "Nombre de likes de la photo");
        divLike.appendChild(numberLike);
        divLike.appendChild(likeSVG);


        div.appendChild(pictureName);
        div.appendChild(divLike);

        if (media.video != 'assets/images/undefined') {
            linkLightbox.appendChild(video);
        }
        else {
            linkLightbox.appendChild(img);
        }
        article.appendChild(linkLightbox);
        article.appendChild(div);
        article.setAttribute("aria-label", "Carte de " + media.title);

        linkLightbox.addEventListener('click', (event) => {
            event.preventDefault();
            openLightbox(data, index);
        });

        likeSVG.addEventListener('click', updateLikes);

        return (article);
    }

    function updateLikes() {
        const photographerLike = document.querySelector(".photographer__page__like");

        if (liked) {
            numberLike.textContent = parseInt(numberLike.textContent) - 1;
            photographerLike.textContent = parseInt(photographerLike.textContent) - 1;
            liked = false;
        }
        else {
            numberLike.textContent = parseInt(numberLike.textContent) + 1;
            photographerLike.textContent = parseInt(photographerLike.textContent) + 1;
            liked = true;
        }
    }

    return { getMediaCardDOM }
}
