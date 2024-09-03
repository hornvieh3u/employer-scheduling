import { Check, X } from 'react-feather';
import { Fragment } from 'react';
// ** Custom Components
import Avatar from '@components/avatar';
import { toast } from 'react-toastify';
// ** Toast Component
const ToastComponent = ({ title, icon, color }) => (
  <Fragment>
    <div className="toastify-header pb-0">
      <div className="title-wrapper">
        <Avatar size="sm" color={color} icon={icon} />
        <h6 className="toast-title">{title}</h6>
      </div>
    </div>
  </Fragment>
);
export const success = (title) => {
  return toast.success(<ToastComponent title={title} color="success" icon={<Check />} />, {
    icon: false,
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false
  });
};

export const error = (title) => {
  return toast.error(<ToastComponent title={title} color="danger" icon={<X />} />, {
    icon: false,
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false
  });
};
