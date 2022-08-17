
const{TareaService} = require('./Tarea.service')
async function getBackLog(cod_proyecto){
    let where={
        cod_proyecto,
        backlog:true
    }
    return await TareaService.getTareasWhere(where)
}
async function getBackLogActual(cod_proyecto){
    let where={
        cod_proyecto,
        backlog_actual:true
    }
    return await TareaService.getTareasWhere(where)
}
//me repito
function modTarea(cod_tarea,backlog,backlog_actual){
    let tarea={
        id:cod_tarea,
        backlog,
        backlog_actual
    }
    return tarea
}
async function addTareaBackLogActual(cod_tarea){
    return await TareaService.modTarea(modTarea(cod_tarea,false,true))
}
async function addTareaBacklog(cod_tarea){
    return await TareaService.modTarea(modTarea(cod_tarea,true,false))
}
async function removeTareaBacklog(cod_tarea){
    return await TareaService.modTarea(modTarea(cod_tarea,false,false))

}
module.exports={BacklogService:{
    getBackLog,
    getBackLogActual
}}
