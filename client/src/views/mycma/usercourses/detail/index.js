// ** React Imports
import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

// ** Product detail components
import ItemFeatures from './ItemFeatures';
import CourseDetails from './CourseDetails';
import RelatedCourses from './RelatedCourses';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, deleteWishlistItem, addToWishlist, addToCart } from '../store';

import '@styles/base/pages/app-ecommerce-details.scss';

const Details = () => {
  // ** Vars
  const params = useParams().product;
  const productId = params.substring(params.lastIndexOf('-') + 1);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Course Details"
        breadCrumbParent="My Courses"
        breadCrumbActive="Details"
      />
      <div className="app-ecommerce-details">
        {Object.keys(store.productDetail).length ? (
          <Card>
            <CardBody>
              <CourseDetails
                dispatch={dispatch}
                addToCart={addToCart}
                productId={productId}
                getProduct={getProduct}
                data={store.productDetail}
                addToWishlist={addToWishlist}
                deleteWishlistItem={deleteWishlistItem}
              />
            </CardBody>
            <hr />
            <ItemFeatures />
            <CardBody>
              <RelatedCourses />
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Details;
