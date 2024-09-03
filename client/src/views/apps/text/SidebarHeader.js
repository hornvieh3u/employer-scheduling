// ** React Imports
import { useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch } from 'react-redux'

// ** Utils

// ** Third Party Components
import { Search } from 'react-feather'
import { filterTextContacts, getTextContacts } from './store';

// ** Reactstrap Imports
import { InputGroup, InputGroupText, Input } from 'reactstrap'

const SidebarHeader = props => {
    // ** Props & Store
    const { userData, contacts, setLoading, handleFilter, query } = props

    const userAvatar = (userData && userData?.avatar) || null;

    const [shortName, setShortName] = useState('');

    useEffect(() => {
        if (userData) {
            if (userData?.fullName) {
                const nameOrArr = String(userData?.fullName).split(' ');
                const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
                const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
                setShortName(
                    `${firstPart[0].toUpperCase()} ${lastPart[0] ? lastPart[0].toUpperCase() : ''}`
                );
            }
        } //
        return () => { };
    }, [userData]);

    // ** Dispatch
    const dispatch = useDispatch()

    // ** Handles Filter
    // let HandleSearch = async (e) => {
    //     let { value } = e.target;

    //     await setLoading(true);

    //     if (value?.length > 2) {
    //         let filterData =
    //             contacts?.length > 0 &&
    //             contacts?.flatMap((el) => {
    //                 let { fullName } = el;

    //                 if (fullName.toLowerCase().startsWith(value.toLowerCase())) {
    //                     return el;
    //                 }
    //             });

    //         let latestInfo =
    //             filterData?.length > 0 &&
    //             filterData?.filter(function (element) {
    //                 return element !== undefined;
    //             });

    //         dispatch(filterTextContacts(latestInfo));
    //     } else if (value?.length === 0) {
    //         dispatch(getTextContacts());
    //     }
    //     if (value === '') {
    //         // await getDataBack()
    //     }
    //     await setLoading(false);
    // };

    return userData ? (
        <div className='chat-fixed-search'>
            <div className='d-flex align-items-center w-100'>
                <div className='sidebar-profile-toggle'>
                    {userAvatar ? (
                        <Avatar className='avatar-border' img={userAvatar} imgHeight="42" imgWidth="42" status={status} />
                    ) : (
                        <>
                            <Avatar
                                className='avatar-border'
                                color="primary"
                                imgHeight="42"
                                imgWidth="42"
                                // status={userData.status}
                                status = 'online'
                                content={shortName || 'N/A'}
                            />
                        </>
                    )}
                </div>
                <InputGroup className="input-group-merge ms-1 w-100">
                    <InputGroupText  className='round'>
                        <Search className="text-muted" size={14} />
                    </InputGroupText>
                    <Input
                        placeholder="Search contact"
                        className='round'
                        value={query}
                        onChange={handleFilter}
                    />
                </InputGroup>
            </div>
        </div>
    ) : null
}

export default SidebarHeader
