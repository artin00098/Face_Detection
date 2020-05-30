const handleProfile =  (req,res)=>{
	const { id } = req.params;
	db.select('*').from('users').where({ id })
	// ====== we can do id instead of id : id because both values are the same ==========
	.then(user=>{
		if (user.length){
			res.json(user[0]);
		}else{
			res.status.json('not found !!!!!')
		}
		})
	.catch(err => res.status(400).json('no such a user found'))
	// if(!found){
	// 	res.status(404).json(' no such user found');
	// }
}

module.exports = {
	handleProfile : handleProfile
}