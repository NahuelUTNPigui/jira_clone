
const {ProyectoService} = require('../services/Proyecto.service.js')
async function getAllProyectos(){
    return await ProyectoService.getProyectos()
}
async function getProyectosName(nombre){
    return await ProyectoService.getProyectosWhere({nombre})
}

//quiero buscar todos los proyectos que tengan estos temas
//ni idea como hacerlo?
async function getProyectoTema(temas){
    return {}
}
async function addProyecto(proyecto){
    return await ProyectoService.addProyectoDefault(proyecto)
    
}
async function getProyectoId(id){
    
    return await ProyectoService.getProyecto(id)
}
module.exports={
    ProyectoController:{
        getAllProyectos,
        getProyectosName,
        addProyecto,
        getProyectoId
    }
}

