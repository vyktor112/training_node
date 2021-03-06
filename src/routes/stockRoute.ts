import express from "express";
import { asyncMiddleware } from "../middlewares/async";
import * as StockController from "../controllers/stock_controller";
import passport from 'passport';
import * as passportConfig from '../utils/passport';

passportConfig

const stockRouter = express.Router();

stockRouter.get("", asyncMiddleware(StockController.getStock));
stockRouter.get(
  "/:product/:location",
  asyncMiddleware(StockController.getStockById)
);

stockRouter.post("", passport.authenticate('jwt',{session:false}), asyncMiddleware(StockController.addStock));

stockRouter.put(
  "/:product/:location",
  asyncMiddleware(StockController.updateStock)
);

stockRouter.delete(
  "/:product/:location",
  asyncMiddleware(StockController.removeStock)
);

export default stockRouter;
