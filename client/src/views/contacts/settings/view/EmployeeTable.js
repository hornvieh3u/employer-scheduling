import React from 'react';
import DataTable from 'react-data-table-component';
import '@styles/react/apps/app-email.scss';
import { myFormData } from '../../../myforms/data';
import { ChevronDown } from 'react-feather';

const carddata = [
  {
    title: 'Role Type 1',
    date: '01/01/23',
    time: '03:09',
    totalrank: '12',
    type: 'By Stripe',
    rank: '21'
  },
  {
    title: 'Role Type 2',
    date: '01/01/23',
    time: '03:09',
    totalrank: '12',
    type: 'By Stripe',
    rank: '21'
  },
  {
    title: 'Role Type 3',
    date: '01/01/23',
    time: '03:09',
    totalrank: '12',
    type: 'By Stripe',
    rank: '21'
  }
];

function EmployeeTable() {
  return (
    <div className="react-dataTable">
      <DataTable
        className="react-dataTable"
        noHeader
        pagination
        selectableRows
        columns={myFormData}
        paginationPerPage={7}
        sortIcon={<ChevronDown size={10} />}
        data={carddata}
      />
    </div>
  );
}

export default EmployeeTable;
