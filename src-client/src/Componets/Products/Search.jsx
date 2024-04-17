import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';



const Search = () => {
 return (
<div class="input-group">
  <input type="search" class="form-control rounded" placeholder="Введите название товара" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-primary" data-mdb-ripple-init>Поиск</button>
</div>
 )
}

export default Search;