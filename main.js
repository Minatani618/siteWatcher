const puppeteer = require("puppeteer");

//【つかいかた】
//node main.js 対象のURL 対象の文字列
//のようにコマンドで指定して呼び出す
const targetURL = process.argv[2];
const targetString = process.argv[3];

const main = async (targetURL, targetString) => {
  // Puppeteerを起動
  const browser = await puppeteer.launch();

  // 新しいページを開く
  const page = await browser.newPage();

  try {
    // 指定されたURLにアクセス
    await page.goto(targetURL);

    // ページのコンテンツを取得
    const pageContent = await page.content();

    // 特定の文字列がページコンテンツに含まれているか確認
    if (pageContent.includes(targetString)) {
      console.log(
        `webページ (o: ${targetURL})内に文字列(${targetString})を発見した。`
      );
    } else {
      console.log(
        `webページ (x: ${targetURL})内に文字列(${targetString})を発見できなかった。`
      );
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
  } finally {
    // ブラウザを閉じる
    await browser.close();
  }
};

const interval = 24 * 60 * 60 * 1000; //インターバルは毎日とする

//間隔実行
setInterval(() => {
  main(targetURL, targetString);
}, interval);

//即時実行
main(targetURL, targetString);
