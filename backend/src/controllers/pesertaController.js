const { getCurrentUser } = require("../config/libs")
const { prisma } = require("../config/utils")

//create peserta
const createPeserta = async (req, res)=>{
    // #swagger.tags = ['Peserta']
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
  let {name} = req.body
  let {status} = req.body
  try{
    const user = await getCurrentUser(req.user)
    let peserta = await prisma.peserta.create({
      data:{
        name, status, userId: user.id
      }
    })
    res.json({data: peserta, message: "peserta was successfully created", status: "success"})
    return
  }catch(err){
    res.status(400).json({
      data: null,
      message: err,
      status: "error"
    })
  }
}

//get peserta
const getPeserta = async (req, res)=>{
    // #swagger.tags = ['Peserta']
  try{
    let peserta = await prisma.peserta.findMany()
    res.json({data: peserta, message: "peserta was successfully get", status: "success"})
    return
  }catch(err){
    res.status(404).json({
      data: null,
      message: err,
      status: "error"
    })
  }
}

//get peserta by id
const getPesertaByID = async (req, res)=>{
    // #swagger.tags = ['Peserta']  
  let {id} = req.params

  try{
    let peserta = await prisma.peserta.findFirst({
      where: {
        id: Number(id)
      }
    })
    let message = peserta ? "peserta was successfully get" : "peserta not found"
    let status = peserta ? 200 : 404
    
    res.status(status).json({data: peserta, message, status: "success"})
    return
  }catch(err){
    res.status(404).json({
      data: null,
      message: err,
      status: "error"
    })
  }
}

//update peserta
const updatePeserta = async (req, res)=>{
    // #swagger.tags = ['Peserta']
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
  let {name} = req.body
  let {status} = req.body
  let {id} = req.params

  try{
    const user = await getCurrentUser(req.user)
    let peserta = await prisma.peserta.update({
      data:{
        name, status, userId: user.id
      },
      where: {
        id: Number(id)
      }
    })
    res.json({data: peserta, message: "peserta was successfully updated", status: "success"})
    return
  }catch(err){
    res.status(400).json({
      data: null,
      message: err,
      status: "error"
    })
  }
}

//delete peserta
const deletePeserta = async (req, res)=>{
    // #swagger.tags = ['Peserta']
    /* #swagger.security = [{
      "bearerAuth": []
    }] */
  let {id} = req.params

try{
    await prisma.peserta.deleteMany({
      where: {
        id: Number(id)
      }
    })
    res.json({data: null, message: "peserta was successfully deleted", status: "success" })
    return
  }catch(err){
    res.status(400).json({
      data: null,
      message: err,
      status: "error"
    })
  }

}

module.exports = {
    createPeserta,
    getPeserta,
    getPesertaByID,
    updatePeserta,
    deletePeserta
}