const{Bug} = require('../db/db.js')
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
async function addBug(Bug){
    return await Bug.create(toBug(Bug))
}
async function modBug(Bug){
    return await Bug.update(toBug(Bug),{where:{id:Bug.id}})
}
async function delBug(id){
    return await Bug.destroy({where:{id:id}})
}
async function getBugsWhere(where){
    return await Bug.findAll({where})
}
module.exports={BugService:{
    getBug,
    getBugs,
    delBug,
    addBug,
    modBug,
    getBugsWhere
}}
