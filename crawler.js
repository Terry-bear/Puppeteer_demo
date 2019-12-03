const puppeteer = require("puppeteer");
const fs = require("fs");
const gm = require("gm");

const imageMagick = gm.subClass({imageMagick:true });
const { readFiles } = require("./readF");

const B_WIDTH = 1440;
const B_HEIGHT = 880;
const IdArr = readFiles("sinan");
console.log(IdArr);
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: B_WIDTH,
    height: B_HEIGHT,
    deviceScaleFactor: 1
  });
  console.log(`浏览器窗口设定成功!: ${B_WIDTH}*${B_HEIGHT}`);
  page.on('load', () => console.log('Page loaded!', page.url()));
  await page.goto("http://47.99.128.84:10001/user/login");
  // TODO 登录的逻辑
  await page.focus("#userName");
  await page.keyboard.sendCharacter("admin");
  await page.focus("#password");
  await page.keyboard.sendCharacter("admin888");
  const login_btn = await page.$("button");
  await login_btn.click();
  console.log("登录成功 !");
  await delay(2000)
  // TODO 创建📂文件夹
  fs.mkdir('./dist', { recursive: true }, (err) => {
    if (err) console.log('没有此文件夹,自动创建dist');
  });
  for (const obj of IdArr) {
    // TODO 进入详情页面的逻辑
    await page.goto(`http://47.99.128.84:10001/orderflow/detail?id=${obj.ID}`);
    await delay(5000);
    fs.mkdirSync('dist/' + obj.ID);
    await page.screenshot({
      path: './dist/' + obj.ID + "/detail.png",
      fullPage: true,
    });
    // TODO 截图保存
    imageMagick('./dist/' + obj.ID + "/detail.png").chop(225, 70, 0, 0)
    .write(`./dist/${obj.ID}/fdetail.png`, function (err) {
      if (!err) console.log('done');
    });
    const Locus_btn = await page.$("button.ant-btn-primary");
    await Locus_btn.click();
    await page.waitFor(5000);
    console.log('come in the trajectory !');
    await page.screenshot({
      path: "./dist/" + obj.ID + "/flowDetail.png",
      fullPage: true,
    });
    imageMagick(`./dist/${obj.ID}/flowDetail.png`).chop(460, 0, 0, 0)
    .write(`./dist/${obj.ID}/fwdetail.png`, function (err) {
      if (!err) console.log('done');
    });
    console.log('wancheng ..')
  }
  // 生成 'screen' media 格式的pdf.
  // await page.screenshot({ path: "example.png" });

  
  await browser.close();
})();

function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
