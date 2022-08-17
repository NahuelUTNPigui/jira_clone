const {UseCaseService}=require('../services/UseCase.service.js')
const {VerificableService}=require('../services/Verificable.service.js')
const {CriterioService}=require('../services/Criterio.service.js')
async function getUseCasesProyecto(cod_proyecto){
    let where={cod_proyecto}
    return await UseCaseService.getUseCasesWhere(where)
}
async function getUseCaseId(cod_use_case){
    return await UseCaseService.getUseCase(cod_use_case)
}
async function getCriterios(cod_verificable){
    let where={
        cod_verificable
    }
    return await CriterioService.getCriteriosWhere(where)
}
async function countCriterios(cod_verificable){
    let where={
        cod_verificable
    }
    return await CriterioService.countCriterioWhere(where)
}
async function countNonAceptedCriterios(cod_verificable){
    let where={
        cod_verificable,
        aceptado:false
    }
    return CriterioService.countCriterioWhere(where)
}

async function addUseCase(use_case){
    let v_bd=await VerificableService.addVerificable()
    let cod_verificable=v_bd.id
    use_case={
        nombre:use_case.nombre,
        descripcion:use_case.descripcion,
        cod_proyecto:use_case.cod_proyecto,
        cod_verificable
    }

    return await UseCaseService.addUseCase(use_case)
    

}
async function addCriterios(criterios){
    let promises=criterios.map(c=>CriterioService.addCriterio(c))
    return await Promise.all(promises)
}
module.exports={

    UseCaseController:{
        getUseCasesProyecto,
        getUseCaseId,
        addUseCase,
        countCriterios,
        countNonAceptedCriterios,
        getCriterios,
        addCriterios
    }
}