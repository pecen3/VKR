import React, { useEffect, useRef,  useId } from 'react';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const PriceChart = ({ id, ourPrice, competitorsPrices }) => {

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
    // console.log( allPrices)
    // console.log( labels)
    // console.log( chartData)

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
}, []);




  return (
  <div key={chartId} className='sd' style={{ width:"270px", }}>
    <canvas id={`chart-${id}`} ref={canvasRef} />
  </div>
  );




  // const canvasRef = useRef(null);

  // useEffect(() => {
  //   const parsedOurPrice = parseInt(ourPrice, 10);
  //   const parsedCompetitorPrices = competitorPrices.map(price => parseInt(price, 10));

  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');

  //   const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  //   gradient.addColorStop(0, 'green');
  //   gradient.addColorStop(1, 'red');

  //   const chart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: ['Our Price', 'Competitor Prices'],
  //       datasets: [{
  //         label: 'Prices',
  //         data: [parsedOurPrice, Math.max(...parsedCompetitorPrices)],
  //         backgroundColor: gradient,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       indexAxis: 'y', // Горизонтальная ось
  //       scales: {
  //         x: {
  //           beginAtZero: true,
  //           ticks: {
  //             callback: function(value) {
  //               return '$' + value;
  //             }
  //           }
  //         }
  //       },
  //       plugins: {
  //         legend: {
  //           display: false
  //         }
  //       },
  //       responsive: false, // Отключаем авто-масштабирование
  //       maintainAspectRatio: true // Устанавливаем пропорциональное соотношение
  //     }
  //   });

  //   return () => chart.destroy();
  // }, [ourPrice, competitorPrices]);

  // return (
  //   <div style={{ width: '100%', height: '100%' }}>
  //     <canvas ref={canvasRef} width="150" height="50" />
  //   </div>
  // );






  // const [chart, setChart] = useState(null);

  // useEffect(() => {
  //   const ctx = document.getElementById('chart').getContext('2d');
  //   const chartData = {
  //     labels: ['Min', 'Max'],
  //     datasets: [{
  //       label: 'Price Comparison',
  //       data: [
  //         Math.min(...competitorPrices.map(Number)),
  //         Math.max(...competitorPrices.map(Number)),
  //       ],
  //       backgroundColor: [
  //         'rgba(0, 128, 0, 0.5)', // green
  //         'rgba(255, 0, 0, 0.5)', // red
  //       ],
  //       borderColor: [
  //         'rgba(0, 128, 0, 1)', // green
  //         'rgba(255, 0, 0, 1)', // red
  //       ],
  //       borderWidth: 1,
  //     }],
  //   };

  //   const options = {
  //     scales: {
  //       y: {
  //         display: false,
  //       },
  //     },
  //     plugins: {
  //       legend: {
  //         display: false,
  //       },
  //     },
  //   };

  //   setChart(new Chart(ctx, {
  //     type: 'bar',
  //     data: chartData,
  //     options,
  //   }));

  //   // Add arrow to indicate our price
  //   const ourPriceValue = Number(ourPrice);
  //   const arrowX = ourPriceValue / Math.max(...competitorPrices.map(Number));
  //   const arrowY = 10; // adjust this value to position the arrow correctly
  //   ctx.beginPath();
  //   ctx.moveTo(arrowX, arrowY);
  //   ctx.lineTo(arrowX, arrowY - 10);
  //   ctx.stroke();
  // }, [ourPrice, competitorPrices]);

  // return (
  //   <div>
  //     <canvas id="chart" width="400" height="100"></canvas>
  //   </div>
  // );
};

export default PriceChart;
