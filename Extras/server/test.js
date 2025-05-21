const puppeteer = require("puppeteer");

const browser = puppeteer.launch();
const page = browser.newPage();
page.goto("https://localhost:8080/", {
  waitUntil: "networkidle2",
});
// Saves the PDF to hn.pdf.
page.pdf({
  path: "hn.pdf",
});

browser.close();
