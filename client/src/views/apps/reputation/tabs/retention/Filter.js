import React from 'react'
import {
    Button,
    Grid,
    Row,
    Col,
    IconButton,
    Input,
    CardImg,
    Card,
    InputGroup,
    InputGroupText
  } from 'reactstrap';
  import { Star, ShoppingCart, Heart } from 'react-feather'
  import classnames   from 'classnames'

  import { FcSearch } from 'react-icons/fc';
// import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { BiCircle } from 'react-icons/bi';
function Filter() {
  return (
    <>
      <div className=" ml-2 mt-2">
                <h4 className=" ">Filters</h4>
              </div>
              <hr className="" />
              <div className="m-1">
                <label>
                  <b>Keyword Search</b>
                </label>
                <div
                  style={{ border: '1px solid #b8c2cc', borderRadius: '6px' }}
                  className="d-flex align-items-center pr-1"
                >
                  {/* <Input
                    style={{ padding: '6px' }}
                    variant="outlined"
                    className="w-100"
                    // onChange={handleChange}
                    type="text"
                    placeholder="search"
                  /> */}
                  {/* <FcSearch size={18} /> */}
                  <InputGroup>
                          <Input placeholder="search" />
                          <InputGroupText>
                          <FcSearch size={18} />
                          </InputGroupText>
                        </InputGroup>
                </div>
                <div className="mt-1">
                  <label>
                    <b>Location</b>
                  </label>
                  {/* <label>Status</label> */}
                  <Input
                    // onChange={handleStaus}
                    // defaultValue={statusValue}
                    type="select"
                    name="status"
                    className=""
                    id="status"
                  >
                    <option>All Location</option>
                    <option value={'Past Due'}>Past Due</option>
                    <option value={'Completed'}>Completed</option>
                    <option value={'Pending'}>Pending</option>
                    <option value={'Due'}>Due</option>
                    <option value={'no filter'}>no filter</option>
                  </Input>
                </div>
                <div className="mt-1">
                  <label>
                    <b>Date Range</b>
                  </label>
                  <Input
                    // onChange={handleStaus}
                    // defaultValue={statusValue}
                    type="select"
                    name="status"
                    className=""
                    id="status"
                  >
                    <option>All Dates</option>
                    <option value={'Past Due'}>Past Due</option>
                    <option value={'Completed'}>Completed</option>
                    <option value={'Pending'}>Pending</option>
                    <option value={'Due'}>Due</option>
                    <option value={'no filter'}>no filter</option>
                  </Input>
                </div>
                <div className="mt-1">
                  <label><b>Rating</b></label>
                  <Input
                    // onChange={handleStaus}
                    // defaultValue={statusValue}
                    type="select"
                    name="status"
                    className=""
                    id="status"
                  >
                    <option>All Rating</option>
                    <option value={'Past Due'}>Past Due</option>
                    <option value={'Completed'}>Completed</option>
                    <option value={'Pending'}>Pending</option>
                    <option value={'Due'}>Due</option>
                    <option value={'no filter'}>no filter</option>
                  </Input>
                </div>
                <div className="mt-1">
                  <label>
                    <b>Review Site</b>
                  </label>
                  <Input
                    // onChange={handleStaus}
                    // defaultValue={statusValue}
                    type="select"
                    name="status"
                    className=""
                    id="status"
                  >
                    <option>All Review Site</option>
                    <option value={'Past Due'}>Past Due</option>
                    <option value={'Completed'}>Completed</option>
                    <option value={'Pending'}>Pending</option>
                    <option value={'Due'}>Due</option>
                    <option value={'no filter'}>no filter</option>
                  </Input>
                </div>
                <div className="mt-2">
                  <p>
                    <b>Employee Tags</b>
                  </p>
                  <div className="d-flex">
                    <BiCircle style={{ color: 'blue' }} size = {20} />
                    <p className="ml-1"  style={{marginLeft : '4px'}}>All Reviews</p>
                  </div>
                  <div className="d-flex">
                    <BiCircle style={{ color: 'gray' }}   size = {20}/>
                    <p  className="ml-1 "  style={{marginLeft : '4px'}}>Untagged</p>

                  </div>
                </div>
              </div>

    
    
    </>
   
  )
}

export default Filter