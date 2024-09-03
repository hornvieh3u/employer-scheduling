// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Shop Components
import Sidebar from './Sidebar';
import CoursesPage from './Courses';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem
} from './store';

// ** Styles
import '@styles/react/apps/app-ecommerce.scss';

const Courses = () => {
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
      <Breadcrumbs breadCrumbTitle="Courses" breadCrumbParent="My CMA" breadCrumbActive="Courses" />
      <CoursesPage
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
export default Courses;
