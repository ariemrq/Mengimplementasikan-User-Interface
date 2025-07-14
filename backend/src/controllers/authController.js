const { prisma } = require("../config/utils")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res)=>{
    // #swagger.tags = ['User']
  const {nama, email, password} = req.body

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (user){
    res.status(403).json({data: null, message: "Sorry Email Already Exist", status: "Already Exist"})
  }else{
    const hashedPassword = await bcrypt.hash(password, 10); 

    try{
      const newUser = await prisma.user.create({
        data:{
          nama, email, password: hashedPassword
        }
      })
      res.status(201).json({data: newUser, message: "User was successfully register", status: "success"})
      return
    }catch(err){
      res.status(400).json({
        data: null,
        message: err,
        status: "error"
      })
      return
    }

  }
}

const login = async (req, res)=>{
      // #swagger.tags = ['User']
  const {email, password} = req.body

  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ email }, process.env.JWT_SECRET);
  res.json({ accessToken });

}

module.exports = {
  register,
  login
}