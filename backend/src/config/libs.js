const { prisma } = require("./utils")

const getCurrentUser = async ({email})=>{
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  })
  return user
}

module.exports = {
  getCurrentUser
}