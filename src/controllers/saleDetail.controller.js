import {
  getAllSaleDetail as SaleDetailModel,
  getSaleDetailById as getSaleDetailByIdModel,
  createSaleDetail as createSaleDetailModel,
  deleteSaleDetail as deleteSaleDetailModel,
  updateSaleDetail as updateSaleDetailModel,
} from "../models/saleDetail.model.js";

export const getAllSaleDetail = async (req, res, next) => {
  try {
    const SaleDetail = await SaleDetailModel();
    res.status(200).json({ data: SaleDetail });
  } catch (error) {
    next(error);
  }
};

export const getSaleDetailById = async (req, res, next) => {
  try {
    const SaleDetail = await getSaleDetailByIdModel(req.params.id);
    res.status(200).json({ data: SaleDetail });
  } catch (error) {
    next(error);
  }
};

export const createSaleDetail = async (req, res, next) => {
  try {
    const { id,date,total,payment_method,description,id_user } = req.body;
    const newSaleDetail = await createSaleDetailModel({ id,date,total,payment_method,description,id_user });
    res.status(201).json({
      message: "Venta creada correctamente",
      data: newSaleDetail,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSaleDetail = async (req, res, next) => {
  try {
    const result = await deleteSaleDetailModel(req.params.id);
    return res.status(200).json({
      message: "Venta eliminada correctamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSaleDetail = async (req, res, next) => {
  try {
    const updateSaleDetail = await updateSaleDetailModel(req.params.id, req.body);
    return res.status(200).json({
      message: "Venta actualizada correctamente",
      data: updateSaleDetail,
    });
  } catch (error) {
    next(error);
  }
};
