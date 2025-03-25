import handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";

export const loadTemplate = async (templateName, data) => {
  try {
    const filePath = path.join( "views", `${templateName}.hbs`);
    const templateSource = await fs.readFile(filePath, "utf-8");
    const template = handlebars.compile(templateSource);
    return template(data);
  } catch (error) {
    console.error(`${templateName} loading failed`, error);
  }
};
