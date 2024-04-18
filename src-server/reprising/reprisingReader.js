
function calculateRecommendedPrice(product, ruleString) {
  const { price, min_price, competitors_price } = product;
  const currentPrice = parseFloat(price);  
  const cost = parseFloat(min_price); 
  const competitorsPrices = competitors_price.map(Number);
  const min = Math.min(...competitorsPrices);
  const max = Math.max(...competitorsPrices);
  const avg = competitorsPrices.reduce((sum, p) => sum + p, 0) / competitorsPrices.length;
  const median = getMedian(competitorsPrices);
  const stdDev = calculateStdDev(competitorsPrices);  

  
  try {
      const calculatePrice = new Function('cost', 'currentPrice', 'min', 'max', 'avg', 'median', 'stdDev', `return ${ruleString};`);
      const recPrice = calculatePrice(cost, currentPrice, min, max, avg, median, stdDev);
      return recPrice;
  } catch (error) {
      console.error('Ошибка при выполнении правила: ', error);
      return null; 
  }
}


function getMedian(numbers) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}
function calculateStdDev(numbers) {
  const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
  const variance = numbers.reduce((acc, val) => acc + (val - mean) ** 2, 0) / numbers.length;
  return Math.sqrt(variance);
}

const productExample = {
  "id": "5fa4c042-7651-44e3-a052-fbd8fa811d29",
  "price": "2099",
  "min_price": "2000",
  "competitors_price": ["795", "682", "2100", "2090", "2085"]
};

const ruleStringExample = "(stdDev > 1000) ? cost + cost * 0.20 : cost + cost * 0.10";


const recommendedPrice = calculateRecommendedPrice(productExample, ruleStringExample);
console.log(`Рекомендованная цена: ${recommendedPrice}`);
