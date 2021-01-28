const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

app.engine('mustache',mustacheExpress())
app.set('view engine','mustache')
app.set('views',__dirname+'/views')

app.use('/images',express.static(__dirname+'/views/images/'))  
app.use('/tutor',express.static(__dirname+'/views/tutor'))

app.get('/',(req,res)=>{
    res.render('index.mustache')
})


app.get('/Mindex',(req,res)=>{
    res.render('Mindex.mustache')
})

app.get('/tutor',(req,res)=>{
    res.render('tutor/index.mustache')
})

app.get('/tutor/profile',(req,res)=>{
    res.render('tutor/profile.mustache')
})

app.get('/tutor/announcement',(req,res)=>{
    res.render('tutor/announcement.mustache')
})

app.get('/tutor/tt',(req,res)=>{
    res.render('tutor/timetable.mustache')
})

app.get('/tutor/notification',(req,res)=>{
    res.render('tutor/notification.mustache')
})

app.get('/tutor/attendance',(req,res)=>{
    res.render('tutor/attendance.mustache')
})

app.get('/tutor/ett',(req,res)=>{
    res.render('tutor/examtt.mustache')
})

app.get('/tutor/result',(req,res)=>{
    res.render('tutor/result.mustache')
})

app.get('/tutor/circular',(req,res)=>{
    res.render('tutor/circular.mustache')
})

app.listen(1234,()=>{
    console.log("server is running on port 1234")
})