const registerValidation = (req, res, next)=>{
  const {nama, email, password} = req.body

  if (nama === undefined || email === undefined || password === undefined){
    return res.status(400).json({message: "name, email and password is required"})
  }else{
    next()
  }
}

const loginValidation = (req, res, next)=>{
  const { email, password} = req.body

  if (email === undefined || password === undefined){
    return res.status(400).json({message: "email and password is required"})
  }else{
    next()
  }
}

module.exports = { registerValidation, loginValidation };