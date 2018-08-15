var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test blog",
//     image: "https://images.unsplash.com/photo-1470114510979-0a6062f10aee?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d35f3efee2ece6aa12b4af332c407abd&auto=format&fit=crop&w=750&q=80",
//     body: "Hello this is  blog post!"
// });
//RESTFUL ROUTES
app.get("/", function (req, res) {
    res.redirect("/blogs");
});
//Index Route
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("Error!");
            console.log(err);
        } else {
            res.render("index", {blogs:blogs});
        }
    });
});
//New Route
app.get("/blogs/new", function(req, res){
    res.render("new");
});
//Create Route
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("Error!");
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});
//Show Route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog:foundBlog});
        }
    });
});
//Server Startup
app.listen(3000, function () {
    console.log("Server Started");
});