/**
 * Created by Olejka on 14.02.2017.
 */

const express = require('express');
const router = express.Router();


router.get('/me',(req, res) => {
    res.send( setUserInfo(req.user) )
});


function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role,
    };
}

module.exports = router;