
const{EstadoTarea,sequelize} = require('../db/db.js')
async function getEstadosTarea(){
    return await EstadoTarea.findAll({})
}
async function getEstadoTarea(id){
    return await EstadoTarea.findByPk(id)
}
async function getEstadoTareaProyecto(cod_proyecto){
    return await EstadoTarea.findAll({where:{
        cod_proyecto:cod_proyecto
    }},{order:[['orden','desc']]})
}
async function addEstadoTarea(estado_tarea){
    return await EstadoTarea.create({
        nombre:estado_tarea.nombre,
        cod_proyecto:estado_tarea.cod_proyecto,
        orden:estado_tarea.orden
    })
}
async function modEstadoTarea(estado_tarea){
    return await EstadoTarea.update({
        nombre:estado_tarea.nombre,
        cod_proyecto:estado_tarea.cod_proyecto,
        orden:estado_tarea.orden
        },{
            where:{id:estado_tarea.id}
        }
    )
}
async function delEstadoTareaOrden(orden){
    let max=await EstadoTarea.max("orden")
    let orden_i=parseInt(orden)
    try{
        const result= await sequelize.transaction(async(t)=>{
            let del_db =await EstadoTarea.destroy({where:{orden:orden},transaction:t})
            for(let i=orden_i+1;i<=max;i++){
                await EstadoTarea.update({orden:i-1},{where:{orden:i},transaction:t})
            }
            return del_db
            
        })
        return result
    }
    catch(err){
        console.log(err)
    }
    
}
async function modOrdenCambiado(estado_tarea,orden_anterior,nuevo_orden){
    try{
        const result= await sequelize.transaction(async(t)=>{
            for(let i=orden_anterior-1;i>=nuevo_orden;i--){
                await EstadoTarea.update({orden:i+1},{where:{orden:i},transaction:t})
            }
            return await EstadoTarea.update({
                nombre:estado_tarea.nombre,
                cod_proyecto:estado_tarea.cod_proyecto,
                orden:estado_tarea.orden
            },{where:{id:estado_tarea.id}})

        })
        return result
    }
    catch(err){
        console.log(err)
    }

}
async function addOrdenCambiado(estado_tarea,nuevo_orden){
    let max=await EstadoTarea.max("orden")
    
    try{
        const result= await sequelize.transaction(async(t)=>{

            for(let i=max;i>=nuevo_orden;i--){

                await EstadoTarea.update({orden:i+1},{where:{orden:i},transaction:t})
            }
            return await EstadoTarea.create({
                nombre:estado_tarea.nombre,
                cod_proyecto:estado_tarea.cod_proyecto,
                orden:estado_tarea.orden
            },{transaction:t})

        })
        return result
    }
    catch(err){
        console.log(err)
    }
}

module.exports={EstadoTareaService:{
    getEstadoTarea,
    getEstadosTarea,
    getEstadoTareaProyecto,
    addEstadoTarea,
    modEstadoTarea,
    addOrdenCambiado,
    modOrdenCambiado,
    delEstadoTareaOrden
    
}}
