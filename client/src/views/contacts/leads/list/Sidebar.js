// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// Actions
import { addContactAction } from '../store/actions'

import useMessage from '../../../../lib/useMessage'
import AddPositionModal from './AddPositionModal'
import { useGetLeadPosition } from '../../../../requests/contacts/lead-contacts'
import { toast } from 'react-toastify'
import { selectContactLead } from '../store/reducer'

const defaultValues = {
    email: '',
    contact: '',
    company: '',
    fullName: '',
    username: '',
    country: null,
    stage: null
}

const stageOptions = [
    { label: 'cold', value: 'cold' },
    { label: 'warm', value: 'warm' },
    { label: 'hot', value: 'hot' }
]

const countryOptions = [
    { label: 'Australia', value: 'Australia' },
    { label: 'Bangladesh', value: 'Bangladesh' },
    { label: 'Belarus', value: 'Belarus' },
    { label: 'Brazil', value: 'Brazil' },
    { label: 'Canada', value: 'Canada' },
    { label: 'China', value: 'China' },
    { label: 'France', value: 'France' },
    { label: 'Germany', value: 'Germany' },
    { label: 'India', value: 'India' },
    { label: 'Indonesia', value: 'Indonesia' },
    { label: 'Israel', value: 'Israel' },
    { label: 'Italy', value: 'Italy' },
    { label: 'Japan', value: 'Japan' },
    { label: 'Korea', value: 'Korea' },
    { label: 'Mexico', value: 'Mexico' },
    { label: 'Philippines', value: 'Philippines' },
    { label: 'Russia', value: 'Russia' },
    { label: 'South', value: 'South' },
    { label: 'Thailand', value: 'Thailand' },
    { label: 'Turkey', value: 'Turkey' },
    { label: 'Ukraine', value: 'Ukraine' },
    { label: 'United Arab Emirates', value: 'United Arab Emirates' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'United States', value: 'United States' }
]

