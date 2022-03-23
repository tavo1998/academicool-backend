import { Institution } from "@prisma/client";
import prisma from "./../config/database";

export async function getInstitutions() {
  try {
    const institutions = await prisma.institution.findMany()
    return institutions
  }catch(e) {
    console.log(e)
    throw e; 
  }
}

export async function createInstitution(data: Institution) {
  try {
    const institution = await prisma.institution.create({
      data: data
    })
    return institution
  }catch(e) {
    console.log(e)
    throw e;
  }
}

export async function updateInstiution(id: number, data: Institution){
  try {
    const updatedInstitution = await prisma.institution.update({
      where: {
        id: id
      },
      data: data
    })
    return updatedInstitution;
  }catch(e) {
    console.log(e)
    throw e;
  }
}

export async function deleteInstitution(id: number) {
  try {
    const deletedUser = await prisma.institution.delete({
      where: {
        id
      }
    })
    return deletedUser;
  }catch(e) {
    console.log(e);
    throw e;
  }
}