require("dotenv").config();
var mysql = require('mysql');
var inquirer = require('inquirer');

// require .env with my password and stuff
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "bamazon"
});


// At start
console.log("\n-------------------------------------\n" +
  "Welcome to BAM!azon!\nWe have everything you need for your dastardly deeds!\n");



// if hero display hero_products
// go through the hero shop and products
var startShop = function () {
  connection.query("SELECT * FROM villain_products", function (err, res) {
    if (err) throw err;
    console.log("\nOpening Villain Shop\n" +
      "\n--Items for sale--");
    // display products
    //     res.forEach(function () {
    //       console.log("\nItem ID: " + res.item_id +
    //         " --- Product: " + res.product_name +
    //         " --- Price: $" + res.price);
    //     });
    //   });
    // }
    for (var i = 0; i < res.length; i++) {
      console.log("\nItem ID: " + res[i].item_id +
        " --- Product: " + res[i].product_name +
        " --- Department: " + res[1].department_name +
        " --- Price: $" + res[i].price);
    }
    // ask if user wants to buy something
  });
  // var confirmBuy = function () {
  inquirer.prompt({
      type: "confirm",
      message: "Would you like to buy something?",
      name: "confirm"
    })
    .then(function (answer) {
      if (answer.confirm) {
        console.log("buy")
        //chooseItem();
      } else {
        console.log("no sale")
        // exitShop();
      }
    })
  // }
  // var chooseItem = function () {
  inquirer.prompt({
      type: "input",
      message: "What is the Item ID of your purchase",
      name: "itemid"
    }, {
      type: "input",
      message: "Enter a quantity",
      name: "quantity"
    })
    .then(function (answer) {
      console.log(answer.itemid)
      console.log(answer.quantity)
    })
}
// };







// User puts in info - if store has sufficient quantity message (thank you for your order)
// delete the user quantity from the stock quantity and update database
// show customer their order with the total price

// 
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  startShop();
});