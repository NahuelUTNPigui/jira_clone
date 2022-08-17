const{Ticket} = require('../db/db.js')

async function getTickets(){
    return await Ticket.findAll({})
}
async function getTicket(id){
    return await Ticket.findByPk(id)
}
async function addTicket(Ticket){
    return await Ticket.create({
        nombre:Ticket.nombre,
        descripcion:Ticket.descripcion,
        cod_proyecto:Ticket.cod_proyecto,
        cod_info:Ticket.cod_info
    })
}
async function modTicket(Ticket){
    return await Ticket.update({
        nombre:Ticket.nombre,
        descripcion:Ticket.descripcion,
        cod_proyecto:Ticket.cod_proyecto,
        cod_info:Ticket.cod_info},
        {
            where:{
                id:Ticket.id
            }
        }
    )
}
async function getTicketsWhere(where){
    return await Ticket.findAll({where})
}
async function delTicket(id){
    return await Ticket.destroy({where:{id:id}})
}
module.exports={TicketService:{
    getTicket,
    getTickets,
    delTicket,
    addTicket,
    modTicket,
    getTicketsWhere
}}
