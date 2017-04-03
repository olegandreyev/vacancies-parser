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
    resource:{
        required:true,
        type:String,
        enum: ['work-ua', 'rabota-ua', 'dou-ua'],
    },
    companyLink:String,
    additionalParams:[String],
    postedAt:String,
    companyName:String
},{
    _id:false,
    timestamps:true
});

VacancySchema.index({'$**': 'text'});

VacancySchema.statics.removeOld = function(){
    return this.remove({
        "meta.createdAt":{
            $lt:moment().subtract(1,'months').toDate()
        }
    })
};

module.exports = mongoose.model("Vacancy", VacancySchema);