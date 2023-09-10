const databasePromise = require('../apiHandler/databaseConnector');

async function checkUser(token) {
    const database = await databasePromise;
	const collection =  database.collection('users');
    console.log(collection)
    collection.find({jwt:token},{_id:1}).toArray(function(err,result){
        if ((result.length < 0  || result.length == null)) {
          console.log("User is not authorized!!")
        }
        else {
            console.log(result[0]._id.toString().replace('New ObjectId("','').replace('")',''));
            return result[0]._id.toString().replace('New ObjectId("','').replace('")','');
        }
    });
    return null;
}

module.exports = checkUser;