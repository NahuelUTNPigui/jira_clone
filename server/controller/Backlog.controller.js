const {BacklogService}=require('../services/Backlog.service.JS')
async function getBackLog(cod_proyecto){
    return await BacklogService.getBackLog(cod_proyecto)
}
async function getBackLogActual(cod_proyecto){
    return await BacklogService.getBackLogActual(cod_proyecto)
}
async function addTareaBackLogActual(cod_tarea){
    return await BacklogService.addTareaBackLogActual(cod_tarea)
}
async function addTareaBacklog(cod_tarea){
    return await BacklogService.addTareaBacklog(cod_tarea)
}
async function removeTareaBacklog(cod_tarea){
    return await BacklogService.removeTareaBacklog(cod_tarea)
}