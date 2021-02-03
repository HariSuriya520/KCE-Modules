const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

app.engine('mustache',mustacheExpress())
app.set('view engine','mustache')
app.set('views',__dirname+'/views')

app.use('/images',express.static(__dirname+'/views/images/'))  
app.use('/tutor',express.static(__dirname+'/views/tutor'))
app.use('/principal',express.static(__dirname+"/views/principal"))
app.use('/faculty',express.static(__dirname+"/views/faculty"))
app.use('/coe',express.static(__dirname+"/views/coe"))
app.use('/css',express.static(__dirname+'/css'))

app.get('/',(req,res)=>{
    res.render('index.mustache')
})

// Index pages
// Main index page 
app.get('/Mindex',(req,res)=>{
    res.render('Mindex.mustache')
})

// principal index page
app.get('/principal',(req,res)=>{
    res.render('principal/index.mustache')
})

// faculty index page
app.get('/faculty',(req,res)=>{
    res.render('faculty/index.mustache')
})

// coe index page
app.get('/coe',(req,res)=>{
    res.render('coe/index.mustache')
})

// tutor index page
app.get('/tutor',(req,res)=>{
    res.render('tutor/index.mustache')
})

// admin dash board
app.get('/admin',(req,res)=>{
    res.render('admin/index.mustache')
})

// COE module
// coe exam page
app.get('/coe/exam',(req,res)=>{
    res.render('coe/exam.mustache')
})

//coe result page
app.get('/coe/result',(req,res)=>{
    res.render('coe/result.mustache')
})

// coe circular page
app.get('/coe/circular',(req,res)=>{
    res.render('coe/circular.mustache')
})

// coe notification page
app.get('/coe/notification',(req,res)=>{
    res.render('coe/notification.mustache')
})

// principal
// principal announcement
app.get('/principal/announcement',(req,res)=>{
    res.render('principal/announcement.mustache')
})

// principal attendance
app.get('/principal/attendance',(req,res)=>{
    res.render('principal/attendance.mustache')
})

// principal circulars
app.get('/principal/circulars',(req,res)=>{
    res.render('principal/circulars.mustache')
})

// principal exam
app.get('/principal/exam',(req,res)=>{
    res.render('principal/exam.mustache')
})

// principal notification
app.get('/principal/notification',(req,res)=>{
    res.render('principal/notification.mustache')
})

// principal profile
app.get('/principal/profile',(req,res)=>{
    res.render('principal/profile.mustache')
})

// principal results
app.get('/principal/results',(req,res)=>{
    res.render('principal/results.mustache')
})


// faculty module
// faculty attendance
app.get('/faculty/attendance',(req,res)=>{
    res.render('faculty/attendance.mustache')
})

// faculty notification
app.get('/faculty/notification',(req,res)=>{
    res.render('faculty/notification.mustache')
})

// faculty circular
app.get('/faculty/circular',(req,res)=>{
    res.render('faculty/circular.mustache')
})

// faculty exam time table
app.get('/faculty/ett',(req,res)=>{
    res.render('faculty/exam.mustache')
})

// faculty result
app.get('/faculty/result',(req,res)=>{
    res.render('faculty/result.mustache')
})

// faculty time table
app.get('/faculty/tt',(req,res)=>{
    res.render('faculty/timetable.mustache')
})


// Tutor Module
// profile page
app.get('/tutor/profile',(req,res)=>{
    res.render('tutor/profile.mustache')
})

// tutor announcement page
app.get('/tutor/announcement',(req,res)=>{
    res.render('tutor/announcement.mustache')
})

// tutor time table page
app.get('/tutor/tt',(req,res)=>{
    res.render('tutor/timetable.mustache')
})

// tutor notification page
app.get('/tutor/notification',(req,res)=>{
    res.render('tutor/notification.mustache')
})

// tutor attendance page
app.get('/tutor/attendance',(req,res)=>{
    res.render('tutor/attendance.mustache')
})

// tutor exam time table page
app.get('/tutor/ett',(req,res)=>{
    res.render('tutor/examtt.mustache')
})

// tutor result page
app.get('/tutor/result',(req,res)=>{
    res.render('tutor/result.mustache')
})

// tutor circular page
app.get('/tutor/circular',(req,res)=>{
    res.render('tutor/circular.mustache')
})


app.listen(1234,()=>{
    console.log("server is running on port 1234")
})