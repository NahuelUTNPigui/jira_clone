const{Precondicion} = require('../db/db.js')
// Precondicion.init({
//     condicion:{
//     cod_bug:{
//     orden:{
//     
//
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toPrecondicion(Precondicion){
    return {
        condicion:Precondicion.condicion,
        cod_bug:Precondicion.cod_bug,
        orden:Precondicion.orden
    };
}
async function getPrecondicions(){
    return await Precondicion.findAll({})
}
async function getPrecondicion(id){
    return await Precondicion.findByPk(id)
}
async function addPrecondicion(Precondicion){
    return await Precondicion.create(toPrecondicion(Precondicion))
}
async function modPrecondicion(Precondicion){
    return await Precondicion.update(toPrecondicion(Precondicion),{where:{id:Precondicion.id}})
}
async function delPrecondicion(id){
    return await Precondicion.destroy({where:{id:id}})
}
async function getPrecondicionsWhere(where){
    return await Precondicion.findAll({where})
}
module.exports={PrecondicionService:{
    getPrecondicion,
    getPrecondicions,
    delPrecondicion,
    addPrecondicion,
    modPrecondicion,
    getPrecondicionsWhere
}}
