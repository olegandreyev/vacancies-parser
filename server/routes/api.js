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
    Vacancy.searchVacancies(query).then(({docs, count}) => {
        res.json({docs, count})
    }).catch(next);
});

router.get("/regions", (req, res, next) => {
    Vacancy.getRegions().then(docs => {
        res.json(docs)
    }).catch(next)
});

router.get("/resources", (req, res, next) => {
    Vacancy.getResources().then(docs => {
        res.json(docs)
    }).catch(next)
});

router.get('/dayStatistic',(req, res, next) => {
    Vacancy.vacanciesPerDayOfMonth().then(docs => {
        res.json(docs)
    }).catch(next)
});

router.get("/vacancies/:id", (req, res, next) => {
    Vacancy.findById(req.params.id, function(err, doc){
        if(err){
            next(err);
            return;
        }
        res.json(doc)
    })
})

router.get("/autocomplete",(req, res, next) => {
    const urlObj = url.parse(req.url, true);
    Vacancy.aggregate([
        {$match:{title:{$regex:urlObj.query.text, $options:"is"}}},
        {$group:{_id:"$title"}},
        {$limit:10}
    ], function(err, docs){
        if(err){
            return next(err);
        }
        res.json(docs.map(v => v._id));
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