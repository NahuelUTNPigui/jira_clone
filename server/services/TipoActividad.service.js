const{TipoActividad} = require('../db/db.js')
async function getTiposActividad(){
    return await TipoActividad.findAll({})
}
async function getTipoActividad(id){
    return await TipoActividad.findByPk(id)
}
async function getTipoActividadProyecto(cod_proyecto){
    return await TipoActividad.findAll({where:{cod_proyecto:cod_proyecto}})
}
async function addTipoActividad(tipo){
    return await TipoActividad.create({nombre:tipo.nombre,cod_proyecto:tipo.cod_proyecto})
}
async function modTipoActividad(tipo){
    return await TipoActividad.update({nombre:tipo.nombre,cod_proyecto:tipo.cod_proyecto},{where:{id:tipo.id}})
}
async function delTipoActividad(id){
    return await TipoActividad.destroy({where:{id:id}})
}
module.exports={TipoActividadService:{
    getTipoActividad,
    getTiposActividad,
    delTipoActividad,
    addTipoActividad,
    modTipoActividad,
    getTipoActividadProyecto
}}
