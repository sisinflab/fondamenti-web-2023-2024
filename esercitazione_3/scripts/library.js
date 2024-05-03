import { httpJson } from "./json.js";


function LibraryCollection(id, type, title, subtitle, date, artwork, items = []) {
    this.type = type;
    this.items = items;

    this.row = document.createElement('tr')
    this.cell = document.createElement('td')

    this.collectionDOMElement = document.createElement("div")
    this.collectionDOMElement.id = id
    this.collectionDOMElement.className = "library-item"

    this.imgDOMElement = document.createElement("img")
    this.imgDOMElement.src = artwork

    this.descriptionDOMElement = document.createElement("div")
    this.descriptionDOMElement.className = "description"

    this.headerDOMElement = document.createElement("h1")
    this.headerDOMElement.textContent = title
    this.paragraphDOMELement = document.createElement("p")
    this.paragraphDOMELement.textContent = type

    this.descriptionDOMElement.appendChild(this.headerDOMElement)
    this.descriptionDOMElement.appendChild(this.paragraphDOMELement)

    this.collectionDOMElement.appendChild(this.imgDOMElement)
    this.collectionDOMElement.appendChild(this.descriptionDOMElement)

    this.cell.appendChild(this.collectionDOMElement)
    this.row.appendChild(this.cell)

    this.getDuration = function () {
        return this.items.reduce((duration, el) => duration + el.length, 0)
    }

    this.cell = document.createElement("td")
    this.cell.textContent = this.getDuration() + " min"

    this.row.appendChild(this.cell)

    this.cell = document.createElement("td")
    this.cell.textContent = items.length

    this.row.appendChild(this.cell)

    this.cell = document.createElement("td")
    this.cell.textContent = date

    this.row.appendChild(this.cell)

    this.cell = document.createElement("td")
    this.cell.textContent = subtitle

    this.row.appendChild(this.cell)

}

function Library(collections) {
    this.httpLibrary = collections.map(collection => new LibraryCollection(collection.id, collection.type,
        collection.title, collection.subtitle,
        collection.date, collection.artwork, collection.items));

    this.library = [...this.httpLibrary];
    this.libraryDOMElement = document.getElementById("library-body")


    this.filterAll = function() {
        this.library = [...this.httpLibrary]
        this.showLibrary()
    }

    this.filterPlaylist = function () {
        this.library = this.httpLibrary.filter(collection =>
            collection.type.toLowerCase() === 'playlist'
        )
        this.showLibrary()
    }

    this.filterAlbum = function () {
        this.library = this.httpLibrary.filter(collection =>
            collection.type.toLowerCase() === 'album'
        )
        this.showLibrary()
    }

    this.showLibrary = function () {
        this.libraryDOMElement.innerHTML = '';
        this.library.forEach(collection => {
            this.libraryDOMElement.appendChild(collection.row)
        })
    }
}


const myLibrary = new Library(httpJson.collections);
myLibrary.showLibrary()

const playlistButton = document.getElementById("playlist-btn")
const albumButton = document.getElementById("album-btn")
const allButton = document.getElementById("all-btn")

playlistButton.addEventListener('click', () => myLibrary.filterPlaylist())
albumButton.addEventListener('click', () => myLibrary.filterAlbum())
allButton.addEventListener('click', () => myLibrary.filterAll())
