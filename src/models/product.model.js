import { prisma, Prisma } from "../config/db.js";
import { createError } from "../utils/errors.js";
import { validateAndConvertId } from "../utils/validate.js";
// getProductsByCategory


export const getAllProducts = async () => {
  try {
    const result = await prisma.product.findMany({
      select: {
        id: true,
        description: true,
        price_sale: true,
        cost_price: true,
        id_category: true,
        stock: true,
        providerId: true
      },
    });
    return result;
  } catch (error) {
    throw createError("INTERNAL_SERVER_ERROR");
  }
};

//getProductsByCategory
export const getProductsByCategory = async (id) => {
  const numericId = validateAndConvertId(id);
  try {
    const product = await prisma.product.findMany({
      where: { categoryId: numericId },
      select: {
        description: true,
        price_sale: true,
        cost_price: true,
        stock: true,
        id_category: true,
      },
    });

    if (!product) {
      throw createError("RECORD_NOT_FOUND");
    }
    return product;
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
