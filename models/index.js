//====================
// Data Models
//====================
// User
let users = {
    1: {
        id: '1',
        username: 'robusto'
    },
    2: {
        id: '2',
        username: 'kanut'
    }
};

// Message
let messages = {
    1: {
        id: '1',
        text: 'Hello world!',
        userId: '1'
    },
    2: {
        id: '2',
        text: 'Bye world!',
        userId: '2'
    }
}

// Export Module
module.exports = {
    users, 
    messages
}