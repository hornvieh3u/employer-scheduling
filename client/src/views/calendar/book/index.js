// ** React Imports
import { Fragment, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Input, Button, Label, NavLink } from 'reactstrap'
import BreadCrumbs from '@components/breadcrumbs'
import Table from './list/bookTable'
const BookingManagement = () => {

    // ** Store vars




    return (
        <Fragment>
            <BreadCrumbs
                breadCrumbTitle="Booking Types"
                breadCrumbParent="Calendar"
                breadCrumbActive="All Booking Types"
            />
            <Table/>

        </Fragment>
    )
}
export default BookingManagement
