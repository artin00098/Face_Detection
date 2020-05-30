
const handleImage = (req,res,db)=>{
	const { id } = req.body;
	// =========== to increase entries count ============
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries =>{
  		res.json(entries[0])
  	})
  	.catch(err => res.status(400).json('errorrrr'))
}

module.exports = {
	handleImage
}