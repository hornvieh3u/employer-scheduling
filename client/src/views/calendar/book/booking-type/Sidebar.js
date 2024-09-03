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
import { createBookingType, updateBookingType } from '../store'
import { useDispatch } from 'react-redux'



const durationOptions = [
    { label: '5 Minutes meeting', value: 5 },
    { label: '10 Minutes meeting', value: 10 },
    { label: '15 Minutes meeting', value: 15 },
    { label: '20 Minutes meeting', value: 20 },
    { label: '30 Minutes meeting', value: 30 },
    { label: '45 Minutes meeting', value: 45 },
    { label: '1 Hours meeting', value: 60 },
    { label: '1 Hours 30 minutes meeting', value: 90 },
    { label: '2 Hours meeting', value: 120 },
]
const checkIsValid = data => {
    return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewBookingType = ({ type, open, toggleSidebar }) => {
    // ** States
    const [data, setData] = useState(null)
    const [defaultValues, setDefaultValues] = useState({

            title: '' ,
            description: '',
            duration: null,
        }

    )

    const getSelectDuration = (value) => {
        for(var i = 0; i < durationOptions.length; i ++) {
            if(durationOptions[i].value == value) {
                return durationOptions[i]
            }
        }
        return null
    }
    // ** Store Vars
    const dispatch = useDispatch()


    // ** Vars
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues, type })

    useEffect(() => {
        setValue('title', type? type.title: '')
        setValue('description', type? type.description: '')
        setValue('duration', type? getSelectDuration(type.duration): null)
        // setValue({
        //     title: type? type.title: '' ,
        //     description: type? type.description: '',
        //     duration: type? getSelectDuration(type.duration): null,
        // })
    }, [type])
    // ** Function to handle form submit
    const onSubmit = data => {
        setData(data)
        if (checkIsValid(data)) {
            toggleSidebar()
            if(!type) {
                dispatch(
                    createBookingType({

                        title: data.title,
                        description: data.description,
                        duration: data.duration.value,
                    })
                )
            } else {
                let copyType = JSON.parse(JSON.stringify(type))
                copyType.title = data.title
                copyType.description = data.description
                copyType.duration = data.duration.value
                copyType._id = undefined
                dispatch(updateBookingType({
                    id: type._id,
                    data: copyType
                }))
            }
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
            title='New Booking Type'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
            onClosed={handleSidebarClosed}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-1'>
                    <Label className='form-label' for='title'>
                        Title <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='title'
                        control={control}
                        render={({ field }) => (
                            <Input id='title' placeholder='Booking Type Title' invalid={errors.title && true} {...field} />
                        )}
                    />
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='description'>
                        Description <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => (
                            <Input id='description' type='textarea' placeholder='Booking Type Description' invalid={errors.description && true} {...field} />
                        )}
                    />
                </div>


                <div className='mb-1'>
                    <Label className='form-label' for='duration'>
                        Meeting Duration
                    </Label>
                    <Controller
                        name='duration'
                        control={control}
                        render={({ field }) => (
                            <Select
                                isClearable={false}
                                classNamePrefix='select'
                                options={durationOptions}
                                theme={selectThemeColors}
                                className={classnames('react-select', { 'is-invalid': data !== null && data.duration === null })}
                                {...field}
                            />
                        )}
                    />
                </div>

                <Button type='submit' className='me-1' color='primary'>
                    Submit
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default SidebarNewBookingType
