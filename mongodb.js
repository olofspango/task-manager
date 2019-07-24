// CRUD operations...

// const mongodb = require('mongodb')

// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectId } = require('mongodb')
const id = new ObjectId()

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true } , (error, client) => {
    if(error) {
        return console.log("Unable to connection.")
    }
    const db  = client.db(databaseName)    

    db.collection('tasks').find({completed:false}).toArray((error, tasks) => {
        console.log(tasks)
    })

    const updatePromise = db.collection('tasks').deleteOne({
        description:"Beskrivning 1"
    })

    updatePromise.then( (result)=> {
        console.log(result)
    }).catch((error)=> {
        console.log(error)
    })
    db.collection('tasks').findOne({_id: new ObjectId("5d36f3a2003f842d68c690fe")}, (error,result) =>{
        console.log(result)
    })
    // db.collection('users').findOne({ _id: new ObjectId("5d36f504b084fd2d64e2bc01")} , (error, user) => {
    //     if(error) {
    //         return console.log("Failed")        
    //     }
    //     console.log(user)
    // })


    // db.collection('users').find({age:29}).toArray((error, users) => {
    //     console.log(users)
    // })
})

