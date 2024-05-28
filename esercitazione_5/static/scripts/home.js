import { homeJson } from "./json.js";


function Home(sections) {
    this.homeDOMElement = document.createElement('div')

    this.sectionsDOMElements = sections.map(e => {
        const homeSection = new HomeSection(e.title, e.collections)
        return homeSection.homeSectionDOMElement
    })

    this.homeDOMElement.append(...this.sectionsDOMElements)
}

function HomeSection(title, collections) {
    this.homeSectionDOMElement = document.createElement('section')

    this.titleDOMElement = document.createElement('h1')
    this.titleDOMElement.textContent = title

    this.cardCarouselDOMElement = document.createElement('div')
    this.cardCarouselDOMElement.className = 'card-carousel'

    this.homeSectionDOMElement.appendChild(this.titleDOMElement)
    this.homeSectionDOMElement.appendChild(this.cardCarouselDOMElement)

    this.collectionsDOMElements = collections.map(e => {
        const homeCollection = new HomeCollection(e.artwork, e.title, e.subtitle)
        return homeCollection.homeCollectionDOMElement
    })

    this.cardCarouselDOMElement.append(...this.collectionsDOMElements)
}

function HomeCollection(artwork, title, subtitle) {
    this.homeCollectionDOMElement = document.createElement('div')
    this.homeCollectionDOMElement.className = 'card'

    this.artworkDOMElement = document.createElement('img')
    this.artworkDOMElement.className = 'album'
    this.artworkDOMElement.setAttribute('src', artwork)
    this.homeCollectionDOMElement.appendChild(this.artworkDOMElement)

    this.titleDOMElement = document.createElement('h1')
    this.titleDOMElement.textContent = title
    this.homeCollectionDOMElement.appendChild(this.titleDOMElement)

    this.subtitleDOMElement = document.createElement('p')
    this.subtitleDOMElement.textContent = subtitle
    this.homeCollectionDOMElement.appendChild(this.subtitleDOMElement)
}


const home = new Home(homeJson.sections)
const mainDOMElement = document.getElementById('main-content')
mainDOMElement.appendChild(home.homeDOMElement)

