// ** React Imports
import { useState } from 'react';

// ** Table columns & Expandable Data
import ExpandableTable, { data, columns } from './Data';

// ** Third Party Components
import ReactPaginate from 'react-paginate';
import { ChevronDown, Download } from 'react-feather';
import DataTable from 'react-data-table-component';
import SignDocumment from './docSign/component/ModalView';

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

const Progression = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  // ** Function to handle filter
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={10}
      breakLabel={'...'}
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
      containerClassName={
        'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'
      }
    />
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Onboarding Tasks</CardTitle>
        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          Add Task
        </Button>
      </CardHeader>
      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          data={data}
          expandableRows
          columns={columns}
          expandOnRowClicked
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          expandableRowsComponent={ExpandableTable}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>

      <Modal
        fullscreen="lg"
        size="lg"
        centered="true"
        scrollable="false"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Create Employee Task</ModalHeader>
        <ModalBody style={{ padding: 0 }}>
          <SignDocumment />
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default Progression;
