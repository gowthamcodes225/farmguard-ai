const puppeteer = require("puppeteer");
const path = require("path");

async function pdf(htmlName, pdfName) {
  const dir = __dirname;
  const html = path.join(dir, htmlName);
  const pdf = path.join(dir, pdfName);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`file://${html.replace(/\\/g, "/")}`, { waitUntil: "networkidle0" });
  await page.pdf({ path: pdf, format: "A4", printBackground: true });
  await browser.close();
  console.log("Created:", pdf);
}

(async () => {
  await pdf("index.html", "FarmGuard-AI-Presentation.pdf");
  await pdf("report.html", "FarmGuard-AI-Project-Report.pdf");
})();
