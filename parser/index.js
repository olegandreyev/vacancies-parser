/**
 * Created by Olejka on 27.02.2017.
 */




class Parser {
    constructor(){
        this.strategy = null;
    }
    setStrategy(strategy){
        this.strategy = strategy;
    }
    parseVacancies(){
       return this.strategy.parse();
       //     .then(vacancies => {
       //     if(vacancies.length){
       //         //TODO add vacancies to database
       //         if(this.strategy.getCurrentPage() > 100){
       //             console.log(vacancies);
       //             return;
       //         }
       //         this.strategy.nextPage();
       //         return this.parseVacancies();
       //     }
       // });
    }
}





module.exports = Parser;