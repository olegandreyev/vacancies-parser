/**
 * Created by Olejka on 27.02.2017.
 */


module.exports = function addAdditionalInfo(original, additionalInfo){
    for(let key in additionalInfo){
        if(!original[key]){
            original[key] = additionalInfo[key];
        }
    }
    return original
};