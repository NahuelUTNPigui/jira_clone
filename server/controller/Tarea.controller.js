const {TareaService}=require('../services/Tarea.service.js')

//Devuelve las tareas de un proyecto
async function getAllTareas(cod_proyecto){
    return await TareaService.getTareas(cod_proyecto)
}
//Devuelve las tareas con info de un proyecto
async function getAllTareasInfo(cod_proyecto){
    return await TareaService.getTareasInfo(cod_proyecto)
}
module.exports={
    TareaController:{
        getAllTareas,
        getAllTareasInfo
    }
}