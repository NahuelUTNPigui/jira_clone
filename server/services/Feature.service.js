const{Feature,Info,Tarea,Criterio,Verificable,sequelize} = require('../db/db.js')
// Feature.init({
    // nombre:{
    //   },descripcion:{
    //   },cod_verificable:{
    //   },cod_tarea:{
    //   },cod_use_case:{
    
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toFeature(Feature){
    return {
        cod_verificable:Feature.cod_verificable,
        cod_tarea:Feature.cod_tarea,
        cod_use_case:Feature.cod_use_case
    };
}
async function getFeatures(){
    return await Feature.findAll({})
}
async function getFeature(id){
    return await Feature.findByPk(id)
}
/*
    //Feature
    id:number
    cod_use_case : number
    //Tarea
    nombre:string
    descripcion:string,
    cod_estado:number,
    backlog:boolean,
    backlog_actual:boolean,
    cod_tipo_tarea:number,
    //Info
    esfuerzo_estimado:number,
    prioridad:number,
    gravedad:number
    //Criterio
    id:number,
    nombre:string,
    cod_verificable:number,
    aceptado:boolean
*/
async function addFeature(fyc){
    try{
        const res=await sequelize.transaction(async t=>{
            let v_db=await Verificable.create({},{transaction:t})
            let promesas = fyc.criterios.map(c=>Criterio.create({nombre:c.nombre,aceptado:c.aceptado,cod_verificable:v_db.dataValues.id},{transaction:t}))
            const c_db=await Promise.all(promesas)
            let info_db=await Info.create({
                esfuerzo_estimado:fyc.feature.esfuerzo_estimado,
                gravedad:fyc.feature.gravedad,
                prioridad:fyc.feature.prioridad
            },{transaction:t})
            let tarea_db=await Tarea.create({
                nombre:fyc.feature.nombre,
                descripcion:fyc.feature.descripcion,
                cod_estado:fyc.feature.cod_estado,
                backlog:true,
                backlog_actual:false,
                cod_info:info_db.dataValues.id
            },{transaction:t})

            let f=await Feature.create({
                cod_use_case:fyc.feature.cod_use_case,
                cod_tarea:tarea_db.dataValues.id,
                cod_verificable:v_db.dataValues.id

            },{transaction:t})
            let fyc_db={
                feature:f,
                criterios:c_db.map(c=>c.dataValues)
            }
            return fyc_db
            
        })
        return res

    }catch(err){
        console.log(err)
        return {}
    }
}
async function modFeature(Feature){
    return await Feature.update(toFeature(Feature),{where:{id:Feature.id}})
}
async function delFeature(id){
    return await Feature.destroy({where:{id:id}})
}
async function getFeaturesWhere(where){
    return await Feature.findAll(where)
}
module.exports={FeatureService:{
    getFeature,
    getFeatures,
    delFeature,
    addFeature,
    modFeature,
    getFeaturesWhere
}}
