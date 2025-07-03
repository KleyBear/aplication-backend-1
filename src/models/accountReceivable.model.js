import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllAccountReceivable = async () => {
  try {
    const result = await prisma.AccountReceivable.findMany({
      select: {
        id: true,
        expiration_date: true,
        id_sale: true,
      },
    });
    return result;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getAccountReceivableById = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const AccountReceivable = await prisma.AccountReceivable.findUnique({
      where: { id: numericId },
      select: {
        date: true,
        total: true,
        payment_method: true,
        description: true,
        id_user: true,
      },
    });

    if (!AccountReceivable) {
      throw createError("RECORD_NOT_FOUND");
    }

    return AccountReceivable;
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

export const createAccountReceivable = async (reqBody) => {
  try {
    const { date,total,payment_method,description,id_user } = reqBody;

    const data = {
      date,total,payment_method, description,id_user,
    };
    const AccountReceivable = await prisma.AccountReceivable.create({
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
    return AccountReceivable;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const deleteAccountReceivable = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const deleteAccountReceivable = await prisma.AccountReceivable.delete({
      where: { id: numericId },
    });
    return deleteAccountReceivable;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const updateAccountReceivable = async (id, data) => {
  const numericId = validateAndConvertId(id);
  try {
    const updateData = await prisma.AccountReceivable.update({
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