const{Verificable} = require('../db/db.js')
async function getVerificables(){
    return await Verificable.findAll({})
}
async function getVerificable(id){
    return await Verificable.findByPk(id)
}
//no voy a guardar nada?
async function addVerificable(){
    return await Verificable.create({})
}
async function delVerificable(id){
    return await Verificable.destroy({where:{id:id}})
}
module.exports={VerificableService:{
    getVerificable,
    getVerificables,
    delVerificable,
    addVerificable
}}
