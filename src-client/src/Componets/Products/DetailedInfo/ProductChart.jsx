import React, { useEffect, useRef, useState } from 'react';
import {Chart, registerables } from 'chart.js';
import axios from 'axios';
import 'chartjs-adapter-date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ru } from 'date-fns/locale'
Chart.register(...registerables);



// { ourPriceData, competitorsData }
const LineChart = ({productId, modalChange}) => {

  const chartRef = useRef();
  const [productHistory, setProductHistory] = useState([]);
  const [productName, setProductName] = useState('');
  const [competitorsHistory, setCompetitorsHistory] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;



  const fetchHistory = async () => {
    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${baseUrl}/products/history/${productId}`);
      const { our_history, our_product_name, competitors_history } = response.data;
      setProductHistory(our_history);
      setProductName(our_product_name);
      setCompetitorsHistory(Object.entries(competitors_history));
    } catch (error) {
      console.error('Error fetching product history:', error);
    }
  };

  useEffect(() => {

    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate);
    defaultStartDate.setDate(currentDate.getDate() - 7); 
    const defaultEndDate = new Date(currentDate);
    
    setDateRange([defaultStartDate, defaultEndDate]);
    console.log(dateRange)
    fetchHistory();
  }, [modalChange]);

  useEffect(() => {
    if (productHistory.length === 0 || competitorsHistory.length === 0) return;

    const filteredProductHistory = productHistory.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  
    const filteredCompetitorsHistory = competitorsHistory.map(([competitorName, competitorHistory]) => {
      const filteredCompetitorHistory = competitorHistory.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endDate;
      });
      return [competitorName, filteredCompetitorHistory];
    });
  
    const dates = filteredProductHistory.map(entry => entry.date);
    const ourPriceData = filteredProductHistory.map(entry => entry.price);
    const competitorDatasets = filteredCompetitorsHistory.map(([competitorName, competitorHistory]) => ({
      label: competitorName.substring(0, 30),
      originalLabel: competitorName, 
      data: competitorHistory.map(entry => entry.price),
      fill: false,
      borderColor: '#' + Math.floor(Math.random()*16777215).toString(16), // Генерация случайного цвета
      tension: 0.1,
    }));
  
    const existingChart = Chart.getChart(chartRef.current);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Наш товар',
            data: ourPriceData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
          ...competitorDatasets,
        ],
      },
      options: {
        scales: {
          
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
        },
      },
      // plugins: {
      //   tooltip: {
      //     callbacks: {
      //       label: function(context) {
      //         const dataset = context.dataset;
      //         const label = dataset.originalLabel || dataset.label || '';
      //         const value = context.parsed.y || '';
      //         return `${label}: ${value}`;
      //       },
      //     },
      //   },
      //   legend: {
      //     labels: {
      //       filter: function(legendItem) {
      //         return legendItem.text.length <= 20; // Показываем только сокращенные названия
      //       },
      //     },
      //   },
      // },
    });

  }, [productHistory, competitorsHistory, productName, dateRange]);







  return (
  <div className=''>
    <canvas ref={chartRef} />
    <div className=''>
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={false}
      locale={ru}
    />
    </div>
  </div>);
};

export default LineChart;
