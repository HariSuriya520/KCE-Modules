const express = require('express')
const app = express()
const firebase = require('firebase-admin')
const service = require('./serviceAccountKey.json')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser');
const { Context } = require('mustache')

firebase.initializeApp({
	credential : firebase.credential.cert(service),
    databaseURL: "https://kceian-3bf3a-default-rtdb.firebaseio.com"
})

app.engine('mustache',mustacheExpress())
app.set('view engine','mustache')
app.set('views',__dirname+'/views')

app.use('/images',express.static(__dirname+'/views/images/'))  
app.use('/tutor',express.static(__dirname+'/views/tutor'))
app.use('/principal',express.static(__dirname+"/views/principal"))
app.use('/faculty',express.static(__dirname+"/views/faculty"))
app.use('/coe',express.static(__dirname+"/views/coe"))
app.use('/css',express.static(__dirname+'/css'))
app.use('/sheetjs',express.static(__dirname+'/sheetjs'))
app.use('/admin',express.static(__dirname+'/views/admin/'))
app.use('/ca/createfaculty',express.static(__dirname+'/views/admin/'))
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(req,res)=>{
    res.render('index.mustache')
})

var announceRef = firebase.database().ref('annoucement');

function announce(ann,name,res){
	var month=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
	var d = new Date();
	var fullDate = d.getDate()+'-'+month[d.getMonth()]+'-'+d.getFullYear() 
	var fullTime="";
	
	if(0<=d.getHours() && d.getHours()<=12){
		if(d.getHours()==0){
	    	fullTime=d.getHours()+12+":"+d.getMinutes()+" AM";
	    }
	    else{
	    	fullTime=d.getHours()+":"+d.getMinutes()+" AM";
	    }
	}
	else{
		fullTime=d.getHours()-12+":"+d.getMinutes()+" PM";
	}

	announceRef.push().set({
		annoucement:ann,
		date: fullDate,
		time: fullTime,
		user: name
	},function(error){
		if(!error){
			res.render('tutor/announcement',{msg:'Annoucement Updated Successfully.'})
		}
		else{
			console.log("Check your connection, Data insert is failed");
		}
	})
}

// Index pages
// Main index page 
app.get('/Mindex',(req,res)=>{
    res.render('Mindex.mustache')
})

// create account
app.get('/ca',(req,res)=>{
    res.render('admin/CreateAccount.mustache')
})

// create faculty account
app.get('/ca/faculty',(req,res)=>{
    res.render('admin/CreateAccountF.mustache')
})

// add faculty to database
app.post('/ca/create',(req,res)=>{
    var name,id,dept,sec,batch,subjects,email,pass;
    name = req.body.name
    id = req.body.id
    dept = req.body.dept
    sec = req.body.sec
    batch = req.body.batch
    subjects = req.body.subjects
    email = req.body.email
    pass = req.body.pass

    var facRef = firebase.database().ref('fdetails/');
    var login = firebase.database().ref('flogin/');

    facRef.child(id).set({
		fname: name,
        fid :id,
		fdept: dept,
		fsec: sec,
		fbatch: batch,
        fsub : subjects,
        femail : email
	},function(error){
		if(!error){
			res.render('admin/CreateAccountF.mustache',{msg:'Faculty Details Updated Successfully.'})
		}
		else{
			console.log("Check your connection, Data insert is failed");
		}
	})
    
    login.child(id).set({
        fpass: pass
    })
})

function encptdate(){
    var date = new Date();
    return date.getDate()+date.getMonth()+date.getFullYear()
}

