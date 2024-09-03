import React, { Fragment } from 'react'
import { Button, Input, Label } from 'reactstrap'

export default function StripeSettings() {
    const [amount,setAmount] = useState("5")
   const onAmountChanged = () => {

   }
    const getServerSideProps = async() => {
        await fetch(
           process.env.PUBLIC_BASE_URL + '/api/verifyStripe',
           {
              method: 'POST',
              body: JSON.stringify({
  
              }),
              headers: {
                 'Content-Type': 'application/json'
              }
           }
        )
     }
    const openWindow = () => {
        const url = `https://dashboard.stripe.com/oauth/authorize?
                     response_type=code&client_id=${process.env.OAUTH_CLIENT_ID}&
                    scope=read_write&redirect_uri=http://localhost:3001`
  
        window.open(url, "_blank", "height=500,width=500")
     }
  return (
    <Fragment>
        <Button color='primary' className='w-100' onClick={openWindow}>Connect</Button>
        <Label>Mode</Label>
        <Input type='select'>
            <option value="test">Test mode</option>
            <option value="live">Live mode</option>
        </Input>
        <Label>Currency</Label>
        <Input type='select'>
            <option value="usd">USD United States Dollars</option>
            <option value="eur">EUR European Union Currency</option>
        </Input>
        <Label>Type</Label>
        <Input type='select'>
            <option value="fixed">Fixed</option>
            <option value="variable">Variable</option>
        </Input>
        <Label>Amount</Label>
        <Input type='text' value={amount} onChange={onAmountChanged}/>
    </Fragment>
  )
}
