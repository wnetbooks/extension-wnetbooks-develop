await load("config.js")


async function execute(url) {
    await page.goto(url);
    const title = await page.title();
    return title;
}





