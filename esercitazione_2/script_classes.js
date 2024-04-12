class Song {
    constructor(id, title, artist, year, genre, length) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.genre = genre;
        this.length = length;
    }
}

class Collection {
    constructor(showLibraryCb, id, type, title, subtitle = '', artwork = '', items = []) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.subtitle = subtitle;
        this.artwork = artwork;
        this.items = items;
        this.showLibraryCb = showLibraryCb;
    }

    getDuration() {
        return this.items.reduce((duration, el) => duration + el.length, 0);
    }

    addSong(song) {
        this.items = [...this.items, song];
        this.showLibraryCb();
    }

    deleteSong(id) {
        this.items = this.items.filter(song =>
            song.id !== id
        );
        this.showLibraryCb();
    }
}

class Library {
    constructor() {
        this.library = [];
        this.showLibrary = this.showLibrary.bind(this);
    }

    addCollection(collection) {
        this.library = [...this.library, collection];
    }

    deleteCollection(id) {
        this.library = this.library.filter(collection => collection.id !== id)
    }

    renameCollection(id, title) {
        this.library = this.library.map(collection => collection.id === id ? { ...collection, 'title': title } : collection)
    }

    filterPlaylists() {
        return this.library.filter(collection => collection.type === 'playlist')
    }

    filterAlbums() {
        return this.library.filter(collection => collection.type === 'album')
    }

    showLibrary() {
        this.libraryDOMElement.innerHTML = ''
        this.library.forEach(collection => {
            const node = document.createElement('div')
            node.textContent = collection.title + ' ' + collection.items.length
            this.libraryDOMElement.appendChild(node)
        })
    }
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