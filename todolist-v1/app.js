const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose")

const app = express();

app.set('view engine', 'ejs')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true})

const itemSchema = {
    name = String
}

const Item = mongoose.model('item', itemSchema)

const item1 = new Item({
    name = "Welcome to your todo list"
})

const item2 = new Item({
    name = "Welco T baar"
})


const item3 = new Item({
    name = "Hit the utton"
})

const defaultItems = [item1, item2, item2]

app.get("/", function(req, res) {
    // finds every item 
    Item.find({}, function(err, foundItems) {
        if(foundItems.length === 0) {
            Item.insertMany({
                defaultItems, function(err) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("There was no error")
                    }
                }
            })
            res.redirect("/")
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems})
        }
    })
})


app.listen(3000, function() {
    console.log("Server started on port 3000")

    
});

app.post("/", function(req, res) {
    const itemNew = new Item({
        name = req.body.newItem
    })
    itemNew.save()
    //Redirec to update with new items -> get request
    res.redirect("/")
});


app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox
    Item.findByIdAndDelete(checkedItemId, function(){
        if (!err) {
            console.log("Successfully removed Item")
        } else {
            console.log("There was an error")
        }
    })
})

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.post("/work", function(req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about", function(req, res) {
    res.render("about")
})