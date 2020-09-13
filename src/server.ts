import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import { json } from "body-parser";
import * as sapper from "@sapper/server";
import * as DiagramController from "./app/controllers/DiagramController";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
  .use(json())
  .post("/diagrams", DiagramController.create)
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
