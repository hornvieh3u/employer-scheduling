// ** React Imports
import { Fragment, forwardRef } from 'react'

// ** Third Party Components
import Select from 'react-select'

// ** Reactstrap Imports
import { Input, Table } from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className="form-check">
        <Input type="checkbox" ref={ref} {...props} />
    </div>
))

const roleOptions = [
    { value: 'sign', label: 'Sign' },
    { value: 'download', label: 'Download' },
    { value: 'read', label: 'Read' }
]

const onChange = () => {}

const RecipientsTable = () => {
    return (
        <Fragment>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                        <th>Date / Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span className="align-middle fw-bold">
                                Angular Project
                            </span>
                        </td>
                        <td>mdnahid071@gmail.com</td>

                        <td>Signed</td>
                        <td>12/12/2022 at 07:40:34 PM</td>
                    </tr>
                    <tr>
                        <td>
                            <span className="align-middle fw-bold">
                                React Project
                            </span>
                        </td>
                        <td>mdnahid071@gmail.com</td>

                        <td>Got A Copy</td>
                        <td>12/12/2022 at 07:40:34 PM</td>
                    </tr>
                    <tr>
                        <td>
                            <span className="align-middle fw-bold">
                                Vuejs Project
                            </span>
                        </td>
                        <td>mdnahid071@gmail.com</td>

                        <td>Proof Reading</td>
                        <td>12/12/2022 at 07:40:34 PM</td>
                    </tr>
                    <tr>
                        <td>
                            <span className="align-middle fw-bold">
                                Bootstrap Project
                            </span>
                        </td>
                        <td>Jmdnahid071@gmail.com</td>

                        <td>Signed</td>
                        <td>12/12/2022 at 07:40:34 PM</td>
                    </tr>
                </tbody>
            </Table>
        </Fragment>
    )
}

export default RecipientsTable
