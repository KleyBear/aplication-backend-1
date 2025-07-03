import {
  getAllAccountReceivable as AccountReceivableModel,
  getAccountReceivableById as getAccountReceivableByIdModel,
  createAccountReceivable as createAccountReceivableModel,
  deleteAccountReceivable as deleteAccountReceivableModel,
  updateAccountReceivable as updateAccountReceivableModel,
} from "../models/AccountReceivable.model.js";

export const getAllAccountReceivable = async (req, res, next) => {
  try {
    const AccountReceivable = await AccountReceivableModel();
    res.status(200).json({ data: AccountReceivable });
  } catch (error) {
    next(error);
  }
};

export const getAccountReceivableById = async (req, res, next) => {
  try {
    const AccountReceivable = await getAccountReceivableByIdModel(req.params.id);
    res.status(200).json({ data: AccountReceivable });
  } catch (error) {
    next(error);
  }
};

export const createAccountReceivable = async (req, res, next) => {
  try {
    const { date,total,payment_method,description,id_user} = req.body;
    const newAccountReceivable = await createAccountReceivableModel({ date,total,payment_method,description,id_user });
    res.status(201).json({
      message: "Inversion creada correctamente",
      data: newAccountReceivable,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAccountReceivable = async (req, res, next) => {
  try {
    const result = await deleteAccountReceivableModel(req.params.id);
    return res.status(200).json({
      message: "Inversion eliminada correctamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAccountReceivable = async (req, res, next) => {
  try {
    const updateAccountReceivable = await updateAccountReceivableModel(req.params.id, req.body);
    return res.status(200).json({
      message: "Inversion actualizada correctamente",
      data: updateAccountReceivable,
    });
  } catch (error) {
    next(error);
  }
};
