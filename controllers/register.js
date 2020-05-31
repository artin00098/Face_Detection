const handleRegister = (req,res,db,bcrypt)=>{
	const {email , name , password} = req.body;
	// db('users').insert({
	// 	email:email,
	// 	password : password
	// }).then(response => res.json(response))
	if (!email || !name || !password ) {
		return res.status(400).json('bad registration')
	}
	const hash = bcrypt.hashSync(password);
		db.transaction(trx =>{
			trx.insert({
				hash : hash,
				email : email,
				name : name
			})
			.into('login')
			.returning('email')
			.then(LoginEmail=>{
				return trx('users')
				.returning('*')
				.insert({
				email :LoginEmail[0],
				name : name,
				joined : new Date()
				})
				.then(user => res.json(user[0]));
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to register U dear friend'))
};

module.exports = {
	handleRegister : handleRegister 
}