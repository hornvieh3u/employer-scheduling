import { Fragment } from 'react'
import { toast } from 'react-toastify'
import { Check, XCircle } from 'react-feather'
import Avatar from '@components/avatar'
const useMessage = () => {
    const ToastComponent = ({ title, icon, color }) => (
        <Fragment>
            <div className="toastify-header pb-0">
                <div className="title-wrapper">
                    <Avatar size="sm" color={color} icon={icon} />
                    <h6 className="toast-title">{title}</h6>
                </div>
            </div>
        </Fragment>
    )

    function success(message) {
        toast.success(
            <ToastComponent title={message} color="success" icon={<Check />} />,
            {
                icon: false,
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: false
            }
        )
    }

    function error(message) {
        toast.error(
            <ToastComponent title={message} color="error" icon={<XCircle />} />,
            {
                icon: false,
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: false
            }
        )
    }

    return {
        error,
        success
    }
}

export default useMessage
