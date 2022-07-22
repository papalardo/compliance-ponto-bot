import puppeteer from "puppeteer";

const browser = () => {
    let browserInstance;
    const instance = async () => {
        if (browserInstance) {
            return browserInstance;
        }
        browserInstance = await puppeteer.launch({
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