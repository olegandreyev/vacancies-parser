/**
 * Created by Olejka on 13.03.2017.
 */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String
        },
        accountType:{
            type:String,
            enum:["Plain","Facebook","Google"],
            default:"Plain"
        },
        profile: {
            firstName: { type: String },
            lastName: { type: String }
        },
        favoriteVacancies:[{ type: String, ref: 'Vacancy' }],
        role: {
            type: String,
            enum: ['Member', 'Admin', 'HH'],
            default: 'Member'
        },
        resetPasswordToken: { type: String , default:null },
        emailConfirmationToken: { type:String },
        isEmailVerified:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps: true
    });

UserSchema.pre('save', function(next) {
    const user = this,
        SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};

UserSchema.statics.exists = function (email) {
    return new Promise((res, rej) => {
        return this.find({email})
            .then(result => {
                if(result.length){
                    res(true)
                } else {
                    res(false)
                }
            }).catch(err => {
                rej(err)
            })
    })

};

module.exports = mongoose.model('User', UserSchema);

