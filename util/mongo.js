  
const mongoose = require('mongoose')
//const { mongoPath } = require('@root/config.json')

const mongoPath = 'mongodb+srv://HAHA:loEvrZveHVKebFmS@cluster0.4hdv6.mongodb.net/discordbot?retryWrites=true&w=majority'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}