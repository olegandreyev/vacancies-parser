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

const _pageSize = 15;


VacancySchema.index({'$**': 'text'});

VacancySchema.statics.removeOld = function(){
    return this.remove({
        "meta.createdAt":{
            $lt:moment().subtract(1,'months').toDate()
        }
    })
};

const createMongoSearch = searchObj => {
    let result = {};
    let {region, keywords, resource, isHot} = searchObj;
    if(keywords){
        result.$text = {
            $search: keywords
        }
    }
    if(region){
        result.region = {
            $regex:region,
            $options:"is"
        }
    }
    if(resource){
        result.resource = resource;
    }
    if(isHot){
        result.isHot = isHot;
    }
    return result;
};

VacancySchema.statics.searchVacancies = function(searchObj){
    let { page } = searchObj;
    page = Math.max(1, page) - 1;
    const self = this;
    const mongooseSearch = createMongoSearch(searchObj);
    return new Promise((res, rej) => {
        return self.find( mongooseSearch , '-__v -updatedAt')
            .skip(page * _pageSize)
            .limit(_pageSize)
            .sort({isHot:-1,createdAt:-1})
            .exec(function(err, docs) {
                if(err){
                    rej(err);
                    return;
                }
                self.count(mongooseSearch, function(err, count){
                    if(err){
                        rej(err);
                        return
                    }
                    res({docs, count});
                })
            });
    })

};

module.exports = mongoose.model("Vacancy", VacancySchema);