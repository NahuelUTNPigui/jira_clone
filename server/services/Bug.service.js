const{Bug,Criterio,BugRecipe,Precondicion,Verificable,Tarea,Info,UseCase,sequelize} = require('../db/db.js')
// Bug.init({
    // nombre:{
    //   },descripcion:{
    //   },cod_verificable:{
    //   },cod_tarea:{
    //   },cod_use_case:{
    
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toBug(Bug){
    return {
        cod_verificable:Bug.cod_verificable,
        cod_tarea:Bug.cod_tarea,
        cod_use_case:Bug.cod_use_case
    };
}
async function getBugs(){
    return await Bug.findAll({})
}
async function getBug(id){
    return await Bug.findByPk(id)
}
/*
    El formato del bug es:
        id:-1,
        cod_use_case:this.cod_use_case,
        nombre:this.nombre,
        descripcion:this.descripcion,
        cod_estado:this.idEstado,
        backlog:true,
        backlog_actual:false,
        cod_tipo_tarea:3,
        gravedad:this.gravedad,
        esfuerzo_estimado:this.esfuerzo_estimado,
        prioridad:this.prioridad
*/
async function addBug(bcpyr){
    try{

        let res=await sequelize.transaction(async t=>{
            let v_db=await Verificable.create({})
            let promesas=bcpyr.criterios.map(c=>Criterio.create({nombre:c.nombre,aceptado:c.aceptado,cod_verificable:v_db.dataValues.id},{transaction:t}))
            const c_db=await Promise.all(promesas)
            let info_db=await Info.create({
                esfuerzo_estimado:bcpyr.bug.esfuerzo_estimado,
                gravedad:bcpyr.bug.gravedad,
                prioridad:bcpyr.bug.prioridad
            },{transaction:t})
            let tarea_db=await Tarea.create({
                nombre:bcpyr.bug.nombre,
                descripcion:bcpyr.bug.descripcion,
                cod_estado:bcpyr.bug.cod_estado,
                backlog:true,
                backlog_actual:false,
                cod_info:info_db.dataValues.id
            },{transaction:t})
            let bug_db=await Bug.create({
                cod_verificable:v_db.dataValues.id,
                cod_tarea:tarea_db.dataValues.id,
                cod_use_case:bcpyr.bug.cod_use_case
            },{transaction:t})
            promesas=bcpyr.precondiciones.map(p=>Precondicion.create({condicion:p.condicion,cod_bug:bug_db.dataValues.id},{transaction:t}))
            let p_db=await Promise.all(promesas)
            promesas=bcpyr.bug_recipe.map(br=>BugRecipe.create({descripcion:br.descripcion,orden:br.orden,cod_bug:bug_db.dataValues.id},{transaction:t}))
            let br_db=await Promise.all(promesas)
            return {
                bug:bug_db.dataValues,
                criterios:c_db.map(c=>c.dataValues),
                precondiciones:p_db.map(p=>p.dataValues),
                bug_recipe:br_db.map(br=>br.dataValues)
            }
        })
        return res
    }
    catch(err){
        console.log(err)
        return {}
    }


}
//Nunca vas a modificar un bug dada sus caracteristicas,onda va a ser distinto
async function modBug(Bug){
    return await Bug.update(toBug(Bug),{where:{id:Bug.id}})
}
//Debo eliminar todo lo que esta incluido en el bug
async function delBug(id){
    return await Bug.destroy({where:{id:id}})
}
async function getAllBugP(cod_proyecto){
    const uc_db=await UseCase.findAll({where:{cod_proyecto}})
    let promesas_bugs=[]

    uc_db.forEach(uc=>{
        promesas_bugs.push(Bug.findAll({where:{cod_use_case:uc.dataValues.id}}))
    })
    return await Promise.all(promesas_bugs)

}
async function getBugsWhere(where){
    return await Bug.findAll(where)
}
module.exports={BugService:{
    getBug,
    getBugs,
    delBug,
    addBug,
    getBugsWhere,
    getAllBugP
}}
