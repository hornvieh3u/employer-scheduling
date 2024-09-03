import React, { useState } from 'react';
import { Card } from 'reactstrap';
import DataTable from 'react-data-table-component';
import SampleData from '../SampleData';

const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

const columns = [
  {
    name: 'Source',
    selector: (row) => row.name,
    style: {
      backgroundColor: '#7367f0',
      color: 'white'
    },
    width: '150px',
    center: true
  },
  ...months.map((month) => ({
    name: month.slice(0, 3),
    selector: (row) => row[month.toLowerCase()],
    width: '70px',
    center: true,
    compact: true
  }))
];

function DataTables(props) {
  const [yearNum, setYearNum] = useState(years[0]);
  const [studentTypes, setStudentTypes] = useState('All');

  const handleYear = (e) => {
    setYearNum(e.target.value);
  };
  const handleEventType = (e) => {
    setStudentTypes(e.target.value);
  };

  const totalMonthlyCounts = new Array(13).fill(0);
  const leadsMonthlyCounts =
    props.getLeadData?.data?.reduce((prev, elem) => {
      if (!prev[elem.lead]) {
        prev[elem.lead] = [];
      }
      prev[elem.lead].push(elem);
      return prev;
    }, {}) || {};

  return (
    <>
      <Card className="p-1" style={{ borderRadius: '0px' }}>
        <DataTable title="Lead Statistics" columns={columns} data={SampleData} />
      </Card>
    </>
  );
}

export default DataTables;
