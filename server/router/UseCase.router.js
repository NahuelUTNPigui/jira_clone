const express=require('express')
const {UseCaseController} = require('../controller/UseCase.controller.js')
var router = express.Router({mergeParams: true});
router.get('/',async (req,res)=>{
    
    let cod_proyecto=req.params.id
    if(isNaN(cod_proyecto)){res.json({})}
    else {
        
        res.json(await UseCaseController.getUseCasesProyecto(cod_proyecto))
    }
})
router.get('/:id_v/criterios',async (req,res)=>{
    let cod_proyecto=req.params.id
    let id_v=req.params.id_v

    if(isNaN(cod_proyecto)|| isNaN(id_v)){res.json({})}
    else {
        
        res.json(await UseCaseController.getCriterios(id_v))
    }
})
router.get('/:id_v/countcriterios',async (req,res)=>{
    let cod_proyecto=req.params.id
    let id_v=req.params.id_v

    if(isNaN(cod_proyecto)|| isNaN(id_v)){res.json({})}
    else {
        
        res.json(await UseCaseController.countCriterios(id_v))
    }
})
router.get('/:id_v/countnoncriterios',async (req,res)=>{
    let cod_proyecto=req.params.id
    let id_v=req.params.id_v

    if(isNaN(cod_proyecto)|| isNaN(id_v)){res.json({})}
    else {
        
        res.json(await UseCaseController.countNonAceptedCriterios(id_v))
    }
})
router.post('/criterios',async(req,res)=>{
    let criterios=req.body
    res.json(await UseCaseController.addCriterios(criterios))

})
router.get('/:uc/usecase',async (req,res)=>{
    
    let cod_proyecto=req.params.id
    let cod_use_case=req.params.uc

    if(isNaN(cod_proyecto)|| isNaN(cod_use_case)){res.json({})}
    else {
        
        res.json(await UseCaseController.getUseCaseId(cod_use_case))
    }
})
router.post('/',async(req,res)=>{
    let use_case=req.body
    res.json(await UseCaseController.addUseCase(use_case))
})
module.exports=router
