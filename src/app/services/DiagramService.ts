import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";
import slugify from "slugify";

const outputPrefix = "tmp";

const rootDir = path.resolve(__dirname, "../../../");
const tmpDir = path.resolve(rootDir, "tmp");
const pyagramDir = path.join(rootDir, "pyagram");

export const genDiagram = async (filecontent: string) => {
  const filename = parseFilename(filecontent);
  const TB = parseTB(filecontent);
  const slugifiedFilename = `${slugify(filename, {
    remove: /[*+~.()'"!:@]/g,
    replacement: "_",
    lower: true,
  })}`;

  let args = `"${filename}", show=False, filename="${slugifiedFilename}"`;
  if (TB) args += `, direction="${TB}"`;
  const content = filecontent.replace(
    /Diagram\((.*?)\)\:/g,
    `Diagram(${args}):`
  );

  const slugifiedPyFilename = `${slugifiedFilename}.py`;

  const pythonFile = path.join(pyagramDir, slugifiedPyFilename);
  await fs.promises.writeFile(pythonFile, content);

  const outputFilename = `${outputPrefix}/${slugifiedFilename}.png`;
  return new Promise((resolve: (output: string) => void, reject) => {
    exec(
      `python ${pythonFile}`,
      {
        cwd: tmpDir,
      },
      (error, _, stderr) => {
        if (error) {
          reject(error.message);
          return;
        }
        if (stderr) {
          reject(stderr);
          return;
        }
        resolve(outputFilename);
      }
    );
  });
};

const parseFilename = (filecontent: string) => {
  const reg = /Diagram\((name=)?"(.*?)"/g;
  const matches = reg.exec(filecontent);

  return matches?.[2] || "diagram";
};

const parseTB = (filecontent: string) => {
  const reg = /Diagram\((.*?)direction="(.*?)"/g;
  const matches = reg.exec(filecontent);

  return matches?.[2] || "LR";
};
