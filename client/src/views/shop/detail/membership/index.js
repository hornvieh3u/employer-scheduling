// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
import ItemFeatures from './ItemFeatures'
import MembershipDetails from './MembershipDetails'
import RelatedMemberships from './RelatedMemberships'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getMembership, deleteMembershipWishlistItem, addMembershipToWishlistItem, addToCart, addMembershipToCart } from '../../store'

import '@styles/base/pages/app-ecommerce-details.scss'

const Details = () => {
  // ** Vars
  const params = useParams().membership
  const membershipId = params.substring(params.lastIndexOf('-') + 1);


  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.shop);

  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getMembership(membershipId))
  }, [])

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='Membership Details' breadCrumbParent='eCommerce' breadCrumbActive='Details' />
      <div className='app-ecommerce-details'>
        {Object.keys(store.membershipDetail).length ? (
          <Card>
            <CardBody>
              <MembershipDetails
                dispatch={dispatch}
                addToCart={addToCart}
                membershipId={membershipId}
                getMembership={getMembership}
                data={store.membershipDetail}
                addMembershipToWishlistItem={addMembershipToWishlistItem}
                addMembershipToCart={addMembershipToCart}
                deleteMembershipWishlistItem={deleteMembershipWishlistItem}
              />
            </CardBody>
            <ItemFeatures />
            <CardBody>
              <RelatedMemberships />
            </CardBody>
          </Card>
        ) : <></>}
      </div>
    </Fragment>
  )
}

export default Details
