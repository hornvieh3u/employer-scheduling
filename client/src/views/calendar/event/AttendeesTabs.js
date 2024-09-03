// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Components
import GuestTable from './guests/GuestTable'
import Attendance from './attendance'

// ** Icons Imports
import { CheckCircle, CheckSquare } from 'react-feather'

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'

const AttendeesTabs = (props) => {
    // ** State
    const [active, setActive] = useState('1')

    const toggle = (tab) => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    const [attendArray, setAttendArray] = useState([]);

    useEffect(() => {
        let tmp = [];
        props.data && props.data.map((item, index) => {
            if (item.status == "yes") {
                tmp = [...tmp, { ...item, fullName: item.name }];
            } else {
                return;
            }
        });
        setAttendArray(tmp);
    }, [props.data])
    return (
        <Fragment>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        active={active === '1'}
                        onClick={() => {
                            toggle('1')
                        }}
                    >
                        <CheckCircle size={14} />
                        <span className="align-middle">Invited</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '2'}
                        onClick={() => {
                            toggle('2')
                        }}
                    >
                        <CheckSquare size={14} />
                        <span className="align-middle">Attendance</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className="py-50" activeTab={active}>
                <TabPane tabId="1">
                    <GuestTable data={props.data} />
                </TabPane>
                <TabPane tabId="2">
                    <Attendance data={attendArray} />
                </TabPane>
            </TabContent>
        </Fragment>
    )
}
export default AttendeesTabs
