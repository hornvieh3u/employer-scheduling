import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Edit, Copy, Trash, Download, MoreVertical } from 'react-feather';
import { Link } from 'react-router-dom';
//**timeline component
import AvatarGroup from '@components/avatar-group';

function Card(props) {
  const avatarGroupArr = [
    {
      imgWidth: 25,
      imgHeight: 25,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
    },
    {
      imgWidth: 25,
      imgHeight: 25,
      title: 'Amy Carson',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default
    },
    {
      imgWidth: 25,
      imgHeight: 25,
      title: 'Brandon Miles',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default
    },
    {
      imgWidth: 25,
      imgHeight: 25,
      title: 'Daisy Weber',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default
    },
    {
      imgWidth: 25,
      imgHeight: 25,
      title: 'Jenny Looper',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default
    }
  ];
  const { title, subtitle1, des1, des2, togglemodal } = props;
  return (
    <div className="card-body">
      <div className="d-flex justify-content-between">
        <AvatarGroup data={avatarGroupArr} size="sm" />

        <div>
          <h3>{title}</h3>{' '}
        </div>

        {/* <img src="https://www.pinclipart.com/picdir/big/127-1271354_karate-black-belt-clipart.png" height="40" width="60"/> */}

        {/* <UncontrolledDropdown>
                        <DropdownToggle tag='span'>
                            <MoreVertical  size={17} className='cursor-pointer' />
                        </DropdownToggle>
                        <DropdownMenu end>
                        <DropdownItem tag={Link} to={`/`} className='w-100'>
                                <Edit size={14} className='me-50' />
                                <span className='align-middle'>Edit</span>
                            </DropdownItem>
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
                    </UncontrolledDropdown> */}
      </div>

      <div className="d-flex justify-content-between py-1">
        <div></div>
        <div>Total Users {des1}</div>
      </div>
      <div className="d-flex justify-content-between ">
        <div></div>
        <div>
          <h6 className="text-primary cursor-pointer" onClick={togglemodal}></h6>{' '}
        </div>
      </div>
    </div>
  );
}

export default Card;
