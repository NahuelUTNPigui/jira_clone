const{Tarea,UseCase,Actividad,Bug,Feature,Info} = require('../db/db.js')
// Tarea.init({
//     cod_estado:{
//     cod_info:{
//     backlog:{
//     backlog_actual
//     cod_tipo_tarea
//
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toTarea(Tarea){
    return {
        nombre:Tarea.nombre,
        descripcion:Tarea.descripcion,
        cod_estado:Tarea.cod_estado,
        cod_info:Tarea.cod_info,
        backlog:Tarea.backlog,
        cod_tipo_tarea,
        backlog_actual:Tarea.backlog_actual
    };
}
//Todo muy bien con estos metodos y funcionan pero quiero wheres
async function getTareas(cod_proyecto){
    let tareas_promise=[]
    //Busco todas las actividades
    let actividades_db=await Actividad.findAll({where:{cod_proyecto}})
    actividades_db.forEach(a_db=>{
        let a=a_db.dataValues
        tareas_promise.push(Tarea.findByPk(a.cod_tarea))
    })
    //busco todos los casos de uso
    let use_cases=await UseCase.findAll({where:{cod_proyecto}})
    use_cases.forEach(async u_c_db=>{
        let uc=u_c_db.dataValues
        //busco todos los bugs
        let bugs=await Bug.findAll({where:{cod_use_case:uc.id}})
        bugs.forEach(b_db=>{
            let b=b_db.dataValues
            tareas_promise.push(Tarea.findByPk(b.cod_tarea))
        })
        //busco todos los features
        let fts=await Feature.findAll({where:{cod_use_case:uc.id}})
        fts.forEach(f_db=>{
            let f=f_db.dataValues
            tareas_promise.push(Tarea.findByPk(f.cod_tarea))
        })
        
    })
    return await Promise.all(tareas_promise)
}
async function getTareasInfo(cod_proyecto){
    let tareas_promise=[]
    let info_promises=[]
    //Busco todas las actividades
    let actividades_db=await Actividad.findAll({where:{cod_proyecto}})
    actividades_db.forEach(a_db=>{
        let a=a_db.dataValues
        tareas_promise.push(Tarea.findByPk(a.cod_tarea))
    })
    //busco todos los casos de uso
    let use_cases=await UseCase.findAll({where:{cod_proyecto}})
    use_cases.forEach(async u_c_db=>{
        let uc=u_c_db.dataValues
        //busco todos los bugs
        let bugs=await Bug.findAll({where:{cod_use_case:uc.id}})
        bugs.forEach(b_db=>{
            let b=b_db.dataValues
            tareas_promise.push(Tarea.findByPk(b.cod_tarea))
        })
        //busco todos los features
        let fts=await Feature.findAll({where:{cod_use_case:uc.id}})
        fts.forEach(f_db=>{
            let f=f_db.dataValues
            tareas_promise.push(Tarea.findByPk(f.cod_tarea))
        })
        
    })
    let tareas=await Promise.all(tareas_promise)
    tareas.forEach(t_db=>{
        let t=t_db.dataValues
        info_promises.push(Info.findByPk(t.cod_info))
    })
    let infos=await Promise.all(info_promises)
    let tareas_info=[]
    for(let i =0;i<tareas.length;i++){
        let t=tareas[i].dataValues
        let inf=infos[i].dataValues
        let tarea_info={
            id:t.id,
            nombre:t.nombre,
            descripcion:t.descripcion,
            cod_estado:t.cod_estado,
            backlog:t.backlog,
            backlog_actual:t.backlog_actual,
            cod_tipo_tarea:t.cod_tipo_tarea,
            esfuerzo_estimado:inf.esfuerzo_estimado,
            prioridad:inf.prioridad,
            gravedad:inf.gravedad
        }
        tareas_info.push(tarea_info)
    }

    return tareas_info
}
async function getTarea(id){
    return await Tarea.findByPk(id)
}
async function modTarea(Tarea){
    return await Tarea.update(toTarea(Tarea),{where:{id:Tarea.id}})
}
async function delTarea(id){
    return await Tarea.destroy({where:{id:id}})
}
async function getTareasWhere(where){
    return await Tarea.findAll({where})
}
module.exports={TareaService:{
    getTarea,
    getTareas,
    getTareasInfo,
    delTarea,
    modTarea,
    getTareasWhere
}}
