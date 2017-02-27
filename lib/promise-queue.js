/**
 * Created by Olejka on 27.02.2017.
 */

module.exports = function createPromiseQueue(dataArray, actionPromise){
    let results = [];
    let currentPromiseIndex = 0;
    function fireQueue(){
        if (currentPromiseIndex === dataArray.length) return Promise.resolve(results);
        else {
            return actionPromise(dataArray[currentPromiseIndex],currentPromiseIndex++).then(result =>{
                results.push(result);
                return fireQueue()
            });
        }
    }
    return { fireQueue }
};