const { async } = require('rxjs');
const{Criterio} = require('../db/db.js')
// Criterio.init({
//     nombre:{
//     aceptado:{
//     cod_verificable:{
//
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toCriterio(oCriterio){
    return {
        nombre:oCriterio.nombre,
        aceptado:oCriterio.aceptado,
        cod_verificable:oCriterio.cod_verificable
    };
}
async function getCriterios(){
    return await Criterio.findAll({})
}
async function getCriterio(id){
    return await Criterio.findByPk(id)
}
async function addCriterio(oCriterio){
    return await Criterio.create(toCriterio(oCriterio))
}
async function modCriterio(oCriterio){
    return await Criterio.update(toCriterio(oCriterio),{where:{id:oCriterio.id}})
}
async function delCriterio(id){
    return await Criterio.destroy({where:{id:id}})
}
async function getCriteriosWhere(where){
    return await Criterio.findAll({where})
}
async function countCriterioWhere(where){
    return await Criterio.count(where)
}

module.exports={CriterioService:{
    getCriterio,
    getCriterios,
    delCriterio,
    addCriterio,
    modCriterio,
    getCriteriosWhere,
    countCriterioWhere
}}


