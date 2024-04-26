import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Stack from 'react-bootstrap/Stack';
import MyDisclosure from './DetailedInfo/ProductDisclosure';
import PriceChart from './PriceChart';

const pr = [
  12233,
  10000,
  11000,
  13000,
  14000,
  15000,
  16000,
  17000,
  18000,
  19000,
  20001
]

function formatDateTime(dateTimeString) {
  const dateObject = new Date(dateTimeString);

  const day = dateObject.getDate().toString().padStart(2, '0'); 
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
  const hours = dateObject.getHours().toString().padStart(2, '0'); 
  const minutes = dateObject.getMinutes().toString().padStart(2, '0'); 

  const formattedDate = `${day}.${month} ${hours}:${minutes}`;
  return formattedDate;
}

const Product = ({id}) => {
  const [productInfo, setProductInfo] = useState([])
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        
        const baseUrl = process.env.REACT_APP_BASE_URL;
   
        
        const response = await axios.get(`${baseUrl}/products/${id}`);

        setProductInfo(response.data);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
  }, []);



 return (
<tr >
<td>
  <img src={productInfo.image} className="card-img-left" style={{width: "150px", height: "150px"}} />
  </td>
<td>
  <Stack gap={2}>
  {productInfo.title ? <div className="font-weight-normal text-primary" title={productInfo.title}>{productInfo.title ? (productInfo.title.slice(0, 40) + '...') : ""}</div> : ""}
    
    
    <div style={{fontSize: "14px"}}>
    <div className='text-secondary font-weight-light'><i className="bi bi-upc-scan"></i> {productInfo.ym_id}</div>
    <div className='text-secondary font-weight-light'><i class="bi bi-collection"></i> {productInfo.category_name}</div>
    </div>
  </Stack>
  </td>
<td>
  <Stack className="text-center">
    <div>{productInfo.price}</div>
    <div className='text-secondary font-weight-light' style={{fontSize: "10px"}}>Обновлено: {formatDateTime(productInfo.updated_at)}</div>
  </Stack>
</td>
<td className=" text-center">{productInfo.min_price}</td>
<td className="text-center">{productInfo.rec_price}</td>
{/* <td>{productInfo.competitors_price && <PriceChart ourPrice={productInfo.price} competitorPrices={productInfo.competitors_price}/>}</td> */}
<td className="text-center">{productInfo.competitors_price && <PriceChart  id={productInfo.id} ourPrice={productInfo.price} competitorsPrices={productInfo.competitors_price}/>}</td>
<td>
<Stack className="text-center">
    <div>{productInfo.rule_description}</div>
    <div className='text-secondary font-weight-light' style={{fontSize: "10px"}}>{productInfo.rule_rule}</div>
  </Stack>
</td>
</tr>

 )
}

export default Product;