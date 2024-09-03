/* eslint-disable no-unused-vars */
import { Fragment, useState } from 'react';
import { Row, Col } from 'reactstrap';
import Breadcrumbs from '@components/breadcrumbs'
// custom import
import Sidebar from './components/Sidebar'
import '@styles/react/apps/app-email.scss'


const formBuilder = () => {
    // ** States
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <div className="overflow-hidden email-application">
            <div className="content-overlay"></div>
                <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn d-block">
                <Fragment>
                      <Breadcrumbs
                        breadCrumbTitle="Form Builder"
                        breadCrumbParent="Pages"
                        breadCrumbActive="Form Builder"
                      />
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
                </Fragment>
            </div>
        </div>
    )
    }
export default formBuilder;
