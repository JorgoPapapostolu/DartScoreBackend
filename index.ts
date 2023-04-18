import app from "./server";
import dotenv from "dotenv";
dotenv.config()

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});