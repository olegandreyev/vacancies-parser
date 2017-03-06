/**
 * Created by Olejka on 27.02.2017.
 */


const Vacancy = require('../models').Vacancy;
const MAX_PAGES = process.env.MAX_PAGE_PARSE;

class Parser {
    constructor(){
        this.strategy = null;
    }
    setStrategy(strategy){
        this.strategy = strategy;
    }
    parseVacancies(){
        this.strategy.nextPage();
        let currentPage = this.strategy.getCurrentPage();
        currentPage = this.strategy.name === 'DOU.UA' ? currentPage + 1 : currentPage;
        if(currentPage >= MAX_PAGES){
            console.log(`parsed ${this.strategy.name} successfully, parsed ${MAX_PAGES} pages`);
            return true
        }
        return this.strategy.parse()
           .then(vacancies => {
           if(vacancies.length){
              return Vacancy.insertMany(vacancies,{ordered:false})
                  .then(mongooseDocuments => {
                       console.log(`parsed ${this.strategy.name} successfully, new docs: ${mongooseDocuments.length}`);
                       return this.parseVacancies();
                   }, err => {
                      if(err.code === 11000){
                          if(!err.writeErrors || (vacancies.length - err.writeErrors.length > vacancies.length / 2 )){
                              return this.parseVacancies();
                          }
                          console.log(`duplicated keys, stop parsing ${this.strategy.name}!`);
                          return true;
                      } else {
                          console.log(err,'error');
                          return false;
                      }
                  }).catch(err => {
                      console.log(err,'ERROR');
                      return false;
                  })
           } else {
               console.log(`Parsed all pages, stop parsing ${this.strategy.name}`);
               return true;
           }
       });
    }
}




module.exports = Parser;