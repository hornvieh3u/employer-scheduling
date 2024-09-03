// ** React Imports
import { useState, useEffect } from 'react';

// ** Table Columns
import { storeColumns } from './storeColumns';

// ** Third Party Components
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import Flatpickr from 'react-flatpickr';

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Label,
  Input
} from 'reactstrap';

// ** Store & Actions
import { getData } from '@src/views/apps/invoice/store';
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const OtherTab = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.invoice);

  // ** States
  const [centeredModal, setCenteredModal] = useState(false);
  const [value] = useState('');
  const [rowsPerPage] = useState(6);
  const [currentPage] = useState(1);
  const [statusValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');
  const [picker, setPicker] = useState(new Date());

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue
      })
    );
  }, [dispatch, store.data.length]);

  const dataToRender = () => {
    const filters = {
      status: statusValue,
      q: value
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data.slice(0, rowsPerPage);
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    );
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4" className="d-flex justify-content-center align-items-center">
            Store Info{' '}
            <div className="ms-1 table-rating">
              <span style={{ fontSize: 13 }}>12</span>
            </div>
          </CardTitle>
          <div className="d-flex">
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <Input
                id="search-invoice"
                className="ms-50 w-100"
                type="text"
                placeholder="Search Store ..."
                // value={searchTerm}
                // onChange={(e) => handleFilter(e.target.value)}
              />
            </div>
            <Button color="primary" onClick={() => setCenteredModal(!centeredModal)}>
              Add New Store
            </Button>
            <Modal
              isOpen={centeredModal}
              toggle={() => setCenteredModal(!centeredModal)}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
                Add New Store
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      Address
                    </Label>
                    <Input type="text" id="input-default" placeholder="Type full address" />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      Phone
                    </Label>
                    <Input type="text" id="input-default" placeholder="330-806-1981" />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="inputFile">
                      Lease Start Date
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={picker}
                      onChange={(date) => setPicker(date)}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="inputFile">
                      Lease End Date
                    </Label>
                    <Flatpickr
                      className="form-control"
                      value={picker}
                      onChange={(date) => setPicker(date)}
                      id="default-picker"
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="inputFile">
                      Upload Lease Document
                    </Label>
                    <Input type="file" id="inputFile" name="fileInput" />
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => setCenteredModal(!centeredModal)}>
                  Upload
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </CardHeader>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            sortServer
            columns={storeColumns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
          />
        </div>
      </Card>
    </div>
  );
};

export default OtherTab;
