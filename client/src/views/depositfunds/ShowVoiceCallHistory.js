import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import Select from 'react-select';
import { GetCallHistory, GetBalanceInfo } from './store';

import { selectThemeColors } from '@utils';
import DataTable from 'react-data-table-component';
import { ArrowDown } from 'react-feather';


function VoiceCallHistory() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);
  let { callHistory, balanceInfo } = useSelector((state) => state.deposit);

  useEffect(() => {
    dispatch(GetCallHistory(userData?.id));
    const init = async () => {
      dispatch(GetBalanceInfo(userData?.id));
    };
    init();
  }, []);

  //credits table data
  const [data, setData] = useState([
    { dollar: '$5', credit: '300 minutes' },
    { dollar: '$10', credit: '700 minutes' },
    { dollar: '$15', credit: '1200 minutes' }
  ])

  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select'
  });
  // handel loading
  const [loader, setLoader] = useState(false);
  // get balance info

  const planOptions = [
    { value: '', label: 'Select' },
    { value: '5', label: '300' },
    { value: '10', label: '700' },
    { value: '15', label: '1200' }
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
            minutes: +currentPlan?.value == 5 ? 300 : +currentPlan?.value == 10 ? 700 : 1200,
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

  const historycolumns = [
    {
      name: 'Date',
      selector: (row) => row.Date,
      sortable: false,
      cell: (params) => {
        return (
          <>
            <span>{moment(params?.date).format('MM/DD/YYYY')}</span>
          </>
        );
      }
    },
    {
      selector: (row) => row.num,
      name: 'Number',
      sortable: true
    },

    {
      selector: (row) => row.duration + ' sec',
      name: 'Duration',
      sortable: true
    },
    {
      selector: (row) => row.recording_url,
      name: 'Recording',
      sortable: true,
      cell: (params) => {
        return (
          <>
            <div className="text">
              <audio controls>
                <source src={params?.recording_url} type="audio/mpeg" />
              </audio>
            </div>
          </>
        );
      }
    }
  ];
  return (
    <div>
      {callHistory.length > 0 ? (
        <DataTable
          responsive={true}
          columns={historycolumns}
          data={callHistory || []}
          noHeader
          defaultSortDirection={'asc'}
          defaultSortField="firstName"
          defaultSortAsc={true}
          pagination
          sortIcon={<ArrowDown style={{ color: '#bababa' }} />}
          highlightOnHover
          customStyles={customStyles}
        />
      ) : (
        <Card>
          <CardHeader className='border-bottom'>
            <CardTitle>
              Voice
            </CardTitle>
          </CardHeader>
          <Row>
            <Col md="6" className='d-flex flex-column justify-content-center border-end'>
              <div className='d-flex flex-column text-center pt-2'>
                <h3>How many minutes would you like to purchase?</h3>
                <p className='py-1'>Calculate your minutes cost</p>
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
                <p className='m-0'>minutes</p>
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
      )}
    </div>
  );
}
export default memo(VoiceCallHistory);
