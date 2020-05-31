const handleRegister = (req,res,db,bcrypt)=>{
	console.log(req.body);
	const {email , name , password} = req.body;
	res.send(req.body);
	if (!email || !name || !password ) {
		return res.status(400).json('bad registration')
	}
	const hash = bcrypt.hashSync(password);
	console.log(db);
		db.transaction(trx =>{
			trx.insert({
				hash : hash,
				email : email
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