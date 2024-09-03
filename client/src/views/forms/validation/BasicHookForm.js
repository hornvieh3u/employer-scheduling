// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { Check } from 'react-feather'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form } from 'reactstrap'

const BasicHookForm = () => {
  // ** Hooks
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      toast.success(
        <Fragment>
          <div className='toastify-header'>
            <div className='title-wrapper'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
              <h6 className='toast-title'>Form Submitted!</h6>
            </div>
          </div>
          <div className='toastify-body'>
            <ul className='list-unstyled mb-0'>
              <li>
                <strong>firstName</strong>: {data.firstNameBasic}
              </li>
              <li>
                <strong>lastName</strong>: {data.lastNameBasic}
              </li>
              <li>
                <strong>email</strong>: {data.emailBasic}
              </li>
            </ul>
          </div>
        </Fragment>,
        { icon: false, hideProgressBar: true }
      )
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

  const handleReset = () => {
    reset({
      emailBasic: '',
      firstNameBasic: '',
      lastNameBasic: ''
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Basic</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-1'>
            <Label className='form-label' for='firstNameBasic'>
              First Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='firstNameBasic'
              name='firstNameBasic'
              render={({ field }) => <Input placeholder='Bruce' invalid={errors.firstNameBasic && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='lastNameBasic'>
              Last Name
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='lastNameBasic'
              name='lastNameBasic'
              render={({ field }) => <Input placeholder='Wayne' invalid={errors.lastNameBasic && true} {...field} />}
            />
          </div>
          <div className='mb-1'>
            <Label className='form-label' for='emailBasic'>
              Email
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='emailBasic'
              name='emailBasic'
              render={({ field }) => (
                <Input
                  type='email'
                  placeholder='bruce.wayne@email.com'
                  invalid={errors.emailBasic && true}
                  {...field}
                />
              )}
            />
          </div>
          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              Submit
            </Button>
            <Button outline color='secondary' type='reset' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default BasicHookForm
