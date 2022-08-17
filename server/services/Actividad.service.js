const{Actividad,Tarea,Info,sequelize} = require('../db/db.js')
// nombre:{
//  
//   },cod_tarea:{
//   },cod_tipo_actividad:{
//   },cod_proyecto:{
    
//Necesito el db de info para guardar
//Necesito el db de tarea para guardar
//Necesito el dn de Actividad para guardar

//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toActividad(Actividad){
    return {
        cod_tipo_actividad:Actividad.cod_tipo_actividad,
        cod_tarea:Actividad.cod_tarea,
        cod_proyecto:Actividad.cod_proyecto
    };
}
async function getActividads(){
    return await Actividad.findAll({})
}
async function getActividad(id){
    return await Actividad.findByPk(id)
}
//Actividad tiene la forma
/*
    id:number,
    //Actividad
    tipo_actividad:number,
    cod_proyecto:this.idP,
    //Tarea
    nombre:string
    descripcion:string,
    cod_estado:number,
    backlog:boolean,
    backlog_actual:boolean,
    cod_tipo_tarea:number,
    //Hago la union de 3 clases para que sea mas facil guardarlo
    //Info
    esfuerzo_estimado:number,
    prioridad:number,
    gravedad:number
*/
async function addNoTrans(actividad){
    try{
        let info_db=await Info.create({
            esfuerzo_estimado:actividad.esfuerzo_estimado,
            gravedad:actividad.gravedad,
            prioridad:actividad.prioridad
        })
        let tarea_db=await Tarea.create({
            nombre:actividad.nombre,
            descripcion:actividad.descripcion,
            cod_estado:actividad.cod_estado,
            backlog:true,
            backlog_actual:false,
            cod_tipo_tarea:1,
            cod_info:info_db.dataValues.id
        })
        
        let actividad_db=await Actividad.create({
            cod_proyecto:actividad.cod_proyecto,
            cod_tipo_actividad:actividad.tipo_actividad,
            cod_tarea:tarea_db.dataValues.id
        })
        return actividad_db
    }
    catch(err){
        console.log(err)
    }
}
async function addActividad(actividad){
    console.log(actividad)
    try{
        const result=await sequelize.transaction(async (t)=>{
            //Primero guardo la info
            let info_db=await Info.create({
                esfuerzo_estimado:actividad.esfuerzo_estimado,
                gravedad:actividad.gravedad,
                prioridad:actividad.prioridad
            },{transaction:t})
            let tarea_db=await Tarea.create({
                nombre:actividad.nombre,
                descripcion:actividad.descripcion,
                cod_estado:actividad.cod_estado,
                backlog:true,
                backlog_actual:false,
                cod_tipo_tarea:1,
                cod_info:info_db.dataValues.id
            },{transaction:t})
            
            let actividad_db=await Actividad.create({
                cod_proyecto:actividad.cod_proyecto,
                cod_tipo_actividad:actividad.tipo_actividad,
                cod_tarea:tarea_db.dataValues.id
            })
            return actividad_db
        })
        return result
    }catch(err){
        console.log(err)
    }

    return await Actividad.create(toActividad(Actividad))
}
//Deberia modificar la tarea e info asociada
async function modActividad(Actividad){
    return await Actividad.update(toActividad(Actividad),{where:{id:Actividad.id}})
}
//Deberia eliminar la tarea e info asociada
async function delActividad(id){
    return await Actividad.destroy({where:{id:id}})
}
async function getActividadsWhere(where){
    return await Actividad.findAll({where})
}
module.exports={ActividadService:{
    getActividad,
    getActividads,
    delActividad,
    addActividad,
    modActividad,
    addNoTrans,
    getActividadsWhere
}}
