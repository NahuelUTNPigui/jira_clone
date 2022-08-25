const {BugService}=require("../services/Bug.service.js")
async function addBug(bcpyr){
    return await BugService.addBug(bcpyr)
}
async function getAllBugUC(cod_use_case){
    return await BugService.getBugsWhere({where:{cod_use_case}})
}
async function getAllBugP(cod_proyecto){
    return await BugService.getAllBugP(cod_proyecto)
}
async function getAllBug(){
    return await BugService.getBugs()
}
module.exports={
    BugController:{
        addBug,
        getAllBug,
        getAllBugUC,
        getAllBugP
    }
}