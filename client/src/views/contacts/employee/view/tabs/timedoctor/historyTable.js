import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { Button, Card, Input, Modal, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';

// Get screenshots
import { getScreenshots } from '../../../store/api';

export default function HistoryTable(props) {
  const { data } = props;

  // ** Sort total data
  function createData(historyId, name, calories, fat, carbs) {
    return { historyId, name, calories, fat, carbs };
  }

  // **Get total data
  const rows = data.map((item) => {
    const displayStartTime = format(new Date(item.startTime), 'Pp');
    const displayEndTime = format(new Date(item.endTime), 'Pp');
    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);

    return createData(
      item._id,
      item.description,
      displayStartTime,
      displayEndTime,
      formatDistance(startTime, endTime)
    );
  });

  // ** Inite page, row per page
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // **Function in get data per page
  const [item, setItem] = useState(0);
  const endItem = item + rowsPerPage;
  const sliceData = rows.slice(item, endItem);

  // ** Function in get data on page change
  const handlePagination = (page) => {
    const newItem = (page.selected * rowsPerPage) % rows.length;
    setCurrentPage(page.selected + 1);
    setItem(newItem);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(data.length / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={handlePagination}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };

  // ** Custom Table Header
  const CustomHeader = () => {
    return (
      <div className="w-100">
        <div className="d-flex justify-content-around">
          <div className="d-flex align-items-center">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
          <div className="d-flex align-items-center">
            <CustomPagination rowsPerPage={rowsPerPage} />
          </div>
        </div>
      </div>
    );
  };
  // **Table columns
  const columns = [
    {
      name: 'Project Name',
      width: '150px',
      center: true,
      selector: (row) => row.name,
      cell: (row) => <span>{row?.name}</span>
    },
    {
      name: 'Start Time',
      center: true,
      selector: (row) => row.calories,
      cell: (row) => <span>{row?.calories}</span>
    },
    {
      name: 'End Time',
      center: true,
      selector: (row) => row.fat,
      cell: (row) => <span>{row?.fat}</span>
    },
    {
      name: 'Duration',
      center: true,
      selector: (row) => row.carbs,
      cell: (row) => <span>{row?.carbs}</span>
    },
    {
      name: '',
      center: true,
      selector: (row) => row.historyId,
      cell: (row) => (
        <Button
          size="sm"
          color="info"
          onClick={() => {
            toggleDrawer(row?.historyId), function noRefCheck() {};
          }}
        >
          View Screenshot
        </Button>
      )
    }
  ];
  // ** screenshot Offcanvas
  const [openDrawer, setOpenDrawer] = useState(false);
  const [screenshots, setScreenshots] = useState([]);
  // Get screenshots
  const toggleDrawer = (_id) => {
    getScreenshots(_id).then((data) => {
      setScreenshots(data);
    }),
      [];
    setOpenDrawer(!openDrawer);
  };
  // ScreenImage Modal
  const [imageModal, setImageModal] = useState(false);
  const toggle = () => setImageModal(!imageModal);

  return (
    <>
      <DataTable
        subHeader
        responsive
        paginationServer
        columns={columns}
        className="react-dataTable"
        data={sliceData}
        subHeaderComponent={
          <CustomHeader rowsPerPage={rowsPerPage} handlePerPage={handlePerPage} />
        }
      />
      <Offcanvas isOpen={openDrawer} toggle={toggleDrawer}>
        <OffcanvasHeader toggle={toggleDrawer}>Screenshots</OffcanvasHeader>
        <OffcanvasBody className="d-flex w-100 flex-column align-items-center">
          {screenshots.length > 0 &&
            screenshots.map((screenshot) => {
              return (
                <Card className="m-1">
                  <img
                    src={screenshot.screenshot}
                    width={200}
                    height={150}
                    alt="screenshot"
                    onClick={toggle}
                  />
                  <p className="d-flex justify-content-center pt-1">
                    {format(new Date(screenshot.trackTime), 'Pp')}
                  </p>
                  <Modal isOpen={imageModal} toggle={toggle} centered size="lg">
                    <img src={screenshot.screenshot} alt="attachment" className="" />
                  </Modal>
                </Card>
              );
            })}
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}
