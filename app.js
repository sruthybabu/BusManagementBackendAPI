const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")
const req = require("express/lib/request")
const res = require("express/lib/response")


var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var busModel=Mongoose.model("buses",

new Mongoose.Schema({
    route:String,
    busName:String,
    busRegNo:String,
    ownerName:String,
    contactNo:String
})

)
Mongoose.connect("mongodb+srv://sruthybabu:sruthy4599@cluster0.bip6a.mongodb.net/busDb")

app.post("/api/delete",(req,res)=>{
    var getId=req.body
    busModel.findByIdAndRemove(getId,
        (error,data)=>{
            if(error)
            {
                res.send({"status":error})
            }
            else
            {
                res.send({"status":"success"})
            }

        })
})

app.post("/api/search",(req,res)=>{
    var getRoute=req.body
    busModel.find(getRoute,
        (error,data)=>{
            if(error)
            {
                res.send({"status":error})
            }
            else
            {
                res.send(data)
            }

    })

})



app.post("/api/busadd",(req,res)=>{
    var getRoute=req.body.route 
    var getBusname=req.body.busName 
    var getBusregno=req.body.busRegNo 
    var getOwnername=req.body.ownerName 
    var getContactno=req.body.contactNo 
    data={"route":getRoute,"busName":getBusname,"busRegNo":getBusregno,"ownerName":getOwnername,"contactNo":getContactno}
    
    let mybus=new busModel(data)
    mybus.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
   
})


app.get("/api/busview",(req,res)=>{
    busModel.find(
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else
            {
                res.send(data)
            }

        }
    )
})

app.listen(5005,()=>{
    console.log("Server Running")
})