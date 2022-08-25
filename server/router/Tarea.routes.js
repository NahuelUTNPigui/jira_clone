const express=require("express")
const {TareaController}=require('../controller/Tarea.controller.js')
var router = express.Router({mergeParams: true});

//Devuelve todas las tareas de un proyecto
router.get('/all',async(req,res)=>{
    let cod_proyecto=req.params.id
    if(isNaN(cod_proyecto)){res.status(500).json([])}
    res.json(await TareaController.getAllTareas(cod_proyecto))
})
router.get('/all_info',async(req,res)=>{
    let cod_proyecto=req.params.id
    if(isNaN(cod_proyecto)){res.status(500).json([])}
    res.json(await TareaController.getAllTareasInfo(cod_proyecto))
})
router.get('/backlog',async(req,res)=>{
    let cod_proyecto=req.params.id
    if(isNaN(cod_proyecto)){res.status(500)}

})
router.get('/backlog_actual',async(req,res)=>{
    let cod_proyecto=req.params.id
    if(isNaN(cod_proyecto)){res.status(500)}

})

module.exports=router