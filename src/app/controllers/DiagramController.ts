import { promises as fsPromises } from "fs";
import * as DiagramService from "../services/DiagramService";

export const create = async (req, res) => {
  try {
    const { filecontent } = req.body;
    const output = await DiagramService.genDiagram(filecontent);
    const file = await fsPromises.readFile(output);

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": file.length,
    });
    res.end(file);
  } catch (e) {
    res.writeHead(400, {
      "Content-Type": "application/json",
    });
    console.log(e);
    const msg = e && typeof e === "string" ? e?.split("line")?.[1] : "error";
    res.end(msg ? "line " + msg : "error");
  }
};
