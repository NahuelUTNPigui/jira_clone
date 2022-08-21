export interface Feature{
    //Feature
    id:number
    cod_use_case : number
    //Tarea
    nombre:string
    descripcion:string,
    cod_estado:number,
    backlog:boolean,
    backlog_actual:boolean,
    cod_tipo_tarea:number,
    //Info
    esfuerzo_estimado:number,
    prioridad:number,
    gravedad:number
}