import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";

export const getAllProvider = async () => {
  try {
    const result = await prisma.provider.findMany({
      select: {
        id: true,
        name: true,
        number: true,
      },
    });
    return result;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const getProviderById = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const provider = await prisma.provider.findUnique({
      where: { id: numericId },
      select: {
        name: true,
        number: true,
      },
    });

    if (!provider) {
      throw createError("RECORD_NOT_FOUND");
    }

    return provider;
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

export const createProvider = async (reqBody) => {
  try {
    const { name, number } = reqBody;

    const data = {
      name, number,
    };
    const provider = await prisma.provider.create({
      data,
      select: {
        id: true,
        name: true,
        number: true,
      },
    });
    return provider;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const deleteProvider = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const deleteProvider = await prisma.provider.delete({
      where: { id: numericId },
    });
    return deleteProvider;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

export const updateProvider = async (id, data) => {
  const numericId = validateAndConvertId(id);
  try {
    const updateData = await prisma.provider.update({
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