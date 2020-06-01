const handleRegister = (req,res,db,bcrypt)=>{
	const {email , name , password} = req.body;
	if (!email || !name || !password ) {
		return res.status(400).json('bad registration')
	}
	const hash = bcrypt.hashSync(password);

				return db('users')
				.returning('*')
				.insert({
				email :email,
				name : name,
				joined : new Date()
				})
				.then(user => res.json(user[0]));
		.catch(err => res.status(400).json('unable to register U dear friend'))
};

module.exports = {
	handleRegister : handleRegister 
}