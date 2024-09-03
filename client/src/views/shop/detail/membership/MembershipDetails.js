// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import {
    Star,
    ShoppingCart,
    DollarSign,
    Heart,
    Share2,
    Facebook,
    Twitter,
    Youtube,
    Instagram,
    UserPlus
} from 'react-feather'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Button,
    CardText,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledButtonDropdown
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../../assets/images/elements/iphone-x.png'
const Membership = (props) => {
    // ** Props
    const {
        data,
        deleteMembershipWishlistItem,
        deleteWishlistItem,
        dispatch,
        addMembershipToWishlistItem,
        membershipId,
        addMembershipToCart
    } = props

    // ** State
    const [selectedColor, setSelectedColor] = useState('primary')

    // ** Renders color options
    const renderColorOptions = () => {
        return data.colorOptions.map((color, index) => {
            const isLastColor = data.colorOptions.length - 1 === index
            return (
                <li
                    key={color}
                    className={classnames('d-inline-block', {
                        'me-25': !isLastColor,
                        selected: selectedColor === color
                    })}
                    onClick={() => setSelectedColor(color)}
                >
                    <div className={`color-option b-${color}`}>
                        <div className={`filloption bg-${color}`}></div>
                    </div>
                </li>
            )
        })
    }

    // ** Handle Wishlist item toggle
    const isInCart=(id)=>{
        const store= useSelector(state => state.shop);
        const membership_list=store.cart.membership_list;
        let status=false;
        membership_list.forEach((item, index)=>{
            if(item._id===id){
                status=true;
            }
        });
        return status;
    }

    const handleWishlist = (item) => {
        if(item.isfavorite===0){
            dispatch(addMembershipToWishlistItem({id: item._id}));
        }
        else{
            dispatch(deleteMembershipWishlistItem({id: item._id}));
        }
    }

    // ** Handle Move/Add to cart
    const handleCartBtn = (id) => {
        dispatch(addMembershipToCart(id));
    }

    // ** Condition btn tag

    return (
        <Row className="my-2">
            <Col
                className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
                md="5"
                xs="12"
            >
                <div className="d-flex align-items-center justify-content-center">
                    <img src={logo}/>               
                </div>
            </Col>
            <Col md="7" xs="12">
                <h4>{data.membership_name}</h4>
                <CardText>
                    Type:
                    <span className="text-primary ms-25">{data.payment_type}</span>
                </CardText>
                <CardText>
                    Price:
                    <span className="text-primary ms-25">${data.total_price}</span>
                </CardText>
                <CardText>
                    Available -
                    <span className="text-success ms-25">In stock</span>
                </CardText>
                <CardText>{data.description}</CardText>
                <ul className="product-features list-unstyled">
                    {data.hasFreeShipping ? (
                        <li>
                            <ShoppingCart size={19} />
                            <span>Free Shipping</span>
                        </li>
                    ) : null}
                    <li>
                        <DollarSign size={19} />
                        <span>EMI options available</span>
                    </li>
                </ul>
                <hr />

                <div className="d-flex flex-column flex-sm-row pt-1">
                    <Link to={`/ecommerce/checkout/membership/${data._id}`}>
                        {
                            !isInCart(data._id)?(
                                <Button
                                tag={'button'}
                                className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
                                color="primary">
                                <ShoppingCart className="me-50" size={14} />
                                {'Buy'}
                        </Button>
                            ):<></>
                        }

                    </Link>
                    <Link to={isInCart(data._id)?`/ecommerce/checkout/membership`:`/ecommerce/membership-detail/${data._id}`}>
                        <Button
                            tag={'button'}
                            className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
                            color="primary"
                            onClick={() => handleCartBtn(data._id)}
                            /*eslint-disable */
                            {...(isInCart(data._id)
                                ? {
                                    to: '/ecommerce/checkout'
                                }
                                : {})}
                            /*eslint-enable */
                        >
                            <ShoppingCart className="me-50" size={14} />
                            {isInCart(data._id)?'View in cart':'Move to cart'}
                        </Button>
                    </Link>
                    <Button
                        className="btn-wishlist me-0 me-sm-1 mb-1 mb-sm-0"
                        color="secondary"
                        outline
                        onClick={() => handleWishlist(data)}
                    >
                        <Heart
                            size={14}
                            className={classnames('me-50', {
                                'text-danger': data.isfavorite?true:false
                            })}
                        />
                        <span>Wishlist</span>
                    </Button>
                    <UncontrolledButtonDropdown className="dropdown-icon-wrapper btn-share">
                        <DropdownToggle
                            className="btn-icon hide-arrow"
                            color="secondary"
                            caret
                            outline
                        >
                            <Share2 size={14} />
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem
                                tag="a"
                                href="/"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Facebook size={14} />
                            </DropdownItem>
                            <DropdownItem
                                tag="a"
                                href="/"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Twitter size={14} />
                            </DropdownItem>
                            <DropdownItem
                                tag="a"
                                href="/"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Youtube size={14} />
                            </DropdownItem>
                            <DropdownItem
                                tag="a"
                                href="/"
                                onClick={(e) => e.preventDefault()}
                            >
                                <Instagram size={14} />
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </div>
            </Col>
        </Row>
    )
}

export default Membership
