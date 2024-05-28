const Collection = require("../models/collectionModel")


const getAllCollections = async (req, res) => {
        try {
            const collection = await Collection.find({})
            res.status(200).json({msg: "ok", collection: collection})
        } catch (err) {
            res.status(500).json({msg: "error", err: err})
        }
}

const getCollection = async (req, res) => {
    const id = req.params.id
    try {
        const collection = await Collection.findById(id)
        res.status(200).json({msg: "ok", collection: collection})
    } catch (err) {
        res.status(500).json({msg: "error", err: err})
    }
}

const createCollection = async (req, res) => {
    try {
        const collection = await Collection.create({...req.body})
        res.status(200).json({msg: "ok", collection: collection})
    } catch (err) {
        res.status(500).json({msg: "error", err: err})
    }
}

const updateCollection = async (req, res) => {
    const id = req.params.id
    try {
        const collection = await Collection.findById(id)
        collection.title = req.body.title
        await collection.save()
        res.status(200).json({msg: "ok", collection: collection})
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "error", err: err})
    }
}

const deleteCollection = async (req, res) => {
    const id = req.params.id
    try {
        const collection = await Collection.findByIdAndDelete(id)
        res.status(200).json({msg: "ok", collection: collection})
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "error", err: err})
    }
}


module.exports = {
    getAllCollections,
    createCollection,
    getCollection,
    updateCollection,
    deleteCollection
}