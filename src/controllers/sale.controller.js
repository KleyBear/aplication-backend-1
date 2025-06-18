import {
  getAllSale as saleModel,
  getSaleById as getSaleByIdModel,
  createSale as createSaleModel,
  deleteSale as deleteSaleModel,
  updateSale as updateSaleModel,
} from "../models/sale.model.js";

export const getAllSale = async (req, res, next) => {
  try {
    const sale = await saleModel();
    res.status(200).json({ data: sale });
  } catch (error) {
    next(error);
  }
};

export const getSaleById = async (req, res, next) => {
  try {
    const sale = await getSaleByIdModel(req.params.id);
    res.status(200).json({ data: sale });
  } catch (error) {
    next(error);
  }
};

export const createSale = async (req, res, next) => {
  try {
    const { id,date,total,payment_method,description,id_user } = req.body;
    const newSale = await createSaleModel({ id,date,total,payment_method,description,id_user });
    res.status(201).json({
      message: "Venta creada correctamente",
      data: newSale,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSale = async (req, res, next) => {
  try {
    const result = await deleteSaleModel(req.params.id);
    return res.status(200).json({
      message: "Venta eliminada correctamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSale = async (req, res, next) => {
  try {
    const updateSale = await updateSaleModel(req.params.id, req.body);
    return res.status(200).json({
      message: "Venta actualizada correctamente",
      data: updateSale,
    });
  } catch (error) {
    next(error);
  }
};
