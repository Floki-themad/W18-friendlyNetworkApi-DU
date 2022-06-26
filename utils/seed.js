const connection = require('../config/connection');
const { User, Thought } = require('../models');
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to socializeDB');
    
    await User.deleteMany({});

     await Thought.deleteMany({});

    const seedUsers = [
        {
            userName: "ClarkF",
            email: "ClarkF@gmail.com"
        },
        {
            userName: "HazelF",
            email: "HazelF@gmail.com"
        },
        {
            userName: "BenC",
            email: "BenC@gmail.com"
        },
        {
            userName: "SherryD",
            email: "SherryD@gmail.com"
        
        },
        {
            userName: "DavidD",
            email: "DavidD@gmail.com"
            
        },
    ];

    const seedThoughts = [
        {
            thoughtText: "today it is raining",
            userName: "ClarkF"
        },
        {
            thoughtText: "tomorrow it will be sunny",
            userName: "HazelF"
        },
        {
            thoughtText: "this summer we will go paddleboarding",
            userName: "BenC"
        },
        {
            thoughtText: "its a nice day to take a bike ride",
            userName: "SherryD"
        },
        {
            thoughtText: "i hope it snows soon",
            userName: "DavidD"
        }
    ];

    await User.collection.insertMany(seedUsers);

    await Thought.collection.insertMany(seedThoughts);

    console.info('seeding complete');
    process.exit(0)
});