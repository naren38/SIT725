const { MongoClient, ServerApiVersion } = require("mongodb");
 
 
 
// Replace the placeholder with your Atlas connection string
 
const uri = "mongodb://localhost:27017/";
 
 
 
async function insertData() {
 
    const client = new MongoClient(uri);
 
 
 
    try {
 
        // Connect to the MongoDB server
 
        await client.connect();
 
 
 
        // Access the database and collection
 
        const db = client.db("myDB");
 
        const collection = db.collection("Menu");
 
 
 
        const pizzas = [
 
            { name: "ChickenPZ", ingredients: ["chicken", "butter", "pepper"], price: 12.99 },
 
            { name: "PaneerPZ", ingredients: ["paneer", "cheeze", "pepperoni"], price: 10.99 },
 
            { name: "cheezPZ", ingredients: ["cheeze", "onion", "vegies"], price: 8.99 }
 
        ];
 
       
 
 
 
        // Insert the data
 
        const result = await collection.insertMany(pizzas);
 
        console.log(`${result.insertedCount} documents inserted:`, result.insertedIds);
 
    } catch (err) {
 
        console.error('Error inserting data:', err);
 
    } finally {
 
        // Close the connection
 
        await client.close();
 
    }
 
}
 
 
 
 
 
async function fetchAllData() {
 
    const client = new MongoClient(uri);
 
 
 
    try {
 
        // Connect to the MongoDB server
 
        await client.connect();
 
 
 
        // Access the database and collection
 
        const db = client.db("myDB");
 
        const collection = db.collection("pizzaMenu");
 
 
 
        // Fetch all documents from the collection
 
        const data = await collection.find().toArray();
 
 
 
        // Print the data
 
        console.log(data);
 
    } catch (err) {
 
        console.error('Error fetching data:', err);
 
    } finally {
 
        // Close the connection
 
        await client.close();
 
    }
 
}
 
 
 
 
 
// Run the function
 
insertData();
 
// Run the function
 
fetchAllData();