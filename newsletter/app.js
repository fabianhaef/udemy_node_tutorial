const express = require("express")
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https")

const { Http2ServerRequest } = require("http2");

const app = express();
const key= "550c67e1cac61d479591832d055509f1-us7"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;
     
    let data = {
        members: [
            {
                email_adress: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/95988747dd"
    options = {
        method: "POST",
        auth: "fabianhaef:550c67e1cac61d479591832d055509f1-us7"
    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function() {
            console.log(JSON.parse(data))
        })
    })

    request.write();
    request.end();
    
})

app.post("/failure", function(req, res) {
    res.redirect("/")
})

app.listen(3000, function() {
    console.log("Server started on port 3000")
})

