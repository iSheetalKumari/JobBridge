const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://iSheetal:Sheetal01M@cluster0.0eddd.mongodb.net/?appName=Cluster0";

async function testConnection() {
    try {
        console.log("Testing MongoDB connection...");
        console.log(` URI: ${MONGO_URI.substring(0, 50)}...`);
        
        await mongoose.connect(MONGO_URI);
        
        console.log(" MongoDB connected successfully!");
        console.log(" Connection state:", mongoose.connection.readyState);
        console.log(" Connected to database:", mongoose.connection.name);
        
        // List collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(" Collections in database:");
        collections.forEach(col => console.log(`   - ${col.name}`));
        
        await mongoose.disconnect();
        console.log("Disconnected successfully");
        process.exit(0);
    } catch (error) {
        console.error(" MongoDB connection failed:");
        console.error("   Error:", error.message);
        if (error.code) console.error("   Code:", error.code);
        process.exit(1);
    }
}

testConnection();
