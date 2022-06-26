const { emitWarning } = require('process');
const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to socializeDB');
    
    await User.deleteMany({});

    await Thought.deleteMany({});

    const seedUsers = [
        {
            userName: "JamesK",
            email: "JamesK@gmail.com"
        },
        {
            userName: "JohnB",
            email: "John@gmail.com"
        },
        {
            userName: "JennyS",
            email: "Jenny@gmail.com"
        },
        {
            userName: "TylerK",
            email: "tyler@gmail.com"
        
        },
        {
            userName: "DannyK",
            email: "danny@gmail.com"
            
        },
    ];

    const seedThoughts = [
        {
            thoughtText: "today is extreamly hot",
            userName: "DannyK"
        },
        {
            thoughtText: "is it going to rain soon?",
            userName: "TylerK"
        },
        {
            thoughtText: "i want to go swimming",
            userName: "JennyS"
        },
        {
            thoughtText: "lets go to the beach!",
            userName: "JohnB"
        },
        {
            thoughtText: "i hope it snows soon",
            userName: "JamesK"
        }
    ];

    await User.collection.insertMany(seedUsers);

    await Thought.collection.insertMany(seedThoughts);

    console.info('seeding complete');
    process.exit(0)
});