const prisma =  require("../config/database");

async function checkUserRegister(email) {
  const user = await getUserByEmail(email)
  return user;
}

async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user;
  }catch(e) {
    console.log(e);
    throw e;
  }
}

async function getUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user;
  }catch(e) {
    console.log(e);
    throw e;
  }
}

module.exports = {
  checkUserRegister,
  getUserByEmail,
  getUserById
}