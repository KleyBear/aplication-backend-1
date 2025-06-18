import {
  getAllInvestment as investmentModel,
  getInvestmentById as getInvestmentByIdModel,
  createInvestment as createInvestmentModel,
  deleteInvestment as deleteInvestmentModel,
  updateInvestment as updateInvestmentModel,
} from "../models/investment.model.js";

export const getAllInvestment = async (req, res, next) => {
  try {
    const investment = await investmentModel();
    res.status(200).json({ data: investment });
  } catch (error) {
    next(error);
  }
};

export const getInvestmentById = async (req, res, next) => {
  try {
    const investment = await getInvestmentByIdModel(req.params.id);
    res.status(200).json({ data: investment });
  } catch (error) {
    next(error);
  }
};

export const createInvestment = async (req, res, next) => {
  try {
    const { date,total,payment_method,description,id_user} = req.body;
    const newInvestment = await createInvestmentModel({ date,total,payment_method,description,id_user });
    res.status(201).json({
      message: "Inversion creada correctamente",
      data: newInvestment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInvestment = async (req, res, next) => {
  try {
    const result = await deleteInvestmentModel(req.params.id);
    return res.status(200).json({
      message: "Inversion eliminada correctamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInvestment = async (req, res, next) => {
  try {
    const updateInvestment = await updateInvestmentModel(req.params.id, req.body);
    return res.status(200).json({
      message: "Inversion actualizada correctamente",
      data: updateInvestment,
    });
  } catch (error) {
    next(error);
  }
};
