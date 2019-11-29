const puppeteer = require("puppeteer");
const fs = require("fs");
const { readFiles } = require("./readF");
const B_WIDTH = 1440;
const B_HEIGHT = 880;
const IdArr = readFiles("sinan");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: B_WIDTH,
    height: B_HEIGHT,
    deviceScaleFactor: 1
  });
  console.log(`浏览器窗口设定成功!: ${B_WIDTH}*${B_HEIGHT}`);
  await page.goto("http://118.31.123.155/user/login");
  
  // TODO 登录的逻辑
  await page.focus("#userName");
  await page.keyboard.sendCharacter("admin");
  await page.focus("#password");
  await page.keyboard.sendCharacter("admin888");
  const login_btn = await page.$("button");
  await login_btn.click();
  console.log("登录成功 !");
  await delay(2000);
  
  // TODO 进入详情页面的逻辑
  await page.goto(`http://118.31.123.155/orderflow/detail?id=44428`);
  await delay(5000);
  const Locus_btn = await page.$("button.ant-btn-primary");
  await Locus_btn.click();
  await page.waitFor(5000);
  await page.screenshot({ path: "example.png" });

  
  await browser.close();
})();

function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