app.post('/check',(req,res)=>{
    var id = req.body.uid
    var pass = req.body.upass
    var fref = firebase.database().ref('flogin/'+id)
    fref.on("value",function(snapshot){
        var p = snapshot.val()
        if(p==null){
            res.send('failed')
        }else{
            if(p.fpass==pass){
                res.send('done')
            }
            else{
                res.send('failed')
            }
        }
        
    })
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


app.post('/tutor/announcement',(req,res)=>{
    var ann = req.body.ann;
    var name = req.body.nam_ann;
    announce(ann,name,res)
})

// tutor time table page
app.get('/tutor/tt',(req,res)=>{
    res.render('tutor/timetable.mustache')
})

app.post('/tutor/ctt',(req,res)=>{
    var year = req.body.year
    var datajs = JSON.stringify(req.body)
    var ctt = firebase.database().ref('ctt')
    var data=  JSON.parse(datajs)
    ctt.child(year).set(data)
    
    if(req.body==null){
        res.send('request failed \n')
    }
    else{
        res.send("Successfully updated.")
    }

})

// tutor notification page
app.get('/tutor/notification',(req,res)=>{
    var greets = {
        "greet":[
            {"murali":"hello"},
            {"murali": "hi"}
        ]
    }
    res.render('tutor/notification.mustache',greets)
})

// tutor attendance page
app.get('/tutor/attendance',(req,res)=>{
    res.render('tutor/attendance.mustache')
})

app.post('/tutor/addattendance',(req,res)=>{

    var data = req.body
    console.log(data)
    res.send('ok')
})

// tutor exam time table page
app.get('/tutor/ett',(req,res)=>{
    res.render('tutor/examtt.mustache')
})

app.post('/tutor/ett',(req,res)=>{
    var year = req.body.year
    var datajs = JSON.stringify(req.body)
    var ett = firebase.database().ref('ett')
    var data=  JSON.parse(datajs)
    ett.child(year).set(data)
    
    if(req.body==null){
        res.send('request failed \n')
    }
    else{
        res.send("Successfully updated.")
    }
})

// tutor result page
app.get('/tutor/result',(req,res)=>{
    res.render('tutor/result.mustache')
})

// tutor circular page
app.get('/tutor/circular',(req,res)=>{
    res.render('tutor/circular.mustache')
})

// tutor od page
var dataArr = []
var count = 0;
var onDuty = firebase.database().ref('onduty/');
onDuty.on("value",(snapshot)=>{
    dataArr=[]
    var data; 
    snapshot.forEach((ss)=>{
        data=ss.val()
        genData(ss.key,data)
    })  
})

function genData(k,gd){
 //   console.log(gd)
    count++
    if(!gd.tutorApproved){
        var childData = {}
        var d = gd.date
        var fd = gd.fromDate
        var td = gd.toDate
        var r = gd.reason
        childData.key = k
        childData.id=count
        childData.date=d
        childData.fromDate = fd
        childData.toDate = td
        childData.reason = r
        dataArr.push(childData)
    }
}

app.get('/tutor/od',(req,res)=>{
    var data = {}
    data.oddata = dataArr
    res.render('tutor/od.mustache',data)  
})

app.post('/tutor/od',(req,res)=>{
    var request = req.body.msg;
    var key = req.body.key
    odmodify = firebase.database().ref('onduty/'+key);
    if(request == "accept"){
        odmodify.update({
            'tutorApproved':true,
            'tutorApprovedDate': today()
        })
    }
    else if(request=="deny"){
        odmodify.remove()
    }
})


function today(){
    var d = new Date()
    return d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()
}


var leaveDataArr = []
var lvcount = 0;
var ll = firebase.database().ref('ll/');
ll.on("value",(snapshot)=>{
    leaveDataArr=[]
    var data; 
    snapshot.forEach((ss)=>{
        data=ss.val()
        genLeaveData(ss.key,data)
    })  
})

function genLeaveData(k,gd){
 //   console.log(gd)
    lvcount++
    if(!gd.tutorApproved){
        var childData = {}
        var d = gd.date
        var rn = gd.rollno
        var fd = gd.fromDate
        var td = gd.toDate
        var r = gd.reason
        childData.key = k
        childData.rollno = rn
        childData.id=lvcount
        childData.date=d
        childData.fromDate = fd
        childData.toDate = td
        childData.reason = r
        leaveDataArr.push(childData)
    }
}

app.get('/tutor/leaveletter',(req,res)=>{
    var data = {}
    data.lldata = leaveDataArr
    res.render('tutor/ll.mustache',data)  
})

app.post('/tutor/ll',(req,res)=>{
    res.send('ok')
})

// tutor add student page
app.get('/tutor/addstu',(req,res)=>{
    res.render('tutor/addstu.mustache')
})

app.post('/tutor/addstu',(req,res)=>{
    var name,rollno,dept,year,phn,email,pass;
    name = req.body.stuname
    rollno = req.body.sturoll
    dept = req.body.dept
    year = req.body.year
    phn = req.body.stuphn
    email = req.body.stuemail
    pass = req.body.stupass

    var stuRef = firebase.database().ref('studetails/');
    var login = firebase.database().ref('login/');

    stuRef.child(rollno).set({
		stuname: name,
		sturoll: rollno,
		studept: dept,
		stuyear: year,
        stuphn : phn,
        stuemail : email
	},function(error){
		if(!error){
			res.render('tutor/addstu',{msg:'Student Details Updated Successfully.'})
		}
		else{
			console.log("Check your connection, Data insert is failed");
		}
	})
    
    login.child(rollno).set({
        stupass: pass
    })

})

var studataArr={}
var studataarr=[]

app.get('/tutor/studata/',(req,res)=>{

    var stuRef = firebase.database().ref('studetails/');
    stuRef.on("value",(snapshot)=>{
        var data=""
        studataarr = []
        snapshot.forEach((ss)=>{
            data=ss.val()
            getStudata(data)
        })
        
    })
    studataArr.data = studataarr
    res.render('tutor/studata.mustache',studataArr)
})

function getStudata(data){
    var d = {}
  
    d.roll= data.sturoll
    d.name =  data.stuname
    d.phn = data.stuphn
    d.email = data.stuemail
    studataarr.push(d)
}

app.listen(1234,()=>{
    console.log("server is running on port 1234")
})

