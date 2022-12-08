const mongoose = require('mongoose')

const mongoConnect = async ()=>{
    let mongo_uri;
    const mongo_user = process.env.mongo_user;
    const mongo_password = process.env.mongo_password
    const mongo_db_name = process.env.mongo_db_name
    const mongo_query = process.env.mongo_query;
    const mongo_host = process.env.mongo_host;

  if(!mongo_user){
    
    mongo_uri = `${process.env.mongo_uri}/${mongo_db_name}`;

  }else{
    mongo_uri = `mongodb+srv://${mongo_user}:${mongo_password}@${mongo_host}/${mongo_db_name}?${mongo_query}`;

  }
  console.log(mongo_uri)
  try {
    await mongoose.connect(mongo_uri,{
        useNewUrlParser : true,
        useUnifiedTopology :true
      })
      console.info('MONGODB CONNECTED')
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = mongoConnect;