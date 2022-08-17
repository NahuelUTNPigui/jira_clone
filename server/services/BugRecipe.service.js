const{BugRecipe} = require('../db/db.js')
// BugRecipe.init({
//     descripcion:{
//     cod_bug:{
//     orden:{
//
//por que hago esto? IS QUI I VICIS NI FUNCIONI create y update. mmmm....
function toBugRecipe(BugRecipe){
    return {
        descripcion:BugRecipe.descripcion,
        cod_bug:BugRecipe.cod_bug,
        orden:BugRecipe.orden
    };
}
async function getBugRecipes(){
    return await BugRecipe.findAll({})
}
async function getBugRecipe(id){
    return await BugRecipe.findByPk(id)
}
async function addBugRecipe(BugRecipe){
    return await BugRecipe.create(toBugRecipe(BugRecipe))
}
async function modBugRecipe(BugRecipe){
    return await BugRecipe.update(toBugRecipe(BugRecipe),{where:{id:BugRecipe.id}})
}
async function delBugRecipe(id){
    return await BugRecipe.destroy({where:{id:id}})
}
async function getBugRecipesWhere(where){
    return await BugRecipe.findAll({where})
}
module.exports={BugRecipeService:{
    getBugRecipe,
    getBugRecipes,
    delBugRecipe,
    addBugRecipe,
    modBugRecipe,
    getBugRecipesWhere
}}

