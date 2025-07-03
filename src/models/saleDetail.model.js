import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllSaleDetail = async () => {
  try {
    const result = await prisma.SaleDetail.findMany({
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

export const getSaleDetailById = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const SaleDetail = await prisma.SaleDetail.findUnique({
      where: { id: numericId },
      select: {
        date: true,
        total: true,
        payment_method: true,
        description: true,
        id_user: true,
      },
    });

    if (!SaleDetail) {
      throw createError("RECORD_NOT_FOUND");
    }

    return SaleDetail;
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

export const createSaleDetail = async (reqBody) => {
  try {
    const { date, total, payment_method, description, id_user } = reqBody;

   const data = {
      date, total, payment_method, description, id_user,
    };
    const SaleDetail = await prisma.SaleDetail.create({
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
    return SaleDetail;
  } catch (error) {
    console.error(error); 
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const deleteSaleDetail = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const deleteSaleDetail = await prisma.SaleDetail.delete({
      where: { id: numericId },
    });
    return deleteSaleDetail;
  } catch (error) {
    console.error(error); 
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const updateSaleDetail = async (id, data) => {
  const numericId = validateAndConvertId(id);
  try {
    const updateData = await prisma.SaleDetail.update({
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