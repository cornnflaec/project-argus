const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const mammoth = require("mammoth");

exports.render = async (fileBuffer, placeholders) => {

    const zip = new PizZip(fileBuffer);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.render(placeholders);

    const renderedBuffer = doc.getZip().generate({
        type: "nodebuffer",
    });

    const result = await mammoth.convertToHtml({
        buffer: renderedBuffer,
    });

    return result.value;
};

exports.renderText = (text, placeholders) => {

    let output = text;

    for (const [key, value] of Object.entries(placeholders)) {

        output = output.replaceAll(
            `{${key}}`,
            value ?? ""
        );

    }

    return output;

};