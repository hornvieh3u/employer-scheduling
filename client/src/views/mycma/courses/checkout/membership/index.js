// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react';

// ** Custom Components
import Wizard from '@components/wizard';
import BreadCrumbs from '@components/breadcrumbs';

// ** Steps
import Cart from './steps/Cart';
import Contact from './steps/Contact';
import Payment from './steps/Payment';

// ** Third Party Components
import { ShoppingCart, CreditCard } from 'react-feather';
import { RiContactsBookLine } from 'react-icons/ri';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, deleteCartItem, deleteWishlistItem, addToWishlist } from '../../store';

// ** Styles
import '@styles/base/pages/app-ecommerce.scss';

const MembershipCheckout = () => {
  // ** Ref & State
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  // ** Get Cart Items on mount
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const steps = [
    {
      id: 'cart',
      title: 'Cart',
      subtitle: 'Your Cart Items',
      icon: <ShoppingCart size={18} />,
      content: (
        <Cart
          stepper={stepper}
          dispatch={dispatch}
          products={store.cart}
          getCartItems={getCartItems}
          addToWishlist={addToWishlist}
          deleteCartItem={deleteCartItem}
          deleteWishlistItem={deleteWishlistItem}
        />
      )
    },
    {
      id: 'Contact',
      title: 'Contact',
      subtitle: 'Enter Contact Details',
      icon: <RiContactsBookLine size={18} />,
      content: <Contact stepper={stepper} />
    },
    {
      id: 'payment',
      title: 'Payment',
      subtitle: 'Select Payment Method',
      icon: <CreditCard size={18} />,
      content: <Payment stepper={stepper} />
    }
  ];

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Checkout"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Membership Checkout"
      />

      <Wizard
        ref={ref}
        steps={steps}
        className="checkout-tab-steps"
        instance={(el) => setStepper(el)}
        options={{
          linear: false
        }}
      />
    </Fragment>
  );
};

export default MembershipCheckout;
