const mongoose = require("mongoose")

const collectionSchema = new mongoose.Schema({
    type: {
        type: String
    },
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    date: {
        type: String
    },
    artwork: {
        type: String
    },
    items: {
        type: [ {
            title: String,
            length: Number
        } ]
    }
})

module.exports = mongoose.model("Collection", collectionSchema)
