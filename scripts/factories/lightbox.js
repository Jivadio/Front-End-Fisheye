import Media from "../models/media.js"

export default function lightboxFactory(data) {

    const media = new Media(data);
    const lightboxImageContainer = document.createElement('div');
    const lightboxImage = document.createElement('img');
    const lightboxVideo = document.createElement('video');
    const lightboxVideoSource = document.createElement('source');
    const lightboxText = document.createElement('p');

    function getImageLightbox() {
        lightboxImageContainer.classList.add("lightbox__image_cont");
        if (media.video != 'assets/images/undefined') {
            lightboxVideo.classList.add("lightbox__image");
            lightboxVideo.setAttribute("alt", "Vidéo de " + media.title)
            lightboxVideo.setAttribute('controls', 'controls');
            lightboxVideoSource.setAttribute('src', media.video);
            lightboxVideoSource.setAttribute('type', 'video/mp4');
            lightboxVideo.appendChild(lightboxVideoSource);
        }
        else {
            lightboxImage.classList.add("lightbox__image");
            lightboxImage.setAttribute("src", media.image);
            lightboxImage.setAttribute("alt", "Photo de " + media.title);
        }
        lightboxText.classList.add("lightbox__text");
        lightboxText.textContent = media.title;

        if (media.video != 'assets/images/undefined') {
            lightboxImageContainer.appendChild(lightboxVideo);
        }
        else {
            lightboxImageContainer.appendChild(lightboxImage);
        }

        lightboxImageContainer.appendChild(lightboxText);

        return lightboxImageContainer;
    }

    return { getImageLightbox };
} 