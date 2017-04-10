/**
 * Created by Olejka on 14.02.2017.
 */

const express = require('express');
const router = express.Router();
const Vacancy = require('../../models/vacancy');
const url = require('url');
const _pageSize = 15;

router.get('/me',(req, res) => {
    res.send( setUserInfo(req.user) )
});


router.get("/vacancies",(req, res, next) => {
    const urlObj = url.parse( decodeURIComponent(req.url), true);
    let query = urlObj.query;
    if(!Number.isInteger( parseInt(query.page) )) {
        res.status(400).send({
            error:"Wrong query params!"
        })
    }
    let page = Math.max(0, query.page);
    let search = query.keywords ? {$text: {$search: query.keywords}} : {};
    Vacancy.find(search, '-__v -updatedAt')
        .skip(page * _pageSize)
        .limit(_pageSize)
        .sort({createdAt:-1})
        .exec(function(err, docs) {
            if(err){
                next(err);
            }
            Vacancy.count(search, function(err, count){
                if(err){
                    next(err);
                }
                res.json({docs, count});
            })
        });
});

router.get("/vacancies/autocomplete",(req, res, next) => {
    const urlObj = url.parse(req.url, true);
    Vacancy.find({
        title:{
            $regex:urlObj.query.text,
            $options:"is"
        }
    },'title', function(err, results){
        if(err){
            next(err);
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