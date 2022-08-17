const {ActividadService}=require("../services/Actividad.service.js")
async function addActividad(actividad){
    await ActividadService.addActividad(actividad)
}