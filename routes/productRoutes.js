import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import { productSchema } from "../validation/productValidation.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.post("/", authMiddleware, validate(productSchema), createProduct);
router.put("/:id", authMiddleware, validate(productSchema), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
