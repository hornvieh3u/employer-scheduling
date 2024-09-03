import React from 'react';
import DataTable from 'react-data-table-component';
import '@styles/react/apps/app-email.scss';
import { payrollHeader, payrollData } from './data';
import { ChevronDown } from 'react-feather';

function PayrollTable() {
  return (
    <div className="react-dataTable">
      <DataTable
        className="react-dataTable"
        noHeader
        pagination
        selectableRows
        columns={payrollHeader}
        paginationPerPage={7}
        sortIcon={<ChevronDown size={10} />}
        data={payrollData}
      />
    </div>
  );
}

export default PayrollTable;
