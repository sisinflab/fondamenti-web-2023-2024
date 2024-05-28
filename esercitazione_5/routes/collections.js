const express = require("express")
const { getAllCollections, createCollection, updateCollection,
    getCollection, deleteCollection} = require("../controllers/collectionController")
const router = express.Router()

router.get("/", getAllCollections)

router.get("/:id", getCollection)

router.post("/", createCollection)

router.patch("/:id", updateCollection)

router.delete("/:id", deleteCollection)

module.exports = router