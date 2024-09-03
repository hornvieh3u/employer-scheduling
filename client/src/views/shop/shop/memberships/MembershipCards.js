// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart, UserPlus } from 'react-feather'
import { useNavigate } from "react-router-dom";
import logo from '../../../../assets/images/elements/iphone-x.png'
// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

const MembershipCards = (props) => {
    // ** Props
    const {
        store,
        type,
        dispatch,
        activeView,
        getMembership, 
        addMembershipToWishlist,
        deleteMembershipWishlist
    } = props
    // ** Handle Move/Add to cart
    const buyMembership = (id) => {
        dispatch(getMembership(id));
    }

    // ** Handle Wishlist item toggle
    const handleWishlistClick = (item) => {
        console.log
        if(item.isfavorite===0){
            dispatch(addMembershipToWishlist({id: item._id}));
        }
        else{
            dispatch(deleteMembershipWishlist({id: item._id}));
        }
    }

    // ** Renders products
    const renderProducts = () => {
        if (store.memberships && store.memberships.length) {
            return store.memberships.map((item) => {
                const CartBtnTag = item.isInCart ? Link : 'button';
                return (
                    <Card className="ecommerce-card" key={item.name}>        
                        <div className="item-img text-center mx-auto">
                            <Link to={`/ecommerce/membership-detail/${item._id}`}>
                                <img src={logo} alt={'membership'}/>
                            </Link>
                        </div>
                        <CardBody>
                            <div className='item-wrapper'>
                                <div className='item-rating'>
                                    <h6>{'Price:'}</h6>
                                </div>
                                <div className='item-cost'>
                                     <h6 className="item-price">
                                        ${item.total_price}
                                    </h6>
                                </div>
                            </div>
                            <div className='item-wrapper'>
                                <div className='item-rating'>
                                    <h6>{'Type:'}</h6>
                                </div>
                                <div className='item-cost'>
                                     <h6 className="item-price">
                                        ${item.payment_type}
                                    </h6>
                                </div>
                            </div>
                            <h6 className="item-name">
                                <Link to={`/ecommerce/membership-detail/${item._id}`}>
                                    {item.membership_name}
                                </Link>
                            </h6>
                            <CardText className="item-description">
                                {item.description}
                            </CardText>
                        </CardBody>
                        <div className="item-options text-center">
                            <div className="item-wrapper">
                                <div className="item-cost">
                                    <h4 className="item-price">
                                        ${item.price}
                                    </h4>
                                    {item.hasFreeShipping ? (
                                        <CardText className="shipping">
                                            <Badge color="light-success">
                                                Free Shipping
                                            </Badge>
                                        </CardText>
                                    ) : null}
                                </div>
                            </div>
                           
                            <Button
                                className="btn-wishlist"
                                color="light"
                                onClick={() =>
                                    handleWishlistClick(
                                        item
                                    )
                                }
                            >
                                <Heart
                                    className={classnames('me-50', {
                                        'text-danger': item.isfavorite?true:false
                                    })}
                                    size={14}
                                />
                                <span>Favorite</span>
                            </Button>
                            <Link to={`/ecommerce/checkout/membership/${item._id}`}>
                            <Button
                                color="primary"
                                tag={CartBtnTag}
                                className="btn-cart move-cart"
                                onClick={() =>
                                    buyMembership(item._id)
                                }
                                /*eslint-disable */
                                {...{ to: '/ecommerce/checkout/membership' }
                                    }
                                /*eslint-enable */
                            >
                                <ShoppingCart className="me-50" size={14} />
                                <span>
                                    {'Buy Now'}
                                </span>
                            </Button>
                            </Link>
  
                        </div>
                    </Card>
                )
            })
        }
    }
    return (
        <div
            className={classnames({
                'grid-view': activeView === 'grid',
                'list-view': activeView === 'list'
            })}
        >
            {renderProducts()}
        </div>
    )
}

export default MembershipCards
