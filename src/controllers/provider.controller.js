import { number } from "zod/v4";
import {
  getAllProvider as providerModel,
  getProviderById as getProviderByIdModel,
  createProvider as createProviderModel,
  deleteProvider as deleteProviderModel,
  updateProvider as updateProviderModel,
} from "../models/provider.model.js";

export const getAllProvider = async (req, res, next) => {
  try {
    const provider = await providerModel();
    res.status(200).json({ data: provider });
  } catch (error) {
    next(error);
  }
};

export const getProviderById = async (req, res, next) => {
  try {
    const provider = await getProviderByIdModel(req.params.id);
    res.status(200).json({ data: provider });
  } catch (error) {
    next(error);
  }
};

export const createProvider = async (req, res, next) => {
  try {
    const { name, number } = req.body;
    const newProvider = await createProviderModel({ name, number });
    res.status(201).json({
      message: "Proveedor creado correctamente",
      data: newProvider,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProvider = async (req, res, next) => {
  try {
    const result = await deleteProviderModel(req.params.id);
    return res.status(200).json({
      message: "Proveedor eliminado correctamente",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProvider = async (req, res, next) => {
  try {
    const updateProvider = await updateProviderModel(req.params.id, req.body);
    return res.status(200).json({
      message: "Proveedor actualizado correctamente",
      data: updateProvider,
    });
  } catch (error) {
    next(error);
  }
};
