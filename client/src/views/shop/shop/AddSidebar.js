// ** React Imports


// ** Custom Hooks
import Sidebar from '@components/sidebar';
import { selectThemeColors } from '@utils';
import { useForm } from 'react-hook-form';
// ** Third Party Components
import Select from 'react-select';
import { useEffect } from 'react';
import wNumb from 'wnumb'
import classnames from 'classnames'
import { Star } from 'react-feather'
import Nouislider from 'nouislider-react'
import useMessage from '../../../lib/useMessage'

// ** Reactstrap Imports
import {
    Button,
    Label,
    Form,
    Input,
  } from 'reactstrap';

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'
import { useState } from 'react'
import Buttons from '../../components/buttons';
import {addMembership} from "../store"
const defaultValues = {
    name: '',
    price: 0,

};
const AddSidebar = (props) => {
    // ** Props
    const [state, setState] = useState({
        name:'',
        downprice:0,
        price:0,
        memtype:'Gold',
        paytype:'yearly',
        description:''
      });
    const {error, success}=useMessage();
    const { sidebarOpen, toggleHandler, type, setType, dispatch } = props;
    const payment_types=['yearly', 'monthly', 'daily'];

    const membership_types=['Gold', 'Silver', 'Copper'];

    const submitHandler=()=>{
        const {name, price, downprice, description, memtype, paytype}=state;
        if(name===''){
            error('membership name must not be empty!');
            return;
        }
        if(description===''){
          error('membership description must not be empty!');
          return;
        }
        if(price===0){
            error('price must not be empty!');
            return;
        }
        if(downprice===0){
            error('down payment must not be empty!');
            return;
        };
        const data={
            membership_name:name,
            membership_type:memtype,
            total_price:price,
            down_payment:downprice,
            payment_type:paytype,
            description:description
        };
        dispatch(addMembership(data));
        toggleHandler();
    }
    return (
        <Sidebar
            size="lg"
            open={sidebarOpen}
            title="New Membership"
            headerClassName="mb-1"
            contentClassName="pt-0"
            toggleSidebar={toggleHandler}
        >
        <Form>
          <div className="mb-1">
            <Label className="form-label" for="name">
              Name <span className="text-danger">*</span>
            </Label>
            <Input
                onChange={(e) => {
                    setState((p) => ({
                  ...p,
                  name: e?.target?.value
                }));
              }}
              id="name"
              placeholder="New Membership"
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="membership-type">
              Membership Type
            </Label>
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-9 p-0">
                  <Input
                    type="select"
                    id="membership-type"
                    name="membership-type"
                    onChange={(e) => {
                        setState((p) => ({
                          ...p,
                          memtype: e?.target?.value
                        }));
                      }}
                  >
                    {membership_types?.map((p, i) => {
                      return (
                        <option key={i} value={p}>
                          {p}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="payment-type">
              Payment Type
            </Label>
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-9 p-0">
                  <Input
                    type="select"
                    id="payment-type"
                    name="payment-type"
                    onChange={(e) => {
                        setState((p) => ({
                          ...p,
                          paytype: e?.target?.value
                        }));
                      }}
                  >
                    {payment_types?.map((p, i) => {
                      return (
                        <option key={i} value={p}>
                          {p}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="price">
              Price <span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="price"
              placeholder="$"
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  price: e?.target?.value
                }));
              }}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="down_payment">
              Down Payment <span className="text-danger">*</span>
            </Label>
            <Input
              type="number"
              id="down_payment"
              placeholder="$"
              onChange={(e) => {
                setState((p) => ({
                  ...p,
                  downprice: e?.target?.value
                }));
              }}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="name">
              Description <span className="text-danger">*</span>
            </Label>
            <Input
                onChange={(e) => {
                    setState((p) => ({
                  ...p,
                  description: e?.target?.value
                }));
              }}
              id="description"
              placeholder="New Membership"
            />
          </div>
          <div className='d-flex justify-content-between px-5 py-3'>
          <Button onClick={submitHandler} className="me-1" color="primary">
              {'Submit'}
          </Button>
          <Button type="reset" color="secondary" outline onClick={toggleHandler}>
               Cancel
          </Button>
          </div>
        </Form>
      </Sidebar>
    )
}

export default AddSidebar
