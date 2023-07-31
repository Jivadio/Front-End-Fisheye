export default class Media {
    constructor(mediaJson) {
        this._id = mediaJson.id
        this._title = mediaJson.title
        this._image = mediaJson.image
        this._likes = mediaJson.likes
        this._date = mediaJson.date
        this._price = mediaJson.price
        this._video = mediaJson.video
    }
    get id() {
        return this._id
    }
    get title() {
        return this._title
    }
    get image() {
        return `assets/images/${this._image}`
    }
    get likes() {
        return this._likes
    }
    get date() {
        return this._date
    }
    get price() {
        return this._price
    }
    get video() {
        return `assets/images/${this._video}`
    }
}