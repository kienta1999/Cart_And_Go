const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

let menu = [
    {"name": "Banh Mi", "price": 8.99, "id": 0, "href": "https://i2.wp.com/fullofplants.com/wp-content/uploads/2020/02/best-vegan-banh-mi-with-pulled-king-oyster-mushrooms-tofu-soy-sauce-pickled-veggies-thumb-3.jpg?fit=1400%2C1400&ssl=1"},
    {"name": "Bun Cha", "price": 10.99, "id": 1, "href": "https://znews-photo.zadn.vn/w660/Uploaded/mdf_eioxrd/2020_07_28/106913902_280799053141444_651086272240957371_n_1.jpg"},
    {"name": "Pho", "price": 10.99, "id": 2, "href": "https://www.hoidaubepaau.com/wp-content/uploads/2016/07/mo-quan-pho-bo.jpg"},
    {"name": "Hotpot", "price": 22.99, "id": 3, "href": "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/tinh/chuoi-nha-hang-hotpot-story-hcm/chuoi-nha-hang-hotpot-story-1.jpg"},
    {"name": "Banh Cuon", "price": 7.99, "id": 4, "href": "https://cdn.huongnghiepaau.com/wp-content/uploads/2020/04/chuyen-de-banh-cuon-nong-banh-uot-long-ga.jpg"},
    {"name": "Bun Dau", "price": 7.99, "id": 5, "href": "https://beptruong.edu.vn/wp-content/uploads/2018/06/bun-dau-mam-tom-thap-cam.jpg"},
    {"name": "Sticky Rice", "price": 4.99, "id": 6, "href": "https://monngonmoingay.tv/wp-content/uploads/2017/05/cach-nau-xoi-man.jpg"},
    {"name": "Spring Rolls", "price": 4.99, "id": 7, "href": "https://image-us.eva.vn/upload/1-2019/images/2019-01-31/ava-1548909996-834-width640height480-auto-crop-watermark.jpg"},
    {"name": "Beef Lo Mein", "price": 9.99, "id": 8, "href": "https://soupeduprecipes.com/wp-content/uploads/2020/08/how-to-make-cantonese-beef-lomein-stir-fry-noodles-recipe.png"},
    {"name": "Tonkatsu Ramen", "price": 11.99, "id": 9, "href": "https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg"},
    {"name": "Jajangmyeon", "price": 11.99, "id": 10, "href": "https://www.ohmyfoodrecipes.com/wp-content/uploads/2020/08/korean-jajanmyeon.jpg"},
    {"name": "Pad Thai", "price": 11.99, "id": 11, "href": "https://jennifercooks.com/wp-content/uploads/2015/10/pad-thai-recipe-2.jpg"},
];

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'images')));


//Connect to MongoDB database
mongoose.connect('mongodb+srv://talekien1710:Kien12345678@@cluster0.lg9ze.mongodb.net/cart_and_go?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//User schema
const User = new Schema({
    author: ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: String,
    email: String,
    date: { type: Date, default: Date.now }
});
const userModel = mongoose.model('users', User);
  

//Login/Signup/Main
//------------------------------------------------------------------------------------
let username = null;
let messageLogin = "";

app.get('/', (req, res) => {
    if(username == null){
        // res.sendFile(path.join(__dirname, "login.html"));
        res.render('login', {message: messageLogin});
    }
    else{
        res.render('main', {name: username, menu: menu, cart: cart});
    }
});


app.post('/login', (req, res) => {
    console.log(res.body);
    let username_input = req.body.username;
    let password = req.body.password;
    userModel.findOne({username: username_input}, (err, user) => {
        if(err){ 
            console.log(err);
            res.send(err);
        }
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    console.log("user: " + user.username + " just login");
                    username = username_input;
                    res.redirect('/');
                }
                else{
                    console.log("Incorrect Password");
                    messageLogin = "Wrong password";
                    res.redirect('/');
                }
            });
            
        }
        else{
            // res.send("Username is wrong");
            messageLogin = "Wrong username";
            res.redirect('/');
        }
    })
});


app.post('/signup', (req, res) => {
    console.log(res.body);
    let username_input = req.body.username;
    let password = req.body.password;
    let fullname = req.body.fullname;
    let email =  req.body.email;
    userModel.findOne({username: username_input}, (err, user) =>{
        if(err) res.send(err);
        if(user){
            console.log("User duplicate, cant sign up");
            messageLogin = "*** Duplicate Username ***";
            res.redirect("/");
        }
        else{
            
            bcrypt.hash(password, saltRounds, function(err, hash) {
                const newUser = new userModel({username: username_input, password: hash, fullname: fullname, email: email});
                newUser.save( (err, user) => {
                    if(err){ 
                        console.log(err);
                        res.send(err);
                    }
                    else{
                        console.log("user: " + user.username + " saved to db");
                        username = username_input;
                        res.redirect('/');
                    }
                });
            });

        }
    });
    
    
})

