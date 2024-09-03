// ** React Import
import { useEffect, useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { createBooking } from '../store'
import { useDispatch, useSelector } from 'react-redux'

const defaultValues = {
    name: '',
    email: '',
}

const checkIsValid = data => {
    //return false
    return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewBooking = ({ open, toggleSidebar, duration, startDate }) => {
    // ** States
    const [data, setData] = useState(null)


    // ** Store Vars
    const dispatch = useDispatch()


    // ** Vars
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    // ** Function to handle form submit
    const onSubmit = data => {
        setData(data)
        if (checkIsValid(data)) {
            toggleSidebar()
            dispatch(
                createBooking({
                    name: data.name,
                    email: data.email,
                    startDate: startDate,
                    duration: duration,
                })
            )
        } else {
            for (const key in data) {
                if (data[key] === null) {
                    setError(key, {
                        type: 'manual'
                    })
                }
                if (data[key] !== null && data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    const handleSidebarClosed = () => {
        for (const key in defaultValues) {
            setValue(key, '')
        }
    }

    return (
        <Sidebar
            size='lg'
            open={open}
            title='New Booking'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
            onClosed={handleSidebarClosed}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-1'>
                    <Label className='form-label' for='name'>
                        Name <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field }) => (
                            <Input id='name' placeholder='Booking Name' invalid={errors.name && true} {...field} />
                        )}
                    />
                </div>



                <div className='mb-1'>
                    <Label className='form-label' for='email'>
                        Email <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field }) => (
                            <Input id='email' type="email" placeholder='Email' invalid={errors.email && true} {...field} />
                        )}
                    />
                </div>

                <Button type='submit' className='me-1' color='primary'>
                    Schedule
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default SidebarNewBooking
