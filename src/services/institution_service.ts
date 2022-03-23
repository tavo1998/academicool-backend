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