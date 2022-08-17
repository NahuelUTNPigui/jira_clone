const{Feature} = require('../db/db.js')
// Feature.init({
    // nombre:{
    //   },descripcion:{
    //   },cod_verificable:{
    //   },cod_tarea:{
    //   },cod_use_case:{
    
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toFeature(Feature){
    return {
        cod_verificable:Feature.cod_verificable,
        cod_tarea:Feature.cod_tarea,
        cod_use_case:Feature.cod_use_case
    };
}
async function getFeatures(){
    return await Feature.findAll({})
}
async function getFeature(id){
    return await Feature.findByPk(id)
}
async function addFeature(Feature){
    return await Feature.create(toFeature(Feature))
}
async function modFeature(Feature){
    return await Feature.update(toFeature(Feature),{where:{id:Feature.id}})
}
async function delFeature(id){
    return await Feature.destroy({where:{id:id}})
}
async function getFeaturesWhere(where){
    return await Feature.findAll({where})
}
module.exports={FeatureService:{
    getFeature,
    getFeatures,
    delFeature,
    addFeature,
    modFeature,
    getFeaturesWhere
}}