//------------------------------------------------------------------------------------
//Forget password
app.get("/forget", (req, res) => {
    res.render('forget')
});
app.post("/forget", (req, res) => {
    userModel.findOne({username: req.body.username, email: req.body.email}, (err, user) => {
        if(err){
            res.send(err)
        }
        if(user){
            bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
                if(result){
                    bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
                        if(err) res.send(err)
                        console.log(hash);
                        userModel.findOneAndUpdate({username: req.body.username, email: req.body.email}, {$set:{'password': hash}}, {new:true}, (err, doc) => {
                            if(err) res.send(err)
                        } );
                    });
                    messageLogin = "Password updated. Password change success."
                    res.redirect("/")
                }
                else{
                    messageLogin = "Wrong old password. Password change failed."
                    res.redirect("/")
                }
            });
        }
        else{
            messageLogin = "Username/email not found. Password change failed."
            res.redirect("/")
        }
    });
});

//Cart 
//------------------------------------------------------------------------------------
let cart = []; //"name": ..., "price": ..., "href": ..., "id": ..., "quantity": ...
let total = 0;

app.post("/cart", (req, res) => {
    menu.forEach(element => {
        // console.log("Element with id " + element.id + " has quantity: " + req.body[element.id + ""]);
        let quantity = Number(req.body[element.id + ""])
        if(quantity != 0){
            let canFind = cart.find(elementCart => elementCart.id == element.id)
            if(canFind){
                canFind.quantity += quantity
            }
            else{
                cart.push({"name": element.name, "price": element.price, "href": element.href, "id": element.id, "quantity": quantity});
            }
            total += quantity * element.price;
        }
    })
    res.redirect("/cart");
});

app.post("/deleteCart", (req, res) =>{
    cart = removeItemOnce(cart, req.body.id)
    res.redirect("/cart")
})

app.get("/cart", (req, res) => {
    res.render('cart', {name: username, cart: cart, total: total});
});

//Logout
//------------------------------------------------------------------------------------
app.post('/logout', (req, res) => {
    username = null;
    messageLogin = "";
    cart = [];
    total = 0;
    resultJson = null;
    searchResult = null;
    res.redirect("/");
});


//Drink
//------------------------------------------------------------------------------------
app.get("/drinks", (req, res) => {
    res.render('drinks');
});

//Famous Cuisine
//------------------------------------------------------------------------------------
app.get("/specialty", (req, res) => {
    res.render('specialty');
});


//Nearby Food/restaurant
//------------------------------------------------------------------------------------
//Yelp
//Client ID: TFEzq6Fp4-AlYPvbTNXuDQ
//API Key: gYqE8LbilhrllI2Q_BtOxHAi1zGrDyWqIttqgFAl0-5cQ5aUp5Pz5eVG4_C0xyeJSrGnKx6aVVI9e8R4Xyc1-JrUR7eMjECKtUxCvPdjBvSFuNTdDPJe2vRngYnPX3Yx
'use strict';
 
const yelp = require('yelp-fusion');
const client = yelp.client('gYqE8LbilhrllI2Q_BtOxHAi1zGrDyWqIttqgFAl0-5cQ5aUp5Pz5eVG4_C0xyeJSrGnKx6aVVI9e8R4Xyc1-JrUR7eMjECKtUxCvPdjBvSFuNTdDPJe2vRngYnPX3Yx');
let searchResult = null

app.get("/nearby", (req, res) => {
    res.render('nearby', {result: searchResult});
});

app.post("/nearby", (req, res) => {
    client.search({
        location: req.body.location,
        limit: 50
      })
      .then(response => {
        if(response.statusCode >= 200 && response.statusCode <= 299){
            console.log(response.jsonBody.businesses);
            searchResult = response.jsonBody.businesses
            res.redirect("/nearby");
        }
      })
      .catch(e => {
        console.log(e);
        searchResult = null
        res.redirect("/nearby");
      });
      
});

//Orders view
//------------------------------------------------------------------------------------
const Order = new Schema({
    author: ObjectId,
    username: String,
    foodId: [String],
    quantity: [Number],
    total: Number,
    date: { type: Date, default: Date.now }
});
const orderModel = mongoose.model('orders', Order);

app.get("/order", (req, res) => {
    orderModel.find({username:username}, (err, order) => {
        if(!err){
            res.render('order', {order: order});
        }
        else{
            res.send(err);
        }
    })
});

app.get("/order/:id", (req, res) => {
    orderModel.findById(req.params.id, (err, order) => {
        if(!err){
            res.render('orderDetail', {order: order, menu: menu});
        }
        else{
            res.send(err);
        } 
    })
});

app.post("/order", (req, res) => {
    cart = []
    let allFoodName = []
    let allFoodId = []
    let allQuantity = []

    menu.forEach(element => {
        if(req.body["id-" + element.id]){
            allFoodName.push(req.body["name-" + element.id])
            allFoodId.push(req.body["id-" + element.id])
            allQuantity.push(req.body["quantity-" + element.id])
        }
    });

    const newOrder = new orderModel({username: username, foodId:  allFoodId, quantity: allQuantity, total: total});
    total = 0
    newOrder.save()
    res.redirect("/order")
});





app.listen(3000, () => {
    console.log("Listening at port 3000");
});



//------------------------------------------------------------------------------------
//"name": ..., "price": ..., "href": ..., "id": ..., "quantity": ...
function removeItemOnce(cart, id) {
    for (let i = cart.length - 1; i >= 0; i--){
        if(cart[i].id == id){
            console.log(id);
            total -= Number(cart[i].price) * Number(cart[i].quantity)
            cart.splice(i, 1);
            console.log(cart);
            break
        }
    }
    return cart;
  }