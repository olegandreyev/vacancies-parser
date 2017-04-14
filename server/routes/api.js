/**
 * Created by Olejka on 14.02.2017.
 */

const express = require('express');
const router = express.Router();
const Vacancy = require('../../models/vacancy');
const url = require('url');

router.get('/me',(req, res) => {
    res.send( setUserInfo(req.user) )
});


router.post("/vacancies",(req, res, next) => {
    let query = req.body;
    console.log(query);
    Vacancy.searchVacancies(query).then(({docs, count}) => {
        res.json({docs, count})
    }).catch(err => {
        next(err)
    });
});

router.get("/vacancies/autocomplete",(req, res, next) => {
    const urlObj = url.parse(req.url, true);
    Vacancy.find({
        title:{
            $regex:urlObj.query.text,
            $options:"is"
        }
    },'title').limit(10).exec(function(err, results){
        if(err){
            next(err);
            return;
        }
        res.json(results.map(v => v.title));
    });
});

function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        isEmailVerified: request.isEmailVerified,
        email: request.email,
        role: request.role,
    };
}

module.exports = router;