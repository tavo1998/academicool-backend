import prisma from "./../config/database";

export async function checkUserRegister(email: string) {
  const user = await getUserByEmail(email)
  if(!user) return false;
}

export async function getUserByEmail(email: string) {
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

export async function getUserById(id: number) {
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