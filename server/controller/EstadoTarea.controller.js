const {EstadoTareaService} =require( '../services/EstadoTarea.service.js')
async function getAllEstados(cod_proyecto){
    return EstadoTareaService.getEstadoTareaProyecto(cod_proyecto)
}
async function getAllEstadosNormalizados(cod_proyecto){
    return EstadoTareaService.getAllEstadosNormalizados(cod_proyecto)
}
async function modEstadoTarea(estado_tarea){
    return await EstadoTareaService.modEstadoTarea(estado_tarea)
}
async function addEstado(estado_tarea){
    return await EstadoTareaService.addEstadoTarea(estado_tarea)
}
async function addOrdenCambiado(estado_tarea,nuevo_orden){
    return await EstadoTareaService.addOrdenCambiado(estado_tarea,nuevo_orden)
}
async function modOrdenCambiado(estado_tarea,orden_anterior,nuevo_orden){
    return await EstadoTareaService.modOrdenCambiado(estado_tarea,orden_anterior,nuevo_orden)
}
async function delOrden(orden){
    return await EstadoTareaService.delEstadoTareaOrden(orden)
}



module.exports={
    EstadoTareaController:{
        getAllEstados,
        getAllEstadosNormalizados,
        addEstado,
        modEstadoTarea,
        addOrdenCambiado,
        modOrdenCambiado,
        delOrden
    }
}