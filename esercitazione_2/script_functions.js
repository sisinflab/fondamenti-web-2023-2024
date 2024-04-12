function Song(id, title, artist, year, genre, length) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.genre = genre;
    this.length = length;
}

function Collection(showLibraryCb, id, type, title, subtitle = '', artwork = '', items = []) {
    // Creazione di un oggetto a partire da una funzione costruttore
    // Uso di parametri di default all'interno della definizione di una funzione
    // Uso del reduce
    this.id = id;
    this.type = type;
    this.title = title;
    this.subtitle = subtitle;
    this.artwork = artwork;
    this.items = items;
    this.showLibraryCb = showLibraryCb;

    this.getDuration = function() {
        return this.items.reduce((duration, el) => duration + el.length, 0)
    }

    this.addSong = function(song) {
        this.items = [...items, song]
        this.showLibraryCb()
    }

    this.deleteSong = function(id) {
        this.items = this.items.filter(song =>
            song.id !== id
        )
        this.showLibraryCb()
    }

}

function Library() {
    // Uso dei metodi di ordine superiore degli array
    this.library = [];
    this.libraryDOMElement = document.getElementById("library");

    this.addCollection = function(collection) {
        this.library = [...this.library, collection];
    }

    this.deleteCollection = function(id) {
        this.library = this.library.filter(collection =>
            collection.id !== id
        )
    }

    this.renameCollection = function(id, title) {
        this.library = this.library.map(collection =>
            collection.id === id ? { ...collection, 'title': title } : collection
        )
    }

    this.filterPlaylists = function() {
        return this.library.filter(collection =>
            collection.type === 'playlist'
        )
    }

    this.filterAlbums = function() {
        return this.library.filter(collection =>
            collection.type === 'album'
        )
    }

    this.showLibrary = function() {
        this.libraryDOMElement.innerHTML = ''
        this.library.forEach(collection => {
            const node = document.createElement('div')
            node.textContent = collection.title + ' ' + collection.items.length
            this.libraryDOMElement.appendChild(node)
        })
    }

    this.showLibrary = this.showLibrary.bind(this)
}

const myLibrary = new Library();

const collection1 = new Collection(myLibrary.showLibrary, 'c1', 'playlist', 'Mia Playlist')
const collection2 = new Collection(myLibrary.showLibrary, 'c2', 'album', 'Album Figo')
const collection3 = new Collection(myLibrary.showLibrary, 'c3', 'album', 'Album Strafigo')

const song1 = new Song('s1', 'Titolo', 'Artista', 2024, 'Classica', 180)

collection1.addSong(song1)
collection2.addSong(song1)
collection3.addSong(song1)
collection3.addSong(song1)

myLibrary.addCollection(collection1)
myLibrary.addCollection(collection2)
myLibrary.addCollection(collection3)

myLibrary.showLibrary()