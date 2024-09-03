// ** React Imports
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardHeader,
    Button
} from 'reactstrap'

const GuestTracker = (props) => {
    // ** State
    const [data, setData] = useState(null)
    const eventId = useParams()

    const [coming, setComing] = useState(0);
    const [no, setNo] = useState(0);
    const [maybe, setMaybe] = useState(0);
    const [noReply, setNoReply] = useState(0);
    //const [completedSeats, setCompletedSeats] = useState(0);
    const guests = props.data.guests ? props.data.guests : [];

    useEffect(() => {
        let tmpComing = 0, tmpNo = 0, tmpMaybe = 0, tmpNoReply = 0;
        guests.forEach((item, index) => {
            if (item.status == "yes") { tmpComing++; }
            else if (item.status == "no") { tmpNo++; }
            else if (item.status == "maybe") { tmpMaybe++; }
            else { tmpNoReply++; }
        })
        setComing(tmpComing);
        setMaybe(tmpMaybe);
        setNoReply(tmpNoReply);
        setNo(tmpNo);
    }, [props])

    const completedSeats = useMemo(() => (coming / guests.length).toFixed(2) * 100, [coming, guests]);

    useEffect(() => {
        axios
            .get('/card/card-analytics/support-tracker')
            .then((res) => setData(res.data))
        return () => setData(null)
    }, [])
    const options = {
        plotOptions: {
            radialBar: {
                size: 150,
                offsetY: 20,
                startAngle: -150,
                endAngle: 150,
                hollow: {
                    size: '65%'
                },
                track: {
                    background: '#fff',
                    strokeWidth: '100%'
                },
                dataLabels: {
                    name: {
                        offsetY: -5,
                        fontFamily: 'Montserrat',
                        fontSize: '1rem'
                    },
                    value: {
                        offsetY: 15,
                        fontFamily: 'Montserrat',
                        fontSize: '1.714rem'
                    }
                }
            }
        },
        colors: [props.danger],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: [props.primary],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            dashArray: 8
        },
        labels: ['Completed Seats']
    },
        series = [completedSeats ? completedSeats : 0]

    return props.data._id != undefined ? (
        <Card>
            <CardHeader className="pb-0">
                <CardTitle tag="h4">Guest Tracker</CardTitle>
                <Link to={`/add-guest/${eventId.eventId}`}>
                    <Button color="primary">Add Guests</Button>
                </Link>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col
                        sm="2"
                        className="d-flex flex-column flex-wrap text-center"
                    >
                        <h1 className="font-large-2 fw-bolder mt-2 mb-0">
                            {props.data.guests.length}
                        </h1>
                        <CardText>Invited</CardText>
                    </Col>
                    <Col sm="10" className="d-flex justify-content-center">
                        <Chart
                            options={options}
                            series={series}
                            type="radialBar"
                            height={270}
                            id="support-tracker-card"
                        />
                    </Col>
                </Row>
                <div className="d-flex justify-content-between mt-1">
                    <div className="text-center">
                        <CardText className="mb-50">Coming</CardText>
                        <span className="font-large-1 fw-bold">
                            {coming}
                        </span>
                    </div>
                    <div className="text-center">
                        <CardText className="mb-50">Next Time</CardText>
                        <span className="font-large-1 fw-bold">
                            {maybe}
                        </span>
                    </div>
                    <div className="text-center">
                        <CardText className="mb-50">No Reply</CardText>
                        <span className="font-large-1 fw-bold">
                            {noReply}
                        </span>
                    </div>
                </div>
            </CardBody>
        </Card>
    ) : null
}
export default GuestTracker
