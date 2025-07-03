import { getProductsByCategory as getProductsByCategoryModel } from "../models/product.model.js";
import { getAllProducts as getAllProductsModel } from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsModel();
    res.status(200).json({ data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const product = await getProductsByCategoryModel(req.params.id);
  } catch (error) {
    next(error);
  }
};
