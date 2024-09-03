import React from 'react'
import {

    DropdownItem,
    DropdownMenu,
    DropdownToggle,

    UncontrolledDropdown
} from 'reactstrap'
import {

    Edit,
    Copy,

    Trash,

    Download,


    MoreVertical,

} from 'react-feather'
import { Link } from 'react-router-dom'

function Card(props) {
    const {title,subtitle1,des1,des2,togglemodal}=props
    return (
      
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <img src="https://www.pinclipart.com/picdir/big/127-1271354_karate-black-belt-clipart.png" height="40" width="60"/>
                    <h5 className="card-title">{title}</h5>
                    <UncontrolledDropdown>
                        <DropdownToggle tag='span'>
                            <MoreVertical  size={17} className='cursor-pointer' />
                        </DropdownToggle>
                        <DropdownMenu end>
                        {/* <DropdownItem tag={Link} to={`/`} className='w-100'>
                                <Edit size={14} className='me-50' />
                                <span className='align-middle'>Edit</span>
                            </DropdownItem> */}
                            <DropdownItem  className='w-100' onClick={togglemodal}>
                                <Edit size={14} className='me-50'  />
                                <span className='align-middle'>Edit</span>
                            </DropdownItem>
                            <DropdownItem
                            
                                className='w-100'
                                onClick={e => {
                                    e.preventDefault()

                                }}
                            >
                                <Trash size={14} className='me-50' />
                                <span className='align-middle'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                </div>
                <h6 className="card-subtitle mt-2 text-muted">{subtitle1}</h6>
                <div className="d-flex justify-content-between"><div> <p className="text-primary">Rank:</p></div><div>
                   {des1}</div></div>
                <div className="d-flex justify-content-between"><div> <p className="text-primary">Type:</p></div><div>
                {des2}</div></div>


            </div>
     
    )
}

export default Card