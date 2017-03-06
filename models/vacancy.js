/**
 * Created by Olejka on 02.03.2017.
 */

const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
    _id:String,
    title:String,
    link:String,
    isHot:Boolean,
    salary:String,
    region:String,
    shortDescr:String,
    fullDescr:String,
    logo:String,
    tags:Array,
    resource:String,
    companyLink:String,
    additionalParams:[String],
    postedAt:String,
    companyName:String,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        }
    }
},{
    _id:false
});

VacancySchema.statics.removeOld = function(){
    return this.remove({
        "meta.createdAt":{
            $lt:moment().subtract(1,'months').toDate()
        }
    })
};




module.exports = mongoose.model("Vacancy", VacancySchema);