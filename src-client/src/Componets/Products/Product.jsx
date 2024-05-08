import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import ProductModal from './DetailedInfo/ProductModal';
import PriceChart from './PriceChart';
import { constructNow, formatRelative} from 'date-fns'
import { ru } from 'date-fns/locale/ru'



// function daysDiff(dateTimeString) {
//   // Преобразуем строку в объект Date
//   const dateObject = new Date(dateTimeString);

//   // Разница в миллисекундах между указанной датой и текущим моментом
//   const differenceInMs = Date.now() - dateObject.getTime();

//   // Преобразуем разницу в дни
//   const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
//   console.log(dateObject )
//   return differenceInDays;
// }



const Product = ({id}) => {
  const [productInfo, setProductInfo] = useState(null);
  const [modalChange, setModalChange] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
  }, [id, modalChange, searchParams]);

  const shouldRenderProduct = () => {
    const searchTerm = searchParams.get('search');
    const selectedCategories = searchParams.getAll('category');

    if (searchTerm && !productInfo?.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (selectedCategories.length > 0 && !selectedCategories.includes(productInfo?.category_id)) {
      return false;
    }

    return true;
  };
 return productInfo && shouldRenderProduct() && (
  
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
    <div >
      <Button variant="primary" onClick={() => setModalShow(true)} size="sm">
        Подробнее
      </Button>

      <ProductModal
        productInfo={productInfo}
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalChange={modalChange}
        setModalChange={setModalChange}
      />
    </div>
  </Stack>
  </td>
<td>
  <Stack className="text-center">
    <div>{productInfo.price}</div>
    {productInfo.updated_at ? <div className='text-secondary font-weight-light' style={{ fontSize: "10px" }}>Обновлено {formatRelative(new Date(productInfo.updated_at), new Date(), { locale: ru })}</div> : ''}

  </Stack>
</td>
<td className=" text-center">{productInfo.min_price}</td>
<td className="text-center">{productInfo.rec_price}</td>
{/* <td>{productInfo.competitors_price && <PriceChart ourPrice={productInfo.price} competitorPrices={productInfo.competitors_price}/>}</td> */}
<td className="text-center">{productInfo.competitors_price && <PriceChart  id={productInfo.id} ourPrice={productInfo.price} competitorsPrices={productInfo.competitors_price} />}</td>
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