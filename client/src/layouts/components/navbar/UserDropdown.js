// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import {
    User,
    Mail,
    CheckSquare,
    MessageSquare,
    Settings,
    CreditCard,
    HelpCircle,
    Power
} from 'react-feather'

// ** Reactstrap Imports
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem
} from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
    // ** Store Vars
    const dispatch = useDispatch()

    // ** State
    // const [userData, setUserData] = useState(null)
    const { userData } = useSelector((state) => state.auth)

    //** ComponentDidMount
    // useEffect(() => {
    //   if (isUserLoggedIn() !== null) {
    //     setUserData(JSON.parse(localStorage.getItem('userData')))
    //   }
    // }, [])

    // console.log(userData)

    //** Vars
    const userAvatar = (userData && userData?.avatar) || null

    const [shortName, setShortName] = useState('')

    useEffect(() => {
        if (userData) {
            if (userData?.fullName) {
                const nameOrArr = String(userData?.fullName).split(' ')
                const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : ''
                const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : ''
                setShortName(
                    `${firstPart[0].toUpperCase()} ${
                        lastPart[0] ? lastPart[0].toUpperCase() : ''
                    }`
                )
            }
        } //
        return () => {}
    }, [userData])

    return (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle
                href="/"
                tag="a"
                className="nav-link dropdown-user-link"
                onClick={(e) => e.preventDefault()}
            >
                <div className="user-nav d-sm-flex d-none">
                    <span className="user-name fw-bold">
                        {userData && userData?.fullName}
                    </span>
                    <span className="user-status">
                        {userData?.userType === 'employee'
                            ? ''
                            : (userData && userData.role) || 'Admin'}
                    </span>
                </div>
                {userAvatar ? (
                    <Avatar
                        img={userAvatar}
                        imgHeight="40"
                        imgWidth="40"
                        status="online"
                    />
                ) : (
                    <>
                        <Avatar
                            // img={userAvatar}
                            color="primary"
                            imgHeight="40"
                            imgWidth="40"
                            status="online"
                            content={shortName || 'N/A'}
                        />
                    </>
                )}
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem tag={Link} to="/pages/account-settings">
                    <User size={14} className="me-75" />
                    <span className="align-middle">Profile</span>
                </DropdownItem>
                <DropdownItem tag={Link} to="/apps/email">
                    <Mail size={14} className="me-75" />
                    <span className="align-middle">Inbox</span>
                </DropdownItem>
                <DropdownItem tag={Link} to="/apps/todo">
                    <CheckSquare size={14} className="me-75" />
                    <span className="align-middle">Tasks</span>
                </DropdownItem>
                <DropdownItem tag={Link} to="/apps/chat">
                    <MessageSquare size={14} className="me-75" />
                    <span className="align-middle">Chats</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/pages/pricing">
                    <CreditCard size={14} className="me-75" />
                    <span className="align-middle">Pricing</span>
                </DropdownItem>
                <DropdownItem tag={Link} to="/pages/faq">
                    <HelpCircle size={14} className="me-75" />
                    <span className="align-middle">FAQ</span>
                </DropdownItem>
                <DropdownItem
                    tag={Link}
                    to="/login"
                    onClick={() => dispatch(handleLogout())}
                >
                    <Power size={14} className="me-75" />
                    <span className="align-middle">Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown
