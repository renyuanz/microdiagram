import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";
import slugify from "slugify";

const outputPrefix = "tmp";

const rootDir = path.resolve(__dirname, "../../../");
const pyagramDir = path.join(rootDir, "pyagram");

export const create = async (req, res) => {
  try {
    const { filename, filecontent } = req.body;
    const output = await genDiagram(outputPrefix, filename, filecontent);
    const file = await fs.promises.readFile(output);

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": file.length,
    });
    res.end(file);
  } catch (e) {
    console.log(e);
    res.end();
    // res.end("line " + msg);
  }
};

export const genDiagram = async (
  dir: string,
  filename: string,
  filecontent: string
) => {
  const finalfilename = `${dir}/${filename}`;

  const args = `"${filename}", show=False, filename="${finalfilename}"`;
  const content = filecontent.replace(
    /Diagram\(([^)]+)\)/g,
    `Diagram(${args})`
  );

  const pythonFile = path.join(pyagramDir, `${(slugify(filename), "_")}.py`);
  await fs.promises.writeFile(pythonFile, content);

  const outputFilename = `${finalfilename}.png`;
  return new Promise((resolve: (output: string) => void, reject) => {
    exec(`python ${pythonFile}`, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(outputFilename);
    });
  });
};
