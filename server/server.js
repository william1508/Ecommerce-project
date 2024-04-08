const { Sequelize, DataTypes, Model } = require('sequelize'); 
//this model allows me to connect to my database

const sequelize = new Sequelize('WillDB', 'learner', 'Cheesecake', // Database name, Username, Password
{ //The SQL server details are defined 
    host:'172.187.184.173', // SQL server host
    dialect:'mssql', // SQL dialect
    options:{
        encrypt: false   // Option to disable encryption (for MSSQL)
    }
})



async function test(){ 
    // This try block attempts to authenticate the connection to the database
try {
    // Await keyword pauses execution until the promise returned by sequelize.authenticate() is resolved
    await sequelize.authenticate();
     // If the authentication is successful, log a success message
    console.log('Connection has been established successfully.');
  } catch (error) {
    // If an error occurs during authentication, log an error message
    console.error('Unable to connect to the database:', error);
  }}

  test() //runs the test Async test function


// Initialize the Product model with attributes representing columns in the database table
  class Product extends Model{}

  Product.init({ //Initialize a model, representing a table in the DB
    // Define the 'product_id' column
    product_id: { 
        type:DataTypes.INTEGER, // Data type of the column (INTEGER)
        allowNull:false,        // Whether null values are allowed
        primaryKey:true         // Whether this column is the primary key
    },
    product_title:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    product_genre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_author:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_stock:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    product_cost:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    

  },
  {
    sequelize,              // The database connection
    modelName:'Product',    // The name of the model
    timestamps:false        // Disable timestamps (createdAt and updatedAt)
});




class Order extends Model{}
{
    Order.init({
        order_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        product_id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        order_amount:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        order_date:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
        
    },
    {
        sequelize,
        modelName: 'Order',
        timestamps:false
    })
}


class User extends Model{}
{
    User.init({
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true
        },
        user_first_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        user_last_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        user_email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        user_address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        
    },
    {
        sequelize,
        modelName: 'User',
        timestamps:false
    })
}

const allProduct = async ()=>
{
    const product = await sequelize.query('SELECT * FROM dbo.products',
    {
        model: Product,
        mapToModel:true
    })
    let  myProduct = []
    for (let i = 0; i < product.length; i++){
        myProduct[i] = 
        {
            book :product[i].dataValues.product_title,
            author: product[i].dataValues.product_author,
            cost: product[i].dataValues.product_cost,
            id: product[i].dataValues.product_id

        }        
    }
    return myProduct
    
}
allProduct()


const searchSQLProducts = async (name) =>
{
    // Execute a SQL query to select products from the database where the product_title column matches the given name
  const product = await sequelize.query(`SELECT * FROM dbo.Products WHERE product_title LIKE '${name}%'`,// SQL query string
  {
    model: Product, // Model to map the returned data to
    mapToModel: true // Indicates that the returned data should be mapped to the specified model
  })
  // Initialize an empty array to store the formatted product data
  let  myProduct = [];
    // Loop through each product returned by the SQL query
    for (let i = 0; i < product.length; i++){
         // Format the product data and add it to the myProduct array
        myProduct[i] = 
        {
            book :product[i].dataValues.product_title,
            author: product[i].dataValues.product_author,
            cost: product[i].dataValues.product_cost,
            id: product[i].dataValues.product_id

        }
        
    }
    return myProduct
}

// const insertSQLProducts = async (product_title) =>
// {
//     const insertResult = await sequelize.query(`INSERT INTO dbo.Products (product_title) VALUES (${product_title})'`,
//     {
//         model:Product,
//         mapToModel:true
//     })
//         return insertResult
// }

const cors = require('cors');
const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
app.use(cors())



app.get('/products', (req,res) =>
{
    allProduct().then(product => res.json(product));
})

app.get('/products/:product_title', (req,res)=>
{
    searchSQLProducts(req.params.product_title).then(result => res.json(result))
}
)

// app.get('/createProduct/:name/:',(req, res)=>
// {

//     res.send("Success")
//     // insertSQLProducts(req.params.product_title).then(result =>
//     //     res.json(result))
//     //     console.log(req.params)
//     //     console.log(req.params.product_title)
// })

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })



