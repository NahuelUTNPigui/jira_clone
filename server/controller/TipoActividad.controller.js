const {TipoActividadService}=require('../services/TipoActividad.service.js')
async function getTiposActividadProyecto(cod_proyecto){
    return await TipoActividadService.getTipoActividadProyecto(cod_proyecto)
}
async function addTipoActividad(tipo_actividad){
    return await TipoActividadService.addTipoActividad(tipo_actividad)
}
async function modTipoActividad(tipo_actividad){
    return await TipoActividadService.modTipoActividad(tipo_actividad)
}
async function delTipoActividad(id){
    return await TipoActividadService.delTipoActividad(id)
}
module.exports={
    TipoActividadController:{
        getTiposActividadProyecto,
        addTipoActividad,
        modTipoActividad,
        delTipoActividad
    }
}