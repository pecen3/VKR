import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';



const Product = () => {
 return (
  <div className="card col" >
  <img src="https://static.gigabyte.com/StaticFile/Image/Global/aefab50c335a4d547af667dabfff0357/Product/17090/Png" className="card-img-top" style={{width: "180px", height: "180px"}} />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  
</div>
  
 )
}

export default Product;