import {
  getAllInvestmentDetail as InvestmentDetailModel,
  getInvestmentDetailById as getInvestmentDetailByIdModel,
  createInvestmentDetail as createInvestmentDetailModel,
  deleteInvestmentDetail as deleteInvestmentDetailModel,
  updateInvestmentDetail as updateInvestmentDetailModel,
} from "../models/InvestmentDetail.model.js";

export const getAllInvestmentDetail = async (req, res, next) => {
  try {
    const InvestmentDetails = await InvestmentDetailModel();
    res.status(200).json({ data: InvestmentDetails });
  } catch (error) {
    console.error("Error detected:", error);
    next(error);
  }
};

export const getInvestmentDetailById = async (req, res, next) => {
  try {
    const InvestmentDetail = await getInvestmentDetailByIdModel(req.params.id);
    res.status(200).json({ data: InvestmentDetail });
  } catch (error) {
    next(error);
  }
};

export const createInvestmentDetail = async (req, res, next) => {
  try {
    const { date,total,payment_method,description,id_user} = req.body;
    const newInvestmentDetail = await createInvestmentDetailModel({ date,total,payment_method,description,id_user });
    res.status(201).json({
      message: "Inversion creada correctamente",
      data: newInvestmentDetail,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInvestmentDetail = async (req, res, next) => {
  try {
    const result = await deleteInvestmentDetailModel(req.params.id);
    return res.status(200).json({
      message: "Inversion eliminada correctamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInvestmentDetail = async (req, res, next) => {
  try {
    const updateInvestmentDetail = await updateInvestmentDetailModel(req.params.id, req.body);
    return res.status(200).json({
      message: "Inversion actualizada correctamente",
      data: updateInvestmentDetail,
    });
  } catch (error) {
    next(error);
  }
};
