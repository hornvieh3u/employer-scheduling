import React, { memo, useEffect, useState } from 'react';
import { Input, Label, Button, Card, CardText, CardTitle, CardBody, Row, Col, CardHeader } from 'reactstrap';

// ** Custom Components
import { MessageSquare } from 'react-feather';
import Select from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils';
import { useSelector, useDispatch } from 'react-redux';
import { GetBalanceInfo } from './store';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
const API = customInterIceptors();

function Sms() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);
  let { balanceInfo } = useSelector((state) => state.deposit);

  //credits table data
  const [data, setData] = useState([
    { dollar: '$5', credit: '300 credits' },
    { dollar: '$10', credit: '700 credits' },
    { dollar: '$15', credit: '1500 credits' }
  ])

  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select'
  });
  // handel loading
  const [loader, setLoader] = useState(false);
  // get balance info

  useEffect(() => {
    const init = async () => {
      dispatch(GetBalanceInfo(userData?.id));
    };
    init();
  }, []);
  const planOptions = [
    { value: '', label: 'Select' },
    { value: '5', label: '300' },
    { value: '10', label: '700' },
    { value: '15', label: '1500' }
  ];
  const handleEventType = (data) => { };
  const SmsBuyCreditsBtn = async () => {
    try {
      if (!currentPlan.value) {
        toast.error('Please select funds for Buy Sms credits ');
      } else if (!balanceInfo?.data?.wallet > 0) {
        toast.error('No Enough Balance in  Wallet ');
      } else if (+balanceInfo?.data?.wallet <= +currentPlan?.value) {
        toast.error('Please Deposit Funds First');
      } else {
        const DepositAmount = async () => {
          let newData = {
            wallet: +currentPlan?.value,
            cretits: +currentPlan?.value == 5 ? 300 : +currentPlan?.value == 10 ? 700 : 1500,
            user_id: userData?.id
          };

          return await API.post(`/deposit/withdrawAmount`, newData);
        };
        Promise.all([DepositAmount()])
          .then(function (results) {
            const data = results[0];
            toast.success('Transaction Successfully');

            setLoader(false);
            dispatch(GetBalanceInfo(userData?.id));
            // window.location.reload()
          })
          .catch((e) => {
            setLoader(false);

            toast.error('Something Went Wrong');
          });
      }
    } catch (e) { }
  };
  return (
    <Card>
      <CardHeader className='border-bottom'>
        <CardTitle>
          SMS
        </CardTitle>
      </CardHeader>
      <Row>
        <Col md="6" className='d-flex flex-column justify-content-center border-end'>
          <div className='d-flex flex-column text-center pt-2'>
            <h3>How many credits would you like to purchase?</h3>
            <p className='py-1'>Calculate your credit cost</p>
          </div>
          <div className="deposit-input gap-2 d-flex justify-content-center align-items-center">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={planOptions}
              value={currentPlan}
              onChange={(data) => {
                setCurrentPlan(data), handleEventType(data);
              }}
            />
            <p className='m-0'>credits</p>
          </div>
          <div className="deposit-amount py-1">
            <h1>$ {currentPlan.value ? currentPlan.value : 0}</h1>
            <p>one time</p>
          </div>
          <div className='text-center pb-3'>
            {loader ? (
              <Button color="success" className="add-todo-item me-1">
                Loading
              </Button>
            ) : (
              <Button color="warning" className="add-todo-item me-1" onClick={() => SmsBuyCreditsBtn()}>
                Buy Credits
              </Button>
            )}
          </div>
        </Col>
        <Col md="6">
          <div>
            <DataTable
              columns={[
                {
                  name: 'Dollar',
                  selector: 'dollar',
                },
                {
                  name: 'Credit',
                  selector: 'credit',
                }
              ]}
              data={data}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
}
export default memo(Sms);
