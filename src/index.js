import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import providerRoutes from "./routes/provider.routes.js";
import saleRoutes from "./routes/sale.routes.js";
import saleDetailRoutes from "./routes/saleDetail.routes.js";
import investmentRoutes from "./routes/investment.routes.js";
import investmentDetailRoutes from "./routes/investmentDetail.routes.js";
import accountsReceivableRoutes from "./routes/accountReceivable.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/saleDetail", saleDetailRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/investmentDetail", investmentDetailRoutes);
app.use("/api/accountsReceivable", accountsReceivableRoutes);
app.use("/api/payments", paymentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
