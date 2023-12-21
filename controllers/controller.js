// Maadaama aysan jirin routers badan. Sidaa darteed, waxaan dhigay dhammaan routers-ka iyo database parameters-ka faylkan controller.js

// Waxaa loo bahanyahay objectId ga mongodb kaas oo hadhow loo isticmaalo cusboonaysiinta database-ka

var objectId = require('mongodb').ObjectID;


// Waxaa loo bahanyahay body-parser kaas oo noo ogolaanaya in aan isticmaalno req.body ka imanaya form inputs-ka iyo ku kaydinta database-ka
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });



// Waxaa loo bahanyahay mongoose si fudud oo hufan ula falgalka mongodb
var mongoose = require('mongoose');




// Ku xirmidda Cloud mongodb.Atlas database 
// mongoose.connect('mongodb+srv://shoaib:shoaib@cluster0-hgnzq.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true})

// Ku xirmidda MongoDB localhost database
mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB on localhost');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Qeexidda schema kaas oo loo isticmaali doono in lagu kaydiyo xogta
var employeeSchema =new mongoose.Schema({
    name: String,
    email: String,
    location: String,
    phone: Number,
    title: String,
    address: String,
    age: Number,
    // gender: String,
    sex: String,
    salary: Number
})



// Qeexidda model-ka
var employeeModel = mongoose.model('addEmployee', employeeSchema);



module.exports = (app)=>{
    
    //Route-ka home-ka    
    app.get('/', (req,res)=>{
        employeeModel.find({},function(err,data){
            if(err) throw err;
            res.render('index', {employee : data});
        }) 
    });
    
    
    // Codsiga Post ee in lagu daro shaqaale
    app.post('/', urlencodedParser, (req,res)=>{
          var newEmployee = employeeModel(req.body).save(function(err,data){
            if(err) throw err;
              res.redirect('/')
        })
    })
    
    

    
    // Soo helidda loogu talagalay shaqaale gaar ah   
    app.get('/:_id',(req,res)=>{
        
        employeeModel.find({_id: req.params._id},(err,data)=>{
            
        res.render('employee', {employee: data});    
        })
        
    });
    
    // Tirtiridda shaqaalaha iyadoo la waafajinayo id-ga database-ka  
    app.delete('/:_id',(req,res)=>{
        
        employeeModel.find({_id: req.params._id}).deleteOne((err,data)=>{
            if(err) throw err;
            res.json(data)
        })
        
    });
    
    
    // Cusboonaysiinta goobaha shaqaalaha  
    app.post('/:_id',urlencodedParser,(req,res)=>{
        
        
        var item = {
            name: req.body.name,
            email: req.body.email,
            sex: req.body.sex,
            address: req.body.address,
            phone: req.body.phone,
            title: req.body.title,
            salary: req.body.salary,
        }
        var id = req.params._id;
        
        employeeModel.updateOne( {"_id": objectId(id)},{$set: item},(err,data)=>{
            if(err) throw err;
            res.redirect('back')
        })
        
    });
    
};