
const db = require('./db.js')

const adminSchema = new db.mongoose.Schema({
    "Dusername": { type: String },
    "Dpassword": { type: String },
    "age": { type: String },
    "gage": { type: String },
    "money": { type: String }

})


module.exports = db.mongoose.model("Dusers", adminSchema)