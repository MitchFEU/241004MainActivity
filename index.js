const readline = require('readline');

// Store Details
let storeName = "";
let storeLocation = "";
const storeCapacity = 200;

// Dynamic Product Inventory
let products = [
    { name: "Laptop", price: 18999, quantity: 50 },
    { name: "Smartphone", price: 9999, quantity: 100 },
    { name: "Tablet", price: 12999, quantity: 30 } // Adjusted quantity to ensure initial inventory is within capacity
];

// Inventory Validation
function checkInventoryCapacity() {
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    if (totalQuantity > storeCapacity) {
        console.log("Warning: Store is over capacity!");
    }
}

// Add Product
function addProduct(productName, price, quantity) {
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    if (totalQuantity + quantity > storeCapacity) {
        console.log("Store is at full capacity, cannot add new products.");
        return totalQuantity;
    }
    products.push({ name: productName, price: price, quantity: quantity });
    return totalQuantity + quantity;
}

// Remove Product
function removeProduct(productName, quantity) {
    const product = products.find(p => p.name === productName);
    if (product) {
        if (product.quantity - quantity < 0) {
            console.log("Error: Quantity cannot be negative!");
            return;
        }
        product.quantity -= quantity;
        console.log(`Updated ${productName} quantity: ${product.quantity}`);
    } else {
        console.log("Error: Product not found!");
    }
}

// Most Expensive Product
function getMostExpensiveProduct() {
    return products.reduce((max, product) => product.price > max.price ? product : max, products[0]);
}

// Total Inventory Value
function calculateTotalInventoryValue() {
    return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
}

// Automatic Restocking
function restockProduct(productName, threshold) {
    const product = products.find(p => p.name === productName);
    if (product && product.quantity < threshold) {
        product.quantity += 20;
        console.log(`Restocked ${productName}. New quantity: ${product.quantity}`);
    }
}

// User Interaction
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the store name: ", (inputStoreName) => {
    storeName = inputStoreName;
    rl.question("Enter the store location: ", (inputStoreLocation) => {
        storeLocation = inputStoreLocation;

        rl.question("Enter the product name: ", (newProductName) => {
            rl.question("Enter the product price: ", (newProductPrice) => {
                rl.question("Enter the product quantity: ", (newProductQuantity) => {
                    addProduct(newProductName, parseFloat(newProductPrice), parseInt(newProductQuantity));

                    rl.question("Enter the product name to remove: ", (removeProductName) => {
                        rl.question("Enter the quantity to remove: ", (removeProductQuantity) => {
                            removeProduct(removeProductName, parseInt(removeProductQuantity));

                            // Output
                            console.log(`Store Name: ${storeName}`);
                            console.log(`Store Location: ${storeLocation}`);
                            console.log(`Total number of Products: ${products.reduce((sum, product) => sum + product.quantity, 0)}`);
                            console.log(`Total Inventory Value: ${calculateTotalInventoryValue()}`);
                            console.log(`Most Expensive Product: ${getMostExpensiveProduct().name}`);
                            checkInventoryCapacity();

                            // Example of automatic restocking
                            restockProduct("Laptop", 10);

                            rl.close();
                        });
                    });
                });
            });
        });
    });
});#   2 4 1 0 0 4 M a i n A c t i v i t y  
 