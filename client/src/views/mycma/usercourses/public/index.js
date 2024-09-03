// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Shop Components
import Sidebar from './Sidebar';
import Products from './Products';
import HeroArea from './HeroArea';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem
} from '../store';

// ** Styles
import '@styles/react/apps/app-ecommerce.scss';

const PublicShop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [type, setType] = useState('membership');

  // ** Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1
      })
    );
  }, [dispatch]);

  return (
    <Fragment>
      <HeroArea />
      <Products
        store={store}
        dispatch={dispatch}
        type={type}
        addToCart={addToCart}
        activeView={activeView}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
      <Sidebar sidebarOpen={sidebarOpen} type={type} setType={setType} />
    </Fragment>
  );
};
export default PublicShop;
