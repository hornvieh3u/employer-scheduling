// ** React Imports
import { Fragment,useEffect } from 'react';

// ** Product components
import CourseCards from './CourseCards';
import CoursesHeader from './CoursesHeader';
import CoursesSearchbar from './CoursesSearchbar';
import { useDispatch,useSelector} from 'react-redux';
// ** Third Party Components
import classnames from 'classnames';
import { courseFetchAction } from './store/actions';
// ** Reactstrap Imports
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CoursesPage = (props) => {
  const dispatch=useDispatch();
  const store = useSelector((state) => state.course);
  // ** Props
  const {
    type,
    addToCart,
    activeView,
    sidebarOpen,
    getProducts,
    getCartItems,
    addToWishlist,
    setActiveView,
    deleteCartItem,
    setSidebarOpen,
    deleteWishlistItem
  } = props;

  // ** Handles pagination
  // const handlePageChange = (val) => {
  //   if (val === 'next') {
  //     dispatch(getProducts({ ...store.params, page: store.params.page + 1 }));
  //   } else if (val === 'prev') {
  //     dispatch(getProducts({ ...store.params, page: store.params.page - 1 }));
  //   } else {
  //     dispatch(getProducts({ ...store.params, page: val }));
  //   }
  // };

  // ** Render pages
  // const renderPageItems = () => {
  //   const arrLength =
  //     store.totalProducts !== 0 && store.products.length !== 0
  //       ? Number(store.totalProducts) / store.products.length
  //       : 3;

  //   return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
  //     return (
  //       <PaginationItem
  //         key={index}
  //         active={store.params.page === index + 1}
  //         onClick={() => handlePageChange(index + 1)}
  //       >
  //         <PaginationLink href="/" onClick={(e) => e.preventDefault()}>
  //           {index + 1}
  //         </PaginationLink>
  //       </PaginationItem>
  //     );
  //   });
  // };

  // ** handle next page click
  // const handleNext = () => {
  //   if (store.params.page !== Number(store.totalProducts) / store.products.length) {
  //     handlePageChange('next');
  //   }
  // };
  useEffect(() => {
    dispatch(courseFetchAction())
    
    }, [])

  return (
    <div className="content-detached content-right">
      <div className="content-body">
        {/* <CoursesHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        /> */}
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        {/* <CoursesSearchbar dispatch={dispatch} getProducts={getProducts} store={store} /> */}
        {store.courseList.length ? (
          <Fragment>
            <CourseCards
              // store={store}
              type={type}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={store?.courseList}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />
            {/* <Pagination className="d-flex justify-content-center ecommerce-shop-pagination mt-2">
              <PaginationItem
                disabled={store.params.page === 1}
                className="prev-item"
                onClick={() => (store.params.page !== 1 ? handlePageChange('prev') : null)}
              >
                <PaginationLink href="/" onClick={(e) => e.preventDefault()}></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className="next-item"
                onClick={() => handleNext()}
                disabled={store.params.page === Number(store.totalProducts) / store.products.length}
              >
                <PaginationLink href="/" onClick={(e) => e.preventDefault()}></PaginationLink>
              </PaginationItem>
            </Pagination> */}
          </Fragment>
        ) : (
          <div className="d-flex justify-content-center mt-5">
            <p>Please add courses from Managecourses&#62;Courses&#62;AddCourse to see courses here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
