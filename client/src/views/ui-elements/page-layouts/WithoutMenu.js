// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Alert } from 'reactstrap'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import Ecommerce from '../../dashboard/ecommerce'

const WithoutMenu = () => {
    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbParent="Layouts"
                breadCrumbTitle="Layout without menu"
                breadCrumbActive="Layout without menu"
            />
            <Alert color="primary">
                <div className="alert-body">
                    <span className="fw-bold">Info: </span>
                    <span>
                        Please check the{' '}
                        <a
                            href="https://pixinvent.com/demo/MyManager-react-admin-dashboard-template/documentation/docs/development/page-layouts"
                            target="_blank"
                        >
                            Layout without menu documentation
                        </a>{' '}
                        for more details.
                    </span>
                </div>
            </Alert>
            <Ecommerce />
        </Fragment>
    )
}

export default WithoutMenu
