require('dotenv').config();
const salt =  process.env.BCRYPT_SALT;
const jwtExpiration = process.env.JWT_EXPIRATION;
const jwtsalt = process.env.JWT_SALT;

//login controller
const databasePromise = require('./databaseConnector.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

async function login(req,res)  {
	const user =  {
		userName: req.body.userName,
		password: req.body.password
	}
	try {
		const database = await databasePromise;
		const collection =  database.collection('users');
		collection.find({userName:user.userName},{_id:1,userName:1,password:1}).toArray(function(err,result){
			if (err) throw err;
			if(result.length == 0) {
				res.status(406).json({message:'User is not registered'})
			}
			else {
				// validates the password
				if(result[0].password != bcrypt.hashSync(req.body.password,salt).replace(`${salt}.`,'')) {
					return res.status(406).json({message:'Wrong Password'});
				}
				else {
					userId =  result[0]._id.toString().replace('New ObjectId("','').replace('")','');
					console.log(userId);
					let token = jwt.sign({id:userId},jwtsalt,{expiresIn:jwtExpiration});
					collection.updateOne({_id:ObjectId(userId)},{$set:{jwt:token},function(err,result){
						if (err) throw err;
						res.status(200).setHeader('Authorization',`Bearer ${token}`).json({message:'User Authenticated', redirect: '../../BaghChal-WebApp/views/public/assests/joinHost.html'});
					} 	
					})
				}
			}
		})
	  } catch (error) {
		console.error('Error connecting to the database:', error);
	  }



};

async function signup(req,res){
	const user =  {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		userName: req.body.userName,
		password: req.body.password
	}
	try{
		const database = await databasePromise;
		const collection =  database.collection('users');
		collection.find({userName:user.userName}, {userName:1}).toArray(function(err,result){
			if (err) throw err;
			if (result.length > 0) {
				res.status(406).json({message: 'User already exists with the same username'});
			}
			else {
				user.password =  bcrypt.hashSync(user.password,salt).replace(`${salt}.`,'');
				collection.insertOne(user,function(err,result){
					if (err) throw err;
					res.status(201).json({message: 'User has been successfully created!'});
				})
			}
		})
	}
	catch (error) {
		console.error('Error connecting to the database: ', error);
	}
}

module.exports = {login,signup};