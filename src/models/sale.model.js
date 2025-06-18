import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllSale = async () => {
  try {
    const result = await prisma.sale.findMany({
      select: {
        id: true,
        date: true,
        total: true,
        payment_method: true,
        description: true,
        id_user: true,
      },
    });
    return result;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getSaleById = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const sale = await prisma.sale.findUnique({
      where: { id: numericId },
      select: {
        date: true,
        total: true,
        payment_method: true,
        description: true,
        id_user: true,
      },
    });

    if (!sale) {
      throw createError("RECORD_NOT_FOUND");
    }

    return sale;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError("RECORD_NOT_FOUND");
    }

    throw error;
  }
};

export const createSale = async (reqBody) => {
  try {
    const { date, total, payment_method, description, id_user } = reqBody;

   const data = {
      date, total, payment_method, description, id_user,
    };
    const sale = await prisma.sale.create({
      data,
      select: {
        id: true,
        date: true,
        total: true,
        payment_method: true,
        description: true,
        id_user: true,
      },
    });
    return sale;
  } catch (error) {
    console.error(error); 
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const deleteSale = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const deleteSale = await prisma.sale.delete({
      where: { id: numericId },
    });
    return deleteSale;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const updateSale = async (id, data) => {
  const numericId = validateAndConvertId(id);
  try {
    const updateData = await prisma.sale.update({
      where: { id: numericId},data
    });

    return updateData;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError("RECORD_NOT_FOUND");
    }

    throw error;
  }
};