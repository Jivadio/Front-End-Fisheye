export default class Photographer {
    constructor(photographerJson) {
        this._name = photographerJson.name
        this._id = photographerJson.id
        this._city = photographerJson.city
        this._country = photographerJson.country
        this._tagline = photographerJson.tagline
        this._price = photographerJson.price
        this._portrait = photographerJson.portrait
    }
    get name() {
        return this._name
    }
    get city() {
        return this._city
    }
    get country() {
        return this._country
    }
    get tagline() {
        return this._tagline
    }
    get price() {
        return this._price
    }
    get picture() {
        return `assets/photographers/${this._portrait}`
    }

}