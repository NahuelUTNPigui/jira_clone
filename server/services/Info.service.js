const{Info} = require('../db/db.js')
// Info.init({
//     esfuerzo_estimado:{
//     cod_prioridad:{
//     cod_riesgo:{
//
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toInfo(Info){
    return {
        esfuerzo_estimado:Info.esfuerzo_estimado,
        prioridad:Info.prioridad,
        gravedad:Info.gravedad
    };
}
async function getInfos(){
    return await Info.findAll({})
}
async function getInfo(id){
    return await Info.findByPk(id)
}
async function addInfo(Info){
    return await Info.create(toInfo(Info))
}
async function modInfo(Info){
    return await Info.update(toInfo(Info),{where:{id:Info.id}})
}
async function delInfo(id){
    return await Info.destroy({where:{id:id}})
}
async function getInfosWhere(where){
    return await Info.findAll({where})
}
module.exports={InfoService:{
    getInfo,
    getInfos,
    delInfo,
    addInfo,
    modInfo,
    getInfosWhere
}}

