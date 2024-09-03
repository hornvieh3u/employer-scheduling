import React from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Search } from 'react-feather';
import { InputGroup, InputGroupText, Input } from 'reactstrap';
import { myFormData, data } from './data';

const FormList = () => {
  return (
    <div className="email-user-list">
      <div className="d-flex align-content-center justify-content-between w-100">
        <InputGroup className="input-group-merge">
          <InputGroupText>
            <Search className="text-muted" size={14} />
          </InputGroupText>
          <Input id="email-search" placeholder="Search email" />
        </InputGroup>
      </div>
      <DataTable
        noHeader
        pagination
        selectableRows
        columns={myFormData}
        paginationPerPage={7}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        data={data}
      />
    </div>
  );
};

export default FormList;
