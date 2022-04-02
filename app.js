require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const ACCEES_PASSWORD_MONGODB=process.env.ACCEES_PASSWORD_MONGODB
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Student = require('./model/student')
const student = require('./model/student')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(`mongodb+srv://tienhung1:${ACCEES_PASSWORD_MONGODB}@pallgree.be2rz.mongodb.net/pallgree?retryWrites=true&w=majority`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })


app.post('/search',(req,res)=>{
    let _query = req.body.query
    console.log(_query)
   Student.find({"name": {"$regex": _query}},(err,data)=>{
       res.json({data})
   })
})

app.route('/student')
    .get((req,res)=>{
        Student.find({},(err,data)=>{
            res.json({data})
    }) 
})
    .post((req,res)=>{
        let _name = req.body.name
        let _age = req.body.age
        let student= new Student({name: _name ,age: _age})
        student.save()
               .then((data)=>{
                   res.json({mss:'da luu vao db'})
               })
               .catch((e)=>{
                res.json({mss:e})
            })
    })





app.listen(PORT,()=>{
    console.log(`Server start in port ${PORT}`);
})