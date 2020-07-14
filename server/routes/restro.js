const express = require("express");
const router = express.Router();
const Table = require("../model/tables");
const Restro = require("../model/restro");
const restroRequireLogin = require("../middleware/restroRequireLogin");

//Getting Tables
router.get("/tables",restroRequireLogin,(req,res) => {
    Table.find({tableOf : req.restro._id})
    .then((table) => {
        res.status(200).json(table);
    }).catch((err) => {
        res.status(422).json({
            error : err
        })
    })
})

//Updating menu 
router.post("/menu",restroRequireLogin,(req,res) => {
    Restro.findByIdAndUpdate(req.restro._id,req.body, {
        new : true
    }).then((restro) => {
        res.status(200).json(restro);
    }).catch((err) => {
        res.satus(422).json({
            error : err
        })
    })
})

//Fetching menu
router.get("/getmenu",restroRequireLogin,(req,res) => {
    Restro.findById(req.restro._id)
    .then((restro) => {
        res.status(200).json(restro);
    }).catch((err) => {
        res.status(422).json({
            error : err
        })
    })
})

module.exports = router;