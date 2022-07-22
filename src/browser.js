import puppeteer from "puppeteer/lib/types.js";

const browser = () => {
    let browserInstance;
    const instance = async () => {
        if (browserInstance) {
            return browserInstance;
        }
        browserInstance = await puppeteer.launch({
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        });

        return browserInstance;
    }

    return {
        instance
    };
}

export default browser();