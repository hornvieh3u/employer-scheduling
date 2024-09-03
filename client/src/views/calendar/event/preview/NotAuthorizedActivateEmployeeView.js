// ** React Imports
import { Fragment, useEffect, useState, useContext } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import { toast, Slide } from 'react-toastify'
import { getEventInfo } from '../store';
import CardEvent from '../CardEvent';
import { Button } from 'reactstrap';
import { FaHandPointRight } from 'react-icons/fa';
import useAuth from '../../../../utility/hooks/useAuth'
import { getHomeRouteForLoggedInUser } from '@utils'
import { handleLogin } from '@store/authentication'
import { AbilityContext } from '@src/utility/context/Can'
import { useDispatch } from 'react-redux';

const NotAuthorizedActivateEmployeeView = () => {

  const history = useHistory();
  const ability = useContext(AbilityContext);
  const { employeeId } = useParams();

  const dispatch = useDispatch();
  const { ActivateRequest } = useAuth()

  const [isLoading, setIsLoading] = useState(false)


  const activateClickHandler = () => {

    setIsLoading(true)
    ActivateRequest({
      employeeId: employeeId
    })
      .then((res) => {
        setIsLoading(false)
        let newAbility = [{
          action: 'read',
          subject: 'base'
        }];


        Object.keys(res.userData.permission).map((item, index) => {
          if ((res.userData.permission)[item] == true) {
            if (item == "contacts") {
              newAbility.push(
                {
                  action: 'manage',
                  subject: 'contacts/client'
                }, {
                action: 'manage',
                subject: 'contacts/employee'
              }, {
                action: 'manage',
                subject: 'contacts/leads'
              }, {
                action: 'manage',
                subject: 'contacts/relationships'
              }, {
                action: 'manage',
                subject: 'contacts/vendor',
              })
            }
            if (item == "tasksAndGoals") {
              newAbility.push(
                {
                  action: 'manage',
                  subject: 'tasks/new-goals'
                }, {
                action: 'manage',
                subject: 'tasks/tasks'
              }, {
                action: 'manage',
                subject: 'tasks/goals'
              },
              )
            }
            if (item == "marketing") {
              newAbility.push(
                {
                  action: 'manage',
                  subject: 'marketing/automation'
                }, {
                action: 'manage',
                subject: 'marketing/email'
              }, {
                action: 'manage',
                subject: 'marketing/text'
              }, {
                action: 'manage',
                subject: 'marketing/chat'
              }, {
                action: 'manage',
                subject: 'marketing/ticket'
              }, {
                action: 'manage',
                subject: "marketing/socialConnect"
              },
                {
                  action: 'manage',
                  subject: "marketing/reputation"
                })
            }
            if (item == "business") {
              newAbility.push(
                {
                  action: 'manage',
                  subject: 'business/projectManager'
                }, {
                action: 'manage',
                subject: 'business/retention'
              }, {
                action: 'manage',
                subject: 'business/birthday'
              }, {
                action: 'manage',
                subject: 'business/expired'
              }, {
                action: 'manage',
                subject: 'business/statistics'
              }, {
                action: 'manage',
                subject: 'business/certifications'
              })
            }
            if (item == "finance") {
              newAbility.push(
                {
                  action: 'manage',
                  subject: 'finance/invoice'
                }, {
                action: 'manage',
                subject: 'finance/income'
              }, {
                action: 'manage',
                subject: 'finance/expense'
              }, {
                action: 'manage',
                subject: 'finance/profitnloss'
              })
            }
            if (item == "myCMA") {
              newAbility.push(
                {
                  action: 'manage',
                  subject: 'mycma/myaccount'
                }, {
                action: 'manage',
                subject: 'mycma/members'
              }, {
                action: 'manage',
                subject: 'business/birthday'
              }, {
                action: 'manage',
                subject: 'business/expired'
              }, {
                action: 'manage',
                subject: 'business/statistics'
              }, {
                action: 'manage',
                subject: 'business/certifications'
              })
            }
            newAbility.push({
              action: 'manage',
              subject: item
            })
          }
        });

        newAbility.push({
          action: 'manage',
          subject: 'contacts'
        }, { action: 'manage', subject: 'contacts/employeeInfo' });


        if (newAbility)
          ability.update(newAbility);

        const data = {
          ...res.userData,
          ability: newAbility,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        }

        dispatch(handleLogin(data));
        history.push(getHomeRouteForLoggedInUser(data.role));

        toast.success(
          <ToastContent
            name={data.fullName || data.username || 'John Doe'}
            // role={data.role || 'admin'}
            role={data.isEmployee ? 'employee' : 'admin'}
          />,
          {
            icon: false,
            transition: Slide,
            hideProgressBar: true,
            autoClose: 2000
          }
        )
      })
      .catch((err) => {
        setIsLoading(false)
        toast.error(err?.response?.data?.msg)
      })
  }
  return (
    <Fragment>
      <div className="d-flex  justify-content-around p-4 pb-2">
        <h1 className="font-large-3 fw-bolder text-uppercase">Activate Your Account</h1>
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <FaHandPointRight size={20} />
          <Button color="primary ms-1" onClick={activateClickHandler}>Click Here</Button>
        </div>
        <span className="mt-5 d-flex justify-content-center font-large-1">To activate to mymanager.com, just click button</span>
      </div>
    </Fragment>
  );
};

export default NotAuthorizedActivateEmployeeView;
