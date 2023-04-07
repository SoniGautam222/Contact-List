const express = require("express");
const port = 8000;
const path = require("path");

const db =require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded());
app.use(express.static("assets"));

var contactList = [
  {
    name: "Soni",
    Phone: "989898989",
  },
  {
    name: "John",
    Phone: "545454545",
  },
];

app.get("/", function (req, res) {

  Contact.find({}).then(function(contacts){
    return res.render('index',{
      title: 'Contact List',
      contact_list : contacts

    });
  }).catch(function(err){
      console.log("error in fetching data");
      return ;
  });
});





app.post('/create', function(req, res) {
  Contact.create({
    name: req.body.name,
    Phone: req.body.Phone
  })
  .then(function(newContact) {
    console.log('**********' ,newContact);
    return res.redirect('back');
  })
  .catch(function(err) {
    console.log("Error is occurred while connecting towards to the database!!");
    return res.status(500).send(err);
  });
});


app.get('/delete-contact/',function(req,res){
    let id=req.query.id;
   
    Contact.findByIdAndDelete(id)
    .then(() => {
        return res.redirect('back');
    })
    .catch(err => {
        console.log("error in deleting the data from the database");
        return;
    });
   
    });

app.listen(port, function (err) {
  if (err) {
    console.log("There is an errro in running this server");
  } else {
    console.log("we are running our server on the port : ", port);
  }
});
