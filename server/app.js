const express=require('express')
const cors=require('cors')
const parser=require('body-parser')

const app = express()
app.use(cors())
app.use(parser.json())

app.get('/', (req, res) => {
    res.send('Jira clone')
})
app.use('/proyectos',require('./router/Proyecto.routes.js'))
module.exports=app