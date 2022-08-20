const {ActividadService}=require("../services/Actividad.service.js")
/*La actividad del cliente
backlog: true
backlog_actual: false
cod_estado: 3
cod_proyecto: 1
cod_tipo_tarea: 1
descripcion: "121"
esfuerzo_estimado: 1
gravedad: 1
id: -1
nombre: "fsfas"
prioridad: 1
tipo_actividad: 1
*/
async function addActividad(actividad){

    return await ActividadService.addActividad(actividad)
}
async function getActividadesProyecto(cod_proyecto){
    return await ActividadService.getActividadesWhere({where:{cod_proyecto}})
}
module.exports={
    ActividadController:{
        addActividad,
        getActividadesProyecto
    }
}