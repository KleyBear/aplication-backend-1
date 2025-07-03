import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllInvestmentDetail = async () => {
  try {
    const result = await prisma.investmentDetail.findMany({
      select: {
        id: true,
        amount: true,
        subtotal: true,
        id_product: true,
        id_investment: true,
      },
    });
    return result;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getInvestmentDetailById = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const InvestmentDetail = await prisma.InvestmentDetail.findUnique({
      where: { id: numericId },
      select: {
        date: true,
        total: true,
        payment_method: true,
        description: true,
        id_user: true,
      },
    });

    if (!InvestmentDetail) {
      throw createError("RECORD_NOT_FOUND");
    }

    return InvestmentDetail;
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

export const createInvestmentDetail = async (reqBody) => {
  try {
    const { date,total,payment_method,description,id_user } = reqBody;

    const data = {
      date,total,payment_method, description,id_user,
    };
    const InvestmentDetail = await prisma.InvestmentDetail.create({
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
    return InvestmentDetail;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const deleteInvestmentDetail = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const deleteInvestmentDetail = await prisma.InvestmentDetail.delete({
      where: { id: numericId },
    });
    return deleteInvestmentDetail;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const updateInvestmentDetail = async (id, data) => {
  const numericId = validateAndConvertId(id);
  try {
    const updateData = await prisma.InvestmentDetail.update({
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