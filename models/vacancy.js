/**
 * Created by Olejka on 02.03.2017.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VacancySchema = new Schema({
    _id:Schema.Types.ObjectId,
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
    posted:String,
    companyName:String
},{
    _id:false
});

VacancySchema.statics.removeOld = function(){

};


module.exports = mongoose.model("Vacancy", VacancySchema);