// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser } from '@src/views/apps/user/store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, Eye } from 'react-feather'

// ** Reactstrap Imports
import { Badge, Button, ButtonGroup } from 'reactstrap'

import { FaUserCheck, FaUserTimes, FaUserClock } from 'react-icons/fa'

export const useColumns = ({ setAttendStatusArr, attendStatusArr }) => {

    const groupButtonClick = (e, row) => {
        let currentStatus = "";
        e.preventDefault();
        e.target.closest('.btn-group').childNodes.forEach((button, index) => {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
            }
        });
        e.target.closest('button').classList.add('active');
        if (e.target.closest('button').classList.contains('came')) {
            currentStatus = "came"
        } else if (e.target.closest('button').classList.contains('not')) {
            currentStatus = "not"
        } else {
            currentStatus = "coming"
        }
        let tmp = [], isFound = false;
        attendStatusArr.forEach((item, index) => {
            if (item.id != row._id) {
                tmp.push({ id: item.id, attendanceStatus: item.attendanceStatus })
            } else if (item.id == row._id) {
                item.attendanceStatus = currentStatus;
                isFound = true;
                tmp.push({
                    id: row._id, attendanceStatus: currentStatus
                })
            } else {
                console.log('else');
            }
        })
        if (!isFound) {
            tmp = [...tmp, { id: row._id, attendanceStatus: currentStatus }];
        }
        setAttendStatusArr(tmp);
    }
    const columns = [
        {
            name: 'Name',
            sortable: true,
            minWidth: '145px',
            sortField: 'name',
            selector: row => row.name,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <span className=''>{row.name}</span>
                    </div>
                </div>
            )
        },
        {
            name: 'Email',
            sortable: true,
            minWidth: '250px',
            sortField: 'currentPlan',
            selector: row => row.email,
            cell: row => <span className='text-capitalize'>{row.email}</span>
        },
        {
            name: 'Phone',
            sortable: true,
            minWidth: '172px',
            sortField: 'category',
            selector: row => row.category,
            cell: row => <span className=''>{row.phone}</span>
        },
        {
            name: 'Attendance',
            sortable: true,
            minWidth: '138px',
            sortField: 'status',
            selector: row => row.status,
            cell: row => (
                <ButtonGroup id={row._id}>
                    <Button outline color="primary came p-50" onClick={(e) => groupButtonClick(e, row)}
                    >
                        <FaUserCheck size={15} />
                    </Button>
                    <Button outline color="primary not p-50" onClick={(e) => groupButtonClick(e, row)}>
                        <FaUserTimes size={15} />
                    </Button>
                    <Button outline color="primary coming p-50" onClick={(e) => groupButtonClick(e, row)}>
                        <FaUserClock size={15} />
                    </Button>
                </ButtonGroup >
            )
        },
        {
            name: 'Actions',
            minWidth: '100px',
            cell: row => (
                <Button className="round" color="primary" outline>
                    Add To Leads
                </Button>
            )
        }
    ]
    return {
        columns
    }
}

export default useColumns
