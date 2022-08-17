const{UseCase} = require('../db/db.js')
// UseCase.init({
//     nombre:{
//     cod_proyecto:{
//     descripcion:{
//     cod_verificable:
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toUseCase(oUseCase){

    return {
        nombre:oUseCase.nombre,
        cod_proyecto:oUseCase.cod_proyecto,
        descripcion:oUseCase.descripcion,
        cod_verificable:oUseCase.cod_verificable
    };
}
async function getUseCases(){
    return await UseCase.findAll({})
}
async function getUseCase(id){
    return await UseCase.findByPk(id)
}
async function addUseCase(oUseCase){
    return await UseCase.create(toUseCase(oUseCase))
}
async function modUseCase(oUseCase){
    return await UseCase.update(toUseCase(oUseCase),{where:{id:UseCase.id}})
}
async function delUseCase(id){
    return await UseCase.destroy({where:{id:id}})
}
async function getUseCasesWhere(where){
    return await UseCase.findAll({where})
}
module.exports={UseCaseService:{
    getUseCase,
    getUseCases,
    delUseCase,
    addUseCase,
    modUseCase,
    getUseCasesWhere
}}

