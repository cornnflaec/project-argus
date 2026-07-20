require("dotenv").config();
const express = require("express");
const cors = require("cors");

const processRoutes = require("./routes/processRoutes");
const app = express();
const PORT = process.env.PORT || 3001;



app.use(cors());
app.use(express.json({
    limit: "20mb"
}));

app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.send("Argus Template API running.");
});

app.use("/api", processRoutes);

app.listen(PORT, () => {
    console.log(`Argus API started on port ${PORT}`);
});