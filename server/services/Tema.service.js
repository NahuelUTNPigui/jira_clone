const{Tema} = require('../db/db.js')
async function getTemas(){
    return await Tema.findAll({})
}
async function getTema(id){
    return await Tema.findByPk(id)
}
async function addTema(tema){
    return await Tema.create({nombre:tema.nombre})
}
async function modTema(tema){
    return await Tema.update({nombre:tema.nombre},{where:{id:tema.id}})
}
async function delTema(id){
    return await Tema.destroy({where:{id:id}})
}
module.exports={TemaService:{
    getTema,
    getTemas,
    delTema,
    addTema,
    modTema
}}
