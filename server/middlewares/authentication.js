/**
 * Created by Olejka on 13.03.2017.
 */

const jwt = require('jsonwebtoken'),
    User = require('../../models/user');


exports.login = function(req, res, next) {
    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token:"JWT "+ generateToken(userInfo),
        user: userInfo
    });
};

exports.inUniqueEmail = function(req, res, next) {
    const email = req.body.email;
    User.exists(email)
        .then((result) => {
            res.send(result)
        })
        .catch(next)
};

exports.register = function(req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.'});
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({ error: 'You must enter your full name.'});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }

        // If email is unique and password was provided, create account
        let user = new User({
            email: email,
            password: password,
            profile: { firstName: firstName, lastName: lastName }
        });

        user.save(function(err, user) {
            if (err) { return next(err); }

            let userInfo = setUserInfo(user);

            res.status(201).json({
                user: userInfo
            });
        });
    });
};



function generateToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 10080 // in seconds
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role,
    };
}