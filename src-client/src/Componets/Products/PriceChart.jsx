import React, { useEffect, useRef,  useId } from 'react';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const PriceChart = ({ id, ourPrice, competitorsPrices}) => {

  const chartId = useId();
  const canvasRef = useRef();
 
  useEffect(() => {
    const existingChart = Chart.getChart(canvasRef.current);
    if (existingChart) {
      existingChart.destroy();
    }
    
    // Преобразуем цены в числа и отсортируем по возрастанию
    const ourPriceNumber = parseInt(ourPrice);
    const competitorsPricesNumbers = competitorsPrices.map(price => parseInt(price));

    // Добавляем нашу цену в массив конкурентов и сортируем
    const allPrices = competitorsPricesNumbers.concat(ourPriceNumber).sort((a, b) => a - b);
    const ourPriceIndex = allPrices.indexOf(ourPriceNumber);

    // Формируем данные для графика и легенды
    const chartData = allPrices.filter((price, index) => index !== ourPriceIndex);
    const labels = allPrices.map((price, index) => {
        if (index === ourPriceIndex) {
            return 'Наш товар';
        }
        return ``;
    });


    new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Цена нашего товара',
            data: allPrices,
            backgroundColor: labels.map(label => {
              if (label === 'Наш товар') {
                return 'rgba(255, 99, 132, 0.2)'; // Цвет для нашей цены
              }
              return 'rgba(54, 162, 235, 0.2)'; // Цвет для остальных цен
            }),
            borderColor: labels.map(label => {
              if (label === 'Наш товар') {
                return 'rgba(255, 99, 132, 1)'; // Цвет границы для нашей цены
              }
              return 'rgba(54, 162, 235, 1)'; // Цвет границы для остальных цен
            }),
            borderWidth: 1,
            barThickness: 9
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              min: parseInt(Math.min(...chartData)/4),
              max: Math.max(...chartData) +1000
            }
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                // boxWidth: 18,
                // boxHeight: 6,
                display: false,
              }
            }
          }
        }
    });
}, [competitorsPrices, ourPrice]);




  return (
  <div key={chartId} className='sd' style={{ width:"270px", }}>
    <canvas id={`chart-${id}`} ref={canvasRef} />
  </div>
  );



};

export default PriceChart;