const SidebarNewUsers = ({ open, toggleSidebar, setCurrentPage, setSidebarOpen, tableData, leadRefetch }) => {
    // ** States
    const { selectContact } = useSelector( state => state.leadContact)
    
    const [data] = useState(null)
    const [plan, setPlan] = useState('basic')
    const [role, setRole] = useState('subscriber')

    // get lead position data from db
    const { data: positions, refetch } = useGetLeadPosition()

    // default positions
    const newPositions = [
        { position: "Owner" },
        { position: "Assistant" },
        { position: "Billing" }
    ]

    // merge default positions and severe positions
    positions?.map((p) => {
        newPositions.push(p)
    })

    // default positions
    const positionOptions = [
        { value: '', label: 'Select...' },
        { value: 'Owner', label: "Owner" },
        { value: 'Assistant', label: "Assistant" },
        { value: 'Billing', label: "Billing" },
    ]

    // merge default position options and backend positions
    positions?.map((p) => {
        const value = p.position
        const label = p.position
        const roles = { value, label }
        positionOptions.push(roles)
    })

    // add lead position modal state
    const [modal, setModal] = useState(false)

    // add lead position modal toggler
    const toggle = () => setModal(!modal)

    const { error, success } = useMessage()

    // ** Store Vars
    const dispatch = useDispatch()

    // ** Vars
    const {
        control,
        setValue,
        setError,
        formState: { errors }
    } = useForm({ defaultValues })

    const handleSidebarClosed = () => {
        for (const key in defaultValues) {
            setValue(key, '')
        }
        setRole('subscriber')
        setPlan('basic')
    }

    // ===============
    const {
        addLead: { loading: AddLoading }
    } = useSelector((state) => state.leadContact)

 

    const [state, setState] = useState({
        fullName: selectContact.selected===null?'': selectContact.selected.fullName,
        email: selectContact.selected===null?'': selectContact.selected.email,
        phone: selectContact.selected===null?'': selectContact.selected.phone,
        type: selectContact.selected===null?'individual': selectContact.selected.type,
        company: selectContact.selected===null?'': selectContact.selected.company,
        position: selectContact.selected===null?'': selectContact.selected.position,
        country: selectContact.selected===null?'': selectContact.selected.country,
        stage: selectContact.selected===null?'': selectContact.selected.stage
    })

    function handleSubmit() {
        const { fullName } = state
        if (fullName === '') {
            error('Full Name must not be empty !')
            return
        }

        // Email and Phone Validation

        const isEmailExist = tableData?.find((p) => p?.email === state?.email || p?.email.toLowerCase() === state?.email.toLowerCase() || /^(?=.*[A-Z])/.test(state.email))

        if (state?.phone?.startsWith("-")) {
            return toast.error("Please Provide a valid phone Number")
        }

        // if (/^(?=.*[A-Z])/.test(state?.phone) || /^(?=.*[a-z])/.test(state?.phone) || /^(?=.*[!@#$&*~`"'?()])/.test(state?.phone)) {
        //     return toast.error("RegEx Please Provide a valid phone Number")
        // }

        const isPhoneExist = tableData?.find((p) => p?.phone === state?.phone)

        if (isEmailExist) {
            return toast.error("Please Provide a valid email")
        }

        else if (isPhoneExist) {
            return toast.error("Please Provide a valid phone Number")
        }

        else {
            setCurrentPage(1)
            dispatch(addContactAction(state))

            // refetch data
            leadRefetch()
        }
    }

    return (
        <Sidebar
            size="lg"
            open={open}
            title="New Lead"
            headerClassName="mb-1"
            contentClassName="pt-0"
            toggleSidebar={toggleSidebar}
            onClosed={handleSidebarClosed}
        >
            <Form>
                <div className="mb-1">
                    <Label className="form-label" for="fullName">
                        Full Name <span className="text-danger">*</span>
                    </Label>

                    <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={state.fullName}
                        onChange={(e) => {
                            setState((p) => ({
                                ...p,
                                fullName: e?.target?.value
                            }))
                        }}
                    />
                </div>

                <div className="mb-1">
                    <Label className="form-label" for="userEmail">
                        Email <span className="text-danger">*</span>
                    </Label>

                    <Input
                        type="email"
                        id="userEmail"
                        placeholder="john.doe@example.com"
                        value={state.email}
                        onChange={(e) => {
                            setState((p) => ({
                                ...p,
                                email: e?.target?.value
                            }))
                        }}
                    />

                    <FormText color="muted">
                        You can use letters, numbers & periods
                    </FormText>
                </div>

                <div className="mb-1">
                    <Label className="form-label" for="contact">
                        Contact <span className="text-danger">*</span>
                    </Label>

                    <Input
                        type='number'
                        id="contact"
                        placeholder="(397) 294-5153"
                        value={state.phone}
                        onChange={(e) => {
                            setState((p) => ({
                                ...p,
                                phone: e?.target?.value
                            }))
                        }}
                    />
                </div>

                <div
                    className="mb-1"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                >
                    <Label className="form-label" for="select-plan">
                        Select Lead Type
                    </Label>

                    <Input
                        value={state.type}
                        onChange={(e) => {
                            setState((p) => ({
                                ...p,
                                type: e?.target?.value
                            }))
                        }}
                        type="select"
                        id="select-plan"
                        name="select-plan"
                    >
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                    </Input>
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="company">
                        Company <span className="text-danger">*</span>
                    </Label>

                    <Input
                        id="company"
                        value={state.company}
                        placeholder="Company Pvt Ltd"
                        onChange={(e) => {
                            setState((p) => ({
                                ...p,
                                company: e?.target?.value
                            }))
                        }}
                    />
                </div>

                <div className="mb-1">
                    <Label className="form-label" for="user-role">
                        Position
                    </Label>

                    <div className='d-flex justify-content-between gap-2'>
                        <Select
                            className='flex-fill'
                            isClearable={false}
                            // defaultValue={positionOptions.find(option => { return option.value===state.position })}
                            classNamePrefix="select"
                            options={positionOptions}
                            theme={selectThemeColors}
                            onChange={(e) => {
                                setState((p) => ({
                                    ...p,
                                    position: e.value
                                }))
                            }}
                        />
                        <Button onClick={toggle}>Add</Button>
                    </div>
                </div>

                <div className="mb-1">
                    <Label className="form-label" for="country">
                        Country <span className="text-danger">*</span>
                    </Label>

                    <Select
                        isClearable={false}
                        classNamePrefix="select"
                        options={countryOptions}
                        theme={selectThemeColors}
                        className={classnames('react-select', {
                            'is-invalid': data !== null && data.country === null
                        })}
                        onChange={(e) => {
                            setState((p) => ({
                                ...p,
                                country: e.value
                            }))
                        }}
                    />
                </div>
                <div className="mb-1">
                    <Label className="form-label" for="country">
                        State <span className="text-danger">*</span>
                    </Label>

                    <Select
                        isClearable={false}
                        classNamePrefix="select"
                        options={stageOptions}
                        theme={selectThemeColors}
                        className={classnames('react-select', {
                            'is-invalid': data !== null && data.stage === null
                        })}
                        onChange={(e) => {
                            setState((p) => ({
                                ...p,
                                stage: e.value
                            }))
                        }}
                    />
                </div>

                <Button
                    type="button"
                    onClick={handleSubmit}
                    className="me-1"
                    color="primary"
                    disabled={AddLoading}
                >
                    {AddLoading ? 'Adding...' : 'Submit'}
                </Button>

                <Button
                    type="reset"
                    color="secondary"
                    outline
                    onClick={toggleSidebar}
                >
                    Cancel
                </Button>

            </Form>

            <AddPositionModal
                modal={modal}
                toggle={toggle}
                positions={positions}
                newPositions={newPositions}
                refetch={refetch}
            ></AddPositionModal>
        </Sidebar>
    )
}

export default SidebarNewUsers
