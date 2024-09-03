// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import Select from 'react-select'
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Form,
    Card,
    Input,
    Label,
    Button,
    CardBody,
    CardTitle,
    CardHeader
} from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Demo Components
import DeleteAccount from './DeleteAccount'

// ** Custom styles
import '../../../../../assets/scss/style.scss'

const countryOptions = [
    { value: 'uk', label: 'UK' },
    { value: 'usa', label: 'USA' },
    { value: 'france', label: 'France' },
    { value: 'russia', label: 'Russia' },
    { value: 'canada', label: 'Canada' }
]

const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'dutch', label: 'Dutch' }
]

const currencyOptions = [
    { value: 'usd', label: 'USD' },
    { value: 'euro', label: 'Euro' },
    { value: 'pound', label: 'Pound' },
    { value: 'bitcoin', label: 'Bitcoin' }
]

const timeZoneOptions = [
    {
        value: '(GMT-12:00) International Date Line West',
        label: '(GMT-12:00) International Date Line West'
    },
    {
        value: '(GMT-11:00) Midway Island, Samoa',
        label: '(GMT-11:00) Midway Island, Samoa'
    },
    { value: '(GMT-10:00) Hawaii', label: '(GMT-10:00) Hawaii' },
    { value: '(GMT-09:00) Alaska', label: '(GMT-09:00) Alaska' },
    {
        value: '(GMT-08:00) Pacific Time (US & Canada)',
        label: '(GMT-08:00) Pacific Time (US & Canada)'
    },
    {
        value: '(GMT-08:00) Tijuana, Baja California',
        label: '(GMT-08:00) Tijuana, Baja California'
    },
    { value: '(GMT-07:00) Arizona', label: '(GMT-07:00) Arizona' },
    {
        value: '(GMT-07:00) Chihuahua, La Paz, Mazatlan',
        label: '(GMT-07:00) Chihuahua, La Paz, Mazatlan'
    },
    {
        value: '(GMT-07:00) Mountain Time (US & Canada)',
        label: '(GMT-07:00) Mountain Time (US & Canada)'
    },
    {
        value: '(GMT-06:00) Central America',
        label: '(GMT-06:00) Central America'
    },
    {
        value: '(GMT-06:00) Central Time (US & Canada)',
        label: '(GMT-06:00) Central Time (US & Canada)'
    },
    {
        value: '(GMT-06:00) Guadalajara, Mexico City, Monterrey',
        label: '(GMT-06:00) Guadalajara, Mexico City, Monterrey'
    },
    { value: '(GMT-06:00) Saskatchewan', label: '(GMT-06:00) Saskatchewan' },
    {
        value: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco',
        label: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco'
    },
    {
        value: '(GMT-05:00) Eastern Time (US & Canada)',
        label: '(GMT-05:00) Eastern Time (US & Canada)'
    },
    {
        value: '(GMT-05:00) Indiana (East)',
        label: '(GMT-05:00) Indiana (East)'
    },
    {
        value: '(GMT-04:00) Atlantic Time (Canada)',
        label: '(GMT-04:00) Atlantic Time (Canada)'
    },
    {
        value: '(GMT-04:00) Caracas, La Paz',
        label: '(GMT-04:00) Caracas, La Paz'
    },
    { value: '(GMT-04:00) Manaus', label: '(GMT-04:00) Manaus' },
    { value: '(GMT-04:00) Santiago', label: '(GMT-04:00) Santiago' },
    { value: '(GMT-03:30) Newfoundland', label: '(GMT-03:30) Newfoundland' }
]

const ClientInfo = ({ data }) => {
    // ** Hooks
    const defaultValues = {
        lastName: '',
        firstName: ''
    }
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    // ** States
    const [avatar, setAvatar] = useState('')

    const onChange = (e) => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setAvatar(reader.result)
        }
        reader.readAsDataURL(files[0])
    }

    const onSubmit = (data) => {
        if (Object.values(data).every((field) => field.length > 0)) {
            return null
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    const handleImgReset = () => {
        setAvatar(
            require('@src/assets/images/avatars/avatar-blank.png').default
        )
    }

    return (
        <Fragment>
            <Card>
                <CardHeader className="border-bottom">
                    <CardTitle tag="h4">Client Details</CardTitle>
                </CardHeader>
                <CardBody className="py-2 my-25">
                    <div className="d-flex">
                        <div className="me-25">
                            <img
                                className="rounded me-50"
                                src={
                                    require('@src/assets/images/avatars/avatar-blank.png')
                                        .default
                                }
                                alt="Client image"
                                height="100"
                                width="100"
                            />
                        </div>
                        <div className="d-flex align-items-end mt-75 ms-1">
                            <div>
                                <Button
                                    tag={Label}
                                    className="mb-75 me-75"
                                    size="sm"
                                    color="primary"
                                >
                                    Upload
                                    <Input
                                        type="file"
                                        onChange={onChange}
                                        hidden
                                        accept="image/*"
                                    />
                                </Button>
                                <Button
                                    className="mb-75"
                                    color="secondary"
                                    size="sm"
                                    outline
                                    onClick={handleImgReset}
                                >
                                    Reset
                                </Button>
                                <p className="mb-0">
                                    Allowed JPG, GIF or PNG. Max size of 800kB
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Row>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Full Name</span>
                                    <span>John Lennon</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Gender</span>
                                    <span>Male</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Phone</span>
                                    <span>937-572-0036</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Email</span>
                                    <span>test1234@gmail.com</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>DOB</span>
                                    <span>10/12/1992</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Type</span>
                                    <span>Individual</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Company</span>
                                    <span>Next Level Media</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Position</span>
                                    <span>Billing</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Street</span>
                                    <span>1318 Norma Avenue</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>City</span>
                                    <span>Dayton</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>State</span>
                                    <span>Ohio</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Zip Code</span>
                                    <span>45406</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Country</span>
                                    <span>USA</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Rating</span>
                                    <span>*****</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Note</span>
                                    <span>A simple note</span>
                                </div>
                            </Col>
                            <Col sm="6" className="mb-1">
                                <div className="client-info-set">
                                    <span>Status</span>
                                    <span>Active</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </Card>
            <DeleteAccount />
        </Fragment>
    )
}

export default ClientInfo
