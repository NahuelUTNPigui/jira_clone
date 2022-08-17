const express=require('express')
const {ProyectoController} = require('../controller/Proyectos.controller.js')
var router = express.Router();

router.use('/:id/estados',require('./EstadoTareas.routes.js'))
router.use('/:id/usecases',require('./UseCase.router.js'))
router.use('/:id/tipoactividad',require('./TipoActividad.router.js'))
router.use('/:id/actividad',require('./Actividad.routes.js'))
router.use('/:id/tareas',require("./Tarea.routes.js"))
router.get('/',async (req,res)=>{
    res.json(await ProyectoController.getAllProyectos())
})
router.get('/:id/proyecto',async (req,res)=>{
    let id=req.params.id
    if(isNaN(id)){res.json({})}
    else{
        res.json(await ProyectoController.getProyectoId(id))
    }
    
})

router.get('/nombre/:name',async (req,res)=>{
    let name=req.params.name    
    res.json(await ProyectoController.getProyectoName(name))
})
router.get('/tags/:tags',(req,res)=>{
    let tags=req.params.tags
    res.json(tags)
})
router.post('/',async (req,res)=>{
    let p=req.body
    
    res.json(await ProyectoController.addProyecto(p))
})

module.exports=router
