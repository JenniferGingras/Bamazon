require("dotenv").config();
var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require("colors");

// require .env with my password and stuff
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "bamazon"
});


// IF ERROR, CUSTOMER CAN CONTINUE TO SHOP
function keepShopping() {
  inquirer.prompt([{
    type: "confirm",
    name: "shopping",
    message: "Would you like to keep shopping?",
  }]).then(function (answer) {
    if (answer) {
      chooseShop();
    } else {
      // End the database connection
      connection.end();
    }
  })
}

// GET USER INPUT AND UPDATE DATABASE
function promptUser(shop) {
  var table = shop
  // console.log("table = " + table)
  // ask user to select an item
  console.log("\n")
  inquirer.prompt([{
      type: "input",
      name: "item_id",
      message: "Please enter the Item ID of your purchase.",
    },
    {
      type: "input",
      name: "quantity",
      message: "Enter the quantity.",
    }
  ]).then(function (answer) {
    var item = answer.item_id;
    var quantity = answer.quantity;
    // console.log("ID " + item);
    // console.log("Quantity " + quantity);

    connection.query("SELECT * FROM ?? WHERE item_id = " + item, table, function (err, data) {
      if (err) throw err;
      // make sure the user added input
      if (data.length === 0) {
        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
        displayShop();
      } else {
        var data = data[0];
        // check if there's enough inventory
        // console.log(data);
        if (quantity <= data.stock_quantity) {
          console.log("\n---Order details---\n".magenta + "Item: ".blue + data.product_name + "\nQuantity: ".blue + quantity + "\nTotal: ".blue + "$" + data.price * quantity);
          console.log("\nThank you for your order!")
          console.log("\n---------------------------------------------------------------------\n");
          // if yes, update inventory
          connection.query("UPDATE ?? SET stock_quantity = " + (data.stock_quantity - quantity) + " WHERE item_id = " + item, table, function (err, data) {
            if (err) throw err;
            // End the database connection
            connection.end();
          })
        } else {
          console.log("\nSorry, there is not enough product in stock, your order can not be placed.\n".red);
          keepShopping();
        }
      }
    })
  })
}


// DISPLAY PRODUCTS
function displayShop(shop) {
  // console.log("this is " + shop)
  connection.query("SELECT * FROM ??", [shop], function (err, data) {
    if (err) throw err;
    console.log("\n--Items for sale--".gray);
    // id, name and price of products are displayed
    data.forEach(function (elem) {
      console.log("\nItem ID: ".gray + elem.item_id +
        " --- Product: ".gray + elem.product_name +
        " --- Price: ".gray + "$" + elem.price);
    });
    if (shop === "hero_products") {
      promptUser("hero_products");
    } else {
      promptUser("villain_products")
    }

  });
}


// CHOOSE HEROES OR VILLAINS
function chooseShop() {
  inquirer
    .prompt({
      name: "shopchoice",
      type: "list",
      message: "Would you like to shop Heroes or Villians?",
      choices: ["Heroes", "Villains", "Exit"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.shopchoice === "Heroes") {
        console.log("\nOpening Heroes Shop".cyan);
        displayShop("hero_products");
      } else if (answer.shopchoice === "Villains") {
        console.log("\nOpening Villains Shop".cyan);
        displayShop("villain_products");
      } else {
        connection.end();
      }
    });
}

// START FUNCTION
function start() {
  console.log("\n---------------------------------------------------------------------\n");
  console.log("\nWELCOME to BAM!azon!\n\n".yellow.bold)
  chooseShop();
}

// call first function
start();