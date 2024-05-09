import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom';
const Menu = () => {
  
  return( 

   
    <div className="col-auto col-md-3 col-xl-2 px-sm-1 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Price adjust</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {/* <li className="nav-item">
                        <Link to='/' className="nav-link align-middle px-0"><i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Начало</span></Link>
 
                    </li> */}
                    <li>
                    <Link to='/products' className="nav-link align-middle px-0"><i className="fs-4 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Товары</span></Link>
                    </li>
                    <li>
                    <Link to='/competitors' className="nav-link align-middle px-0"><i className="fs-4 bi-shop"></i> <span className="ms-1 d-none d-sm-inline">Магазины конкурентов</span></Link>
                    </li>
                    <li>
                    <Link to='/rules' className="nav-link align-middle px-0"><i class="fs-4 bi-file-earmark-ruled"></i> <span className="ms-1 d-none d-sm-inline">Правила ценообразования</span></Link>
                    </li>
                    <li>
                    <Link to='/parser' className="nav-link align-middle px-0"><i class="fs-4 bi-search"></i> <span className="ms-1 d-none d-sm-inline">Парсер</span></Link>
                    </li>
                    <li>
                    <Link to='/analytics' className="nav-link align-middle px-0"><i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Аналитика</span></Link>
                    </li>
                    <li>
                    <Link to='/settings' className="nav-link align-middle px-0"><i className="fs-4 bi-gear-fill"></i> <span className="ms-1 d-none d-sm-inline">Настройки</span></Link>
                    </li>
                    {/* <li>
                        <a href="#"  className="nav-link px-0 align-middle ">
                            <i class="fs-4 bi-bootstrap"></i> <span class="ms-1 d-none d-sm-inline">Bootstrap</span></a>
                    </li>

                    <li>
                        <a href="#" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </a>
                    </li> */}
                </ul>
                <hr/>

            </div> {/* <div class="col py-3">
            <h3>Left Sidebar with Submenus</h3>
            <p class="lead">
                An example 2-level sidebar with collasible menu items. The menu functions like an "accordion" where only a single 
                menu is be open at a time. While the sidebar itself is not toggle-able, it does responsively shrink in width on smaller screens.</p>
            <ul class="list-unstyled">
                <li><h5>Responsive</h5> shrinks in width, hides text labels and collapses to icons only on mobile</li>
            </ul>
        </div> */}
        </div>
       
   
    
)
}

export default Menu;