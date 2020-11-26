const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose")
const _ = require("lodash")

const app = express();

app.set('view engine', 'ejs')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true})

const itemSchema = {
    name = String
}
const listSchema = {
    name: String,
    items: [itemSchema]
}

const Item = mongoose.model('item', itemSchema)
const List = mongoose.model('list', listSchema)

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
        name = req.body.newItem,
        items: req.body.list
    })

    if(listName === "Today") {
        item.save();
        res.redirect("/")
    } else {
        List.findOne({name: listName}, function(err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        })
    }

    itemNew.save()
    //Redirec to update with new items -> get request
    res.redirect("/")
});


app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox

    if(listName === "Today") {
        Item.findByIdAndDelete(checkedItemId, function(){
            if (!err) {
                console.log("Successfully removed Item")
            } else {
                console.log("There was an error")
            }
        })
    } else {
        List.findOneAndUpdate(
            {name: listName},
            {$pull: {items: {_id: checkedItemId}}},
            function(err, foundList) {
                if(!err) {
                    res.redirect("/" + listName)
                }
            }
        )
    }

    
})

app.get("/:customListName", function(req, res) {
    const customList = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList) {
        if(!err) {
            if(!foundList) {
                //create new list
                const list = new List({
                    name: customList,
                    items = defaultItems
                })
                list.save();
                res.redirect("/" + customListName)
            } else {
                //show existing list
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
            }
        }
    })

    res.render("list", {listTitle: customList, newListItems: workItems})
})

app.post("/work", function(req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.get("/about", function(req, res) {
    res.render("about")
})