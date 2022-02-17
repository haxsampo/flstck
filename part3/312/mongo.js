const mongoose = require('mongoose')

const password = process.argv[2]
const url = 
`mongodb+srv://fullstack:${password}@cluster22.tfkvv.mongodb.net/puhback?retryWrites=true&w=majority
`
mongoose.connect(url)
//const password = process.env.ATLAS_PASS
const puhSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', puhSchema)
if (process.argv.length==3) {
    console.log("phonebook:")
    Person.find({}).then(res => {
        res.forEach(prs => {
            console.log(prs.name, prs.number)
        })
        mongoose.connection.close()
    }) 
} else {
    const prs  = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    prs.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}

