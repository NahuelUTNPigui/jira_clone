//argumentos
const yargs=require("yargs/yargs")
const {hideBin}=require("yargs/helpers")
const fs=require("fs")

let argv=yargs(hideBin(process.argv)).argv


//logica
const app=require('./app.js')
const fake =require( '../fake_data.json')
const {sequelize}=require('./db/db.js')
const {ProyectoService}=require('./services/Proyecto.service.js')
const {UseCaseService}=require('./services/UseCase.service.js')
const {VerificableService}=require('./services/Verificable.service.js')
const {CriterioService}=require('./services/Criterio.service.js')
const {EstadoTareaService}=require('./services/EstadoTarea.service.js')
const {TipoActividadService}=require('./services/TipoActividad.service.js')
const {ActividadService}=require("./services/Actividad.service.js")

const port=10100
async function fillFake(fake,ProyectoService,UseCaseService,CriterioService,VerificableService,EstadoTareaService,TipoActividadService){
    fake.proyectos.forEach(async (p) => {
        await ProyectoService.addProyectoDefault(p)
    });
    fake.use_cases.forEach(async(uc)=>{
        await UseCaseService.addUseCase(uc)
    })
    fake.criterios.forEach(async(c)=>{
        await CriterioService.addCriterio(c)
    })
    fake.verificables.forEach(async (v)=>{
        await VerificableService.addVerificable(v)
    })
    fake.tipoactividades.forEach(async (tp)=>{
        await TipoActividadService.addTipoActividad(tp)
    })
    fake.actividades.forEach(async (a)=>{
        await ActividadService.addNoTrans(a)
    })
    console.log(fake)

}
async function initApp(db,app,fake,ProyectoService,UseCaseService,CriterioService,VerificableService,EstadoTareaService,TipoActividadService){
    
    await db.sync({})
    if(argv.restart){
        if(fs.existsSync('./db.db')){
            fs.unlinkSync("./db.db")
        }
        await fillFake(fake,ProyectoService,UseCaseService,CriterioService,VerificableService,EstadoTareaService,TipoActividadService)
    
    }
    app.listen(port,()=>{
        console.log(`runing on ${port}`)
    })

} 
initApp(sequelize,app,fake,ProyectoService,UseCaseService,CriterioService,VerificableService,EstadoTareaService,TipoActividadService)