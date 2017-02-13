/**
 * Created by Olejka on 13.02.2017.
 */

const express = require('express');
const router = express.Router();
const request = require('request');

router.get("/:resource",(req, res) => {
    let resource = req.params.resource;
    // request('http://www.google.com', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body) // Show the HTML for the Google homepage.
    //     }
    // })
    res.json({})
});

module.exports = router;