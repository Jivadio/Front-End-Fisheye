import photographerFactory from "../factories/photographer.js"
import mediaFactory from "../factories/media.js"
import lightboxFactory from "../factories/lightbox.js";

let mediaList = [];

async function getPhotographers() {
    let response = await fetch('data/photographers.json');
    let data = await response.json();

    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = parseInt(urlParams.get('id'));

    let photographer = data.photographers.find(p => p.id === photographerId);
    let media = data.media.filter(m => m.photographerId === photographerId);
    mediaList = media;

    return ({
        photographer: photographer,
        media: media
    })
}

async function displayData(photographer, media) {
    const photographersSection = document.querySelector(".photographer_section");
    const photographerModel = photographerFactory(photographer);
    const personnalCardDOM = photographerModel.getPersonnalCardDOM();
    photographersSection.appendChild(personnalCardDOM);

    const openModalBtn = document.getElementById('contactbuton');
    openModalBtn.addEventListener('click', openModal);

    const photographerPrice = document.querySelector(".photographer__page__price");
    photographerPrice.textContent = photographer.price + "€ / jour";

    const photographerLike = document.querySelector(".photographer__page__like");
    photographerLike.textContent = getTotalLikes(media) + " ";

    const photographerNameModal = document.querySelector(".photographer__page__namemodal");
    photographerNameModal.textContent = photographer.name;

    const mediaSection = document.querySelector(".media_section");

    media.forEach((media, index) => {
        const mediaModel = mediaFactory(media, openLightbox, index);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });

    getTotalLikes(media);
}

function getTotalLikes(media) {
    let totalLikes = 0;
    for (const item of media) {
        totalLikes += item.likes;
    }
    return totalLikes;
}


function init() {
    getPhotographers().then(data => displayData(data.photographer, data.media));
}

init();

const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    closeModal();
    console.log('Formulaire envoyé !');
});

let currentIndex;
const nextLink = document.getElementById('nextLink');
const prevLink = document.getElementById('prevLink');

function openLightbox(media, index) {
    currentIndex = index;
    const lightboxModel = lightboxFactory(media);
    const lightboxDOM = lightboxModel.getImageLightbox();
    const lightbox = document.getElementById('lightbox_image_container');
    lightbox.appendChild(lightboxDOM);

    const lightBoxAll = document.getElementById('lightbox');
    lightBoxAll.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const closeLightboxBtn = document.getElementById('closeLightbox');
    closeLightboxBtn.addEventListener('click', closeLightbox);
}

function closeLightbox() {
    const lightBoxAll = document.getElementById('lightbox');
    lightBoxAll.style.display = 'none';
    document.body.style.overflow = 'auto';

    const lightbox = document.getElementById('lightbox_image_container');
    lightbox.innerHTML = '';
}

nextLink.addEventListener('click', function (event) {
    event.preventDefault();
    currentIndex++;
    if (currentIndex >= mediaList.length) {
        currentIndex = 0;
    }

    const lightbox = document.getElementById('lightbox_image_container');
    lightbox.innerHTML = '';

    openLightbox(mediaList[currentIndex], currentIndex);
});

prevLink.addEventListener('click', function (event) {
    event.preventDefault();
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = mediaList.length - 1;
    }

    const lightbox = document.getElementById('lightbox_image_container');
    lightbox.innerHTML = '';

    openLightbox(mediaList[currentIndex], currentIndex);
});

const sortSelect = document.getElementById('sortSelect');

sortSelect.addEventListener('change', function () {
    const sortValue = this.value;
    mediaList.sort((a, b) => {
        switch (sortValue) {
            case 'popularity':
                return b.likes - a.likes;
            case 'date':
                return new Date(b.date) - new Date(a.date);
            case 'title':
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            default:
                return 0;
        }
    });

    const mediaSection = document.querySelector(".media_section");
    mediaSection.innerHTML = '';
    mediaList.forEach((media, index) => {
        const mediaModel = mediaFactory(media, openLightbox, index);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
});