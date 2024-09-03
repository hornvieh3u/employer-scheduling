// ** React Imports
import { Fragment, forwardRef, useEffect, useState } from 'react';

// ** Third Party Components
import Select from 'react-select';

// ** Reactstrap Imports
import { Input, Table } from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import ReactPaginate from 'react-paginate';

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const columns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.fullName
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '280px',
    selector: (row) => row.email
  }
];

const SelectedContactsTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const onChange = () => {};

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(data.length / 7) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );
  return (
    <Fragment>
      <DataTable
        noHeader
        pagination
        columns={columns}
        paginationPerPage={7}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        paginationComponent={CustomPagination}
        data={data}
        onSelectedRowsChange={onChange}
      />
    </Fragment>
  );
};

export default SelectedContactsTable;
