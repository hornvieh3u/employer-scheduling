// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import { Star, ShoppingCart, Heart } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap';

// ** Icons Impots
import { GiNotebook } from 'react-icons/gi';
import { FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { BsCalendar2Date } from 'react-icons/bs';
import { MdOutlineWatchLater } from 'react-icons/md';

const CourseCards = (props) => {
  // ** Props
  const {
    // store,
    type,
    products,
    dispatch,
    addToCart,
    activeView,
    getProducts,
    getCartItems,
    addToWishlist,
    deleteWishlistItem
  } = props;

  // // ** Handle Move/Add to cart
  // const handleCartBtn = (id, val) => {
  //   if (val === false) {
  //     dispatch(addToCart(id));
  //   }
  //   dispatch(getCartItems());
  //   dispatch(getProducts(store.params));
  // };

  // // ** Handle Wishlist item toggle
  // const handleWishlistClick = (id, val) => {
  //   if (val) {
  //     dispatch(deleteWishlistItem(id));
  //   } else {
  //     dispatch(addToWishlist(id));
  //   }
  //   dispatch(getProducts(store.params));
  // };

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map((item) => {
        const CartBtnTag = item.isInCart ? Link : 'button';

        return (
          <Card className="ecommerce-card" key={item.name}>
            <div className="item-img text-center mx-auto">
              {/* <Link to={`/mycma/product-detail/${item.slug}`}> */}
                <img width="300" height="200" className="card-img-top" src={item.courseImage}   />
              {/* </Link> */}
            </div>
            <CardBody>
              <div className="item-wrapper">
                <div className="item-rating">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.rating,
                              'unfilled-star': index + 1 > item.rating
                            })}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="item-cost">
                  <h6 className="item-price">${item.coursePrice}</h6>
                </div>
              </div>
              <h6 className="item-name">
                <Link className="text-body" to={`/mycma/product-detail/${item.slug}`}>
                  {item.name}
                </Link>
                <CardText tag="span" className="item-company">
                  By{' '}
                  <a className="company-name" href="/" onClick={(e) => e.preventDefault()}>
                    {item.brand}
                  </a>
                </CardText>
              </h6>
              <CardText className="item-description">{item.description}</CardText>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <FaChalkboardTeacher className="me-1" /> Course Name
                </span>
                <span>{item?.courseName}</span>
              </h6>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <VscTypeHierarchy className="me-1" /> Type
                </span>
                <span>{item?.courseType}</span>
              </h6>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <BsCalendar2Date className="me-1" /> Start Date
                </span>
                <span>{item?.startDate.slice(0,10)}</span>
              </h6>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <BsCalendar2Date className="me-1" /> End Date
                </span>
                <span>{item?.endDate.slice(0,10)}</span>
              </h6>
              {/* <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <FaGraduationCap className="me-1" /> Students Enrolled
                </span>
                <span>7837</span>
              </h6> */}
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <MdOutlineWatchLater className="me-1" /> Duration
                </span>
                <span>{item.courseDuration}Mins</span>
              </h6>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <GiNotebook className="me-1" /> Curriculum
                </span>
                <span>{item?.curriculamType}</span>
              </h6>
            </CardBody>
            {/* <div className="item-options text-center">
              <div className="item-wrapper">
                <div className="item-cost">
                  <h4 className="item-price">${item.price}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className="shipping">
                      <Badge color="light-success">Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                className="btn-wishlist"
                color="light"
                onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
              >
                <Heart
                  className={classnames('me-50', {
                    'text-danger': item.isInWishlist
                  })}
                  size={14}
                />
                <span>Favorite</span>
              </Button>

              <Button
                color="primary"
                tag={CartBtnTag}
                className="btn-cart move-cart"
                onClick={() => handleCartBtn(item.id, item.isInCart)}
              
                {...(item.isInCart && type === 'membership'
                  ? { to: '/ecommerce/checkout/membership' }
                  : { to: '/ecommerce/checkout/product' })}
          
              >
                <ShoppingCart className="me-50" size={14} />
                <span>
                  {type === 'membership'
                    ? item.isInCart
                      ? 'View In Cart'
                      : 'Buy Now'
                    : item.isInCart
                    ? 'View In Cart'
                    : 'Add To Cart'}
                </span>
              </Button>
            </div> */}
          </Card>
        );
      });
    }
  };

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  );
};

export default CourseCards;
