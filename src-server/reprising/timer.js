const cron = require('node-cron');
const  {checkProductsAndCompetitors}  = require('./checkData');
const { updateComp } = require('./updateComp');
const { repriceProducts } = require('./repriceOurProducts');

async function scheduledTask() {
    console.log("Проверка данных для репрайсинга: " + new Date());
    const canProceedWithRepricing = await checkProductsAndCompetitors();
    console.log(canProceedWithRepricing)
    if (canProceedWithRepricing) {
        console.log("Условия удовлетворены, начинаем процесс репрайсинга.");
        const statusUpdate = await updateComp()
        if (statusUpdate) {
            await repriceProducts()
            console.log("Успех!!!!")
        }
    } else {
        console.log("Условия не удовлетворены, репрайсинг не выполняется.");
    }
}

function setupCronJobs() {
    
    cron.schedule('*/1 * * * *', scheduledTask);
}

module.exports = { setupCronJobs , scheduledTask};