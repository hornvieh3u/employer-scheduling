import { Fragment } from 'react'
import { toast } from 'react-toastify'
const Message = () => {
    const ToastContent = ({ message }) => (
        <Fragment>
            <div className="toastify-header">
                <div className="title-wrapper">
                    <h6 className="toast-title fw-bold">{message}</h6>
                </div>
            </div>
        </Fragment>
    )

    function success(message) {
        toast.success(<ToastContent message={message} />)
    }

    function error(message) {
        toast.error(<ToastContent message={message} />)
    }
    return {
        success,
        error
    }
}

export default Message
