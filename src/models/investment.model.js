import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllInvestment = async () => {
  try {
    const result = await prisma.investment.findMany({
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

export const getInvestmentById = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const investment = await prisma.investment.findUnique({
      where: { id: numericId },
      select: {
        date: true,
        total: true,
        payment_method: true,
        description: true,
        id_user: true,
      },
    });

    if (!investment) {
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

export const createInvestment = async (reqBody) => {
  try {
    const { date,total,payment_method,description,id_user } = reqBody;

    const data = {
      date,total,payment_method, description,id_user,
    };
    const investment = await prisma.investment.create({
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
    return investment;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const deleteInvestment = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const deleteInvestment = await prisma.investment.delete({
      where: { id: numericId },
    });
    return deleteInvestment;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const updateInvestment = async (id, data) => {
  const numericId = validateAndConvertId(id);
  try {
    const updateData = await prisma.investment.update({
      where: { id: numericId },data
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