import {
  getAllPayment as PaymentModel,
  getPaymentById as getPaymentByIdModel,
  createPayment as createPaymentModel,
  deletePayment as deletePaymentModel,
  updatePayment as updatePaymentModel,
} from "../models/payment.model.js";

export const getAllPayment = async (req, res, next) => {
  try {
    const Payment = await PaymentModel();
    res.status(200).json({ data: Payment });
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const Payment = await getPaymentByIdModel(req.params.id);
    res.status(200).json({ data: Payment });
  } catch (error) {
    next(error);
  }
};

export const createPayment = async (req, res, next) => {
  try {
    const { date,total,payment_method,description,id_user} = req.body;
    const newPayment = await createPaymentModel({ date,total,payment_method,description,id_user });
    res.status(201).json({
      message: "Inversion creada correctamente",
      data: newPayment,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    const result = await deletePaymentModel(req.params.id);
    return res.status(200).json({
      message: "Inversion eliminada correctamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePayment = async (req, res, next) => {
  try {
    const updatePayment = await updatePaymentModel(req.params.id, req.body);
    return res.status(200).json({
      message: "Inversion actualizada correctamente",
      data: updatePayment,
    });
  } catch (error) {
    next(error);
  }
};
