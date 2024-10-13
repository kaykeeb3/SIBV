import express from "express";
import cors from "cors";
import authRoutes from "@/infra/routes/authRoutes";
import bookRoutes from "@/infra/routes/bookRoutes";
import loanRoutes from "@/infra/routes/loanRoutes";
import equipmentRoutes from "@/infra/routes/equipmentRoutes";
import scheduleRoutes from "@/infra/routes/scheduleRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/loans", loanRoutes);
app.use("/equipments", equipmentRoutes);
app.use("/schedules", scheduleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
