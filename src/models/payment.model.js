import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllPayment = async () => {
  try {
    const result = await prisma.payment.findMany({
      select: {
        id: true,
        id_accounts_receivable: true, 
        amount_paid: true, 
        payment_date: true, 
        payment_method: true
      },
    });
    return result;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getPaymentById = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const Payment = await prisma.Payment.findUnique({
      where: { id: numericId },
      select: {
        date: true,
        total: true,
        payment_method: true,
        description: true,
        id_user: true,
      },
    });

    if (!Payment) {
      throw createError("RECORD_NOT_FOUND");
    }

    return Payment;
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

export const createPayment = async (reqBody) => {
  try {
    const { date,total,payment_method,description,id_user } = reqBody;

    const data = {
      date,total,payment_method, description,id_user,
    };
    const Payment = await prisma.Payment.create({
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
    return Payment;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const deletePayment = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const deletePayment = await prisma.Payment.delete({
      where: { id: numericId },
    });
    return deletePayment;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const updatePayment = async (id, data) => {
  const numericId = validateAndConvertId(id);
  try {
    const updateData = await prisma.Payment.update({
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