const{Proyecto} = require('../db/db.js')
const {EstadoTareaService}=require('../services/EstadoTarea.service.js')
const {TipoActividadService}=require('./TipoActividad.service.js')
// Proyecto.init({
//     nombre:{
//     temas:{
//     descripcion:{
//     version:{
//     fecha_fin:{
//     fecha_inicio:{
//
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toProyecto(proyecto){

    return {
        nombre:proyecto.nombre,
        descripcion:proyecto.descripcion,
        version:proyecto.version,
        temas:proyecto.temas,
        fecha_fin:proyecto.fecha_fin,
        fecha_inicio:proyecto.fecha_inicio
    };
}
async function getProyectos(){
    return await Proyecto.findAll({})
}
async function getProyecto(id){
    return await Proyecto.findByPk(id)
}
async function addProyecto(proyecto){
    return await Proyecto.create(toProyecto(proyecto))
}
//La idea es crear un proyecto con cosas ya definidas
//Como estados prioridades
//Estados
async function addProyectoDefault(proyecto){
    let p_db= await addProyecto(proyecto)
    let p=p_db.dataValues
    let to_do={
        nombre:"To do",
        orden:1,
        cod_proyecto:p.id
    }
    let doing={
        nombre:"doing",
        orden:2,
        cod_proyecto:p.id
    }
    let done={
        nombre:"Done",
        orden:3,
        cod_proyecto:p.id
    }
    let promises=[]
    promises.push(EstadoTareaService.addEstadoTarea(to_do))
    promises.push(EstadoTareaService.addEstadoTarea(doing))
    promises.push(EstadoTareaService.addEstadoTarea(done))
    await Promise.all(promises)
    let tp={
        id:-1,
        nombre:'soporte',
        cod_proyecto:p.id
    }
    await TipoActividadService.addTipoActividad(tp)
    return p
}
async function modProyecto(proyecto){
    return await Proyecto.update(toProyecto(proyecto),{where:{id:proyecto.id}})
}
async function delProyecto(id){
    return await Proyecto.destroy({where:{id:id}})
}
async function getProyectosWhere(where){
    return await Proyecto.findAll({where})
}

module.exports={ProyectoService:{
    getProyecto,
    getProyectos,
    delProyecto,
    addProyectoDefault,
    modProyecto,
    getProyectosWhere
}}
