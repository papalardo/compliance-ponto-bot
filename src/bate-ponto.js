import puppeteer from "puppeteer";

const LOGIN_URL = 'https://portal.compliancehcm.com.br/apex/f?p=187';

const batePonto = async (userEmail, userPassword) => {
    if (!userEmail || !userPassword) {
        throw "Credenciais inválidas";
    }

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    const page = await browser.newPage();
    await page.goto(LOGIN_URL);

    // Login
    await page.$eval('input[name=P101_USERNAME]', (el, value) => el.value = value, userEmail)
    await page.$eval('input[name=P101_PASSWORD]', (el, value) => el.value = value, userPassword);
    await page.click('#P101_LOGIN');

    try {
        // Botão para abrir modal
        const baterPontoBtn = await page.waitForSelector('#B491409282691032647', {
            timeout: 5000,
        });
        await baterPontoBtn.click();
    } catch (e) {
        throw e;
        throw "Erro ao realizar login";
    }

    const iframe = await page.waitForSelector('iframe', {
        timeout: 2000,
    });
    const frame = await iframe.contentFrame();

    await frame.waitForSelector('#P22_HORA', {
        timeout: 2000,
    });
    await page.waitForTimeout(2000); // Aguarda as horas aparecerem

    // Confirmação
    const confirmarBatidaBtn = await frame.waitForSelector('#B491409745545032651', {
        timeout: 2000,
    });
    await confirmarBatidaBtn.click();

    // Validando sucesso
    await page.waitForSelector('#APEX_SUCCESS_MESSAGE', {
        timeout: 2000,
    });

    await page.screenshot({
        path: 'result.png'
    });

    await browser.close();

    return true;
}

export default batePonto;