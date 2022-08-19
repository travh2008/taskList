const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
const date = require(__dirname + "/date.js"); //local module

//Questions to study
// How do I use the req.body.task from the post, in the render.
const items = ['Buy Food','Cook Food','Eat Food'];
let workItems = [];

app.get('/', function(req,res){
    let today_formatted = date.getDate();
    res.render('list',{listTitle: today_formatted,newListItem: items});
});


app.post('/',function(req,res){
    const item = req.body.newItem;
    console.log(req.body);
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.listen(port, function(req,res){
    console.log(`Node.js app listening on port ${port}.`);
});

app.get('/work', function(req,res){
    res.render('list',{listTitle: 'Work',newListItem:workItems});
});

app.post('/work',function(req,res){
    let item = req.body.newItem;
    console.log(req.body);
    workItems.push(item);
    res.redirect('/work');
});

app.get("/about", function(req,res){
    res.render("about");
})