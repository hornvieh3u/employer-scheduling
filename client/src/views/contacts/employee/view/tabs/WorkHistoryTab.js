// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

// ** Charts
import ApexDonutChart from './timedoctor/timedoctorDonutChart';
import WeeklyMinutesCharts from './timedoctor/weekly_minutes_chart';

// ** Custom Components
import TimeDoctorPage from './timedoctor/timedoctor';
import Timetracker from './timedoctor/Timetracker';
import HistoryTable from './timedoctor/historyTable';
import { getWorkHistoryOverView, getWorkHistoryTimeLine } from '../../store/api';

const WorkHistoryTab = (props) => {
  const { id } = useParams();
  const [dailyOverview, setDailyOverview] = useState(0);
  const [weeklyOverview, setWeeklyOverview] = useState(0);
  const [monthlyOverview, setMonthlyOverview] = useState(0);
  const [workDayOverview, setWorkDayOverview] = useState(0);
  const [dailyStartTime, setDailyStartTime] = useState();
  const [dailyEndTime, setDailyEndTime] = useState();
  const [timeLineData, setTimeLineData] = useState([]);
  const [weeklyReport, setWeeklyReport] = useState([]);
  const [tableData, setTableData] = useState([]);
  // **Employee filter options
  const [project, setProject] = useState({
    value: 'general',
    label: 'General'
  });

  //** Sort by part (unknown filter)
  const partOptions = [
    { value: 'general', label: 'General' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'project', label: 'Project' }
  ];

  useEffect(() => {
    getWorkHistoryOverView(id).then((data) => {
      setDailyOverview(data.dailyTime);
      setWeeklyOverview(data.weeklyTime);
      setMonthlyOverview(data.monthlyTime);
      setWorkDayOverview(data.workDays);
      setDailyStartTime(data.dailyStartTime);
      setDailyEndTime(data.dailyEndTime);
      setWeeklyReport(data.weeklyReport);
    });
  }, []);

  useEffect(() => {
    getWorkHistoryTimeLine(id).then((data) => {
      const timeLine = data.map((item) => {
        const start = new Date(item.startTime);
        const end = new Date(item.endTime);
        return { start, end };
      });
      setTimeLineData(timeLine);
      setTableData(data);
    });
  }, []);

  const currentTime = new Date();
  const remainingTime = 24 * 60 - currentTime.getHours() * 60 - currentTime.getMinutes();
  const restTime = 24 * 60 - remainingTime - dailyOverview;

  return (
    <Fragment>
      <Card>
        <Row className="d-flex p-1 align-items-center justify-content-between">
          <Col xl="8">
            <Timetracker project={project} />
          </Col>
          <Col xl="4">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={partOptions}
              value={project}
              onChange={(data) => {
                setProject(data);
              }}
            />
          </Col>
        </Row>
      </Card>
      <Row>
        <Col lg="6" sm="6">
          <Card className="d-flex p-1">
            <span className="mb-1">Today</span>
            <div className="d-flex justify-content-between align-items-center">
              <h3>
                {Math.floor(dailyOverview / 60)} hrs {dailyOverview % 60} Mins
              </h3>
              <Button color="info">View Proof</Button>
            </div>
          </Card>
        </Col>
        <Col lg="6" sm="6">
          <Card className="d-flex p-1">
            <span className="mb-1">This Week</span>
            <div className="d-flex justify-content-between align-items-center">
              <h3>
                {Math.floor(weeklyOverview / 60)} hrs {weeklyOverview % 60} Mins
              </h3>
              <Button color="info">View Proof</Button>
            </div>
          </Card>
        </Col>
        <Col lg="6" sm="6">
          <Card className="d-flex p-1">
            <span className="mb-1">This Month</span>
            <div className="d-flex justify-content-between align-items-center">
              <h3>
                {Math.floor(monthlyOverview / 60)} hrs {monthlyOverview % 60} Mins
              </h3>
              <Button color="info">View Proof</Button>
            </div>
          </Card>
        </Col>
        <Col lg="6" sm="6">
          <Card className="d-flex p-1">
            <span className="mb-1">Total days worked</span>
            <div className="d-flex justify-content-between align-items-center">
              <h3>{workDayOverview} days</h3>
              <Button color="info">View Proof</Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Card className="p-1">
        <CardHeader>
          <CardTitle>
            <CardTitle tag="h4">Today</CardTitle>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <TimeDoctorPage
            dailyStartTime={dailyStartTime}
            dailyEndTime={dailyEndTime}
            timeLineData={timeLineData}
          />
        </CardBody>
      </Card>
      <Row>
        <Col lg="6" sm="6">
          <Card>
            <ApexDonutChart
              workTime={dailyOverview}
              remainingTime={remainingTime}
              restTime={restTime}
            />
          </Card>
        </Col>
        <Col lg="6" sm="6">
          <Card>
            <WeeklyMinutesCharts weeklyReport={weeklyReport} />
          </Card>
        </Col>
      </Row>
      <Card>
        <HistoryTable data={tableData} />
      </Card>
    </Fragment>
  );
};

export default WorkHistoryTab;
