/**
 * Created by Olejka on 13.03.2017.
 */

const jwt = require('jsonwebtoken'),
    User = require('../../models/user'),
    sendEmail = require('../../lib/sendEmail'),
    url = require('url');


exports.isEmailVerified = function(req, res, next){
    const user = req.user;
    if(user.isEmailVerified){
        next()
    } else {
        sendEmail(user.email,`
                Please click <a href="http://localhost:3000/confirmEmail?token=${user.emailConfirmationToken}">this link</a>
                to verify your email address (This link will be valid 6 hours)
            `).catch(err => {
            console.log("error", err)
        });
        res.status(403).json({
            error:"Please verify your email address! The verification link was sent on your email address!"
        })
    }
};

exports.login = function(req, res, next) {
    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token:"JWT "+ generateToken(userInfo),
        user: userInfo
    });
};

exports.inUniqueEmail = function(req, res, next) {
    const email = req.body.email.toLowerCase();
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
            profile: { firstName: firstName, lastName: lastName },
            emailConfirmationToken: generateToken({
                email,
                password,
                firstName,
                lastName
            })
        });

        user.save(function(err, user) {
            if (err) { return next(err); }

            sendEmail(user.email,`
                Please click <a href="http://localhost:3000/confirmEmail?token=${user.emailConfirmationToken}">this link</a>
                to verify your email address (This link will be valid 6 hours)
            `).catch(err => {
                console.log("error", err)
            });


            res.status(201).end();
        });
    });
};

exports.confirmEmail = function(req, res, next){
    const query = url.parse(req.url, true).query;
    const token = query.token;
    jwt.verify(token, process.env.JWT_SECRET, function(err, payload) {
        if(err){
            res.redirect("/login?emailConfirmStatus=false");
            return;
        }
        User.findOneAndUpdate({emailConfirmationToken:token},{ isEmailVerified: true, emailConfirmationToken:null },
            function(err, result) {
            if(err){
                next(err);
                return;
            }
            res.redirect("/login?emailConfirmStatus=true")
        })
    });
};

exports.forgotPassword = function(req, res, next){
    let email = req.body.email.toString().toLowerCase();
    User.findOne({ email }, function(err, user){
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(404).json({success:false, message:"Cannot find user with this email address!"})
        }
        user.resetPasswordToken = generateToken({
            email:user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        });
        user.save(function(err, updatedUser){
            if(err) { return next(err) }
            sendEmail(user.email,`
                Please click <a href="http://localhost:3000/reset-password/${user.resetPasswordToken}">this link</a>
                to reset your password (This link will be valid 6 hours)
            `, "Reset Password");
            res.status(200).json({success:true, message:"Reset password link has been sent on your email address"})
        })

    })
};

exports.resetPassword = function(req, res, next){
    let { resetPasswordToken, password }  = req.body;

    jwt.verify(resetPasswordToken,  process.env.JWT_SECRET, function(err, payload){
        if(err){ return res.status(400).json({success:false, message:"Invalid Token!"}) }

        User.findOneAndUpdate({
            resetPasswordToken
        }, {
            resetPasswordToken: null
        }, function(err, user){
            if(err){ return next(err) }
            if(!user){
                return res.status(400).json({success:false, message:"Invalid Token!"})
            }
            user.password = password;
            user.save(function(err, updatedUser){
                if(err) { return next(err) }
                res.status(200).json({success:true, message:"The password has been changed"})
            })
        })
    });

};



function generateToken(user, expires) {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: expires || 21600 // in seconds
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        isEmailVerified: request.isEmailVerified,
        role: request.role,
    };
}