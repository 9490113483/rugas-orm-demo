const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", require("./routes/customer"));
app.use("/api/products", require("./routes/product"));
app.use("/api/orders", require("./routes/order"));

// Sync DB and Start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
