const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const URL = "https://forums.spacebattles.com/threads/ashen-legacy-trails-of-cold-steel-next-gen-quest.1109907/";

app.get("/fetch-table", async (req, res) => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });

        const tableHtml = await page.evaluate(() => {
            const posts = document.querySelectorAll('[data-author="ArcherM"]');
            for (const post of posts) {
                const tables = post.querySelectorAll("table");
                for (const table of tables) {
                    if (table.innerText.toLowerCase().includes("omake bonus")) {
                        return table.outerHTML;
                    }
                }
            }
            return null;
        });

        if (tableHtml) {
            res.json({ tableHtml });
        } else {
            res.status(404).json({ error: "Table not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
        if (browser) await browser.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});