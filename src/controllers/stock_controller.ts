import { Request, Response } from "express";
import Stock from "../models/stock";

export const getStock = async (req: Request, res: Response): Promise<void> => {
  const stock = await Stock.find();
  res.status(200).send(stock);
};

export const getStockById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const stock = await Stock.find({
    product: Number(req.params.product),
    location: Number(req.params.location),
  });
  res.status(200).send(stock);
};

export const addStock = async (req: Request, res: Response): Promise<void> => {
  const stock = new Stock(req.body);
  const savedStock = await stock.save();
  res.status(200).send(savedStock);
};

export const removeStock = async (
  req: Request,
  res: Response
): Promise<void> => {
  await Stock.deleteMany(
    {
      product: Number(req.params.product),
      location: Number(req.params.location),
    },
    { new: true }
  );
  res.status(200).send("Stock deleted");
};

export const updateStock = async (
  req: Request,
  res: Response
): Promise<void> => {
  const stock = await Stock.findOneAndUpdate(
    {
      product: Number(req.params.product),
      location: Number(req.params.location),
    },
    req.body,
    { new: true }
  );
  res.status(200).send(stock);
};
