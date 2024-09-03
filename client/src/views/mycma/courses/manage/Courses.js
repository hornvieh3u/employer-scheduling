// ** React Imports
import { Fragment, useState } from 'react';

// ** Components
import AddCourseModal from './add/AddCourseModal';

// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { FileText, Trash2, Edit } from 'react-feather';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, CardBody } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const Courses = () => {
  // ** States
  const [centeredModal, setCenteredModal] = useState(false);

  const [currentCategory, setCurrentCategory] = useState({
    value: '',
    label: 'Filter By Category'
  });
  const [currentPrice, setCurrentPrice] = useState({
    value: '',
    label: 'Filter By Price',
    number: 0
  });

  const categoryOptions = [
    { value: '', label: 'Filter By Category' },
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' }
  ];

  const priceOptions = [
    { value: '', label: 'Filter By Price', number: 0 },
    { value: 'h2l', label: 'High to Low', number: 1 },
    { value: 'l2h', label: 'Low to Hign', number: 2 }
  ];

  const tabledata = [
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    },
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    },
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    },
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    },
    {
      sku: 'E84h4k4',
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      price: 234,
      stock: 29
    }
  ];

  const columnsdata = [
    {
      name: 'SKU',
      sortable: true,
      // width: '130px',
      sortField: 'position',
      selector: (row) => row.sku
    },
    {
      name: 'Course Name',
      sortable: true,
      // width: '130px',
      sortField: 'name',
      selector: (row) => row.name
    },
    {
      name: 'Category',
      sortable: true,
      // width: '130px',
      sortField: 'category',
      selector: (row) => row.category
    },
    {
      name: 'Sub-Category',
      sortable: true,
      // width: '130px',
      sortField: 'subCategory',
      selector: (row) => row.subCategory
    },
    {
      name: 'Price',
      sortable: true,
      // width: '130px',
      sortField: 'price',
      selector: (row) => row.price
    },
    {
      name: 'Published',
      sortable: true,
      // width: '130px',
      sortField: 'published',
      cell: (row) => (
        <div className="form-check form-switch">
          <Input type="switch" name="published" id="published" />
        </div>
      )
    },
    {
      name: 'Actions',
      // minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          <FileText size={20} className="me-1" />
          <Trash2 size={20} className="me-1" />
          <Edit size={20} />
        </div>
      )
    }
  ];

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Input
                id="search-invoice"
                // className="w-100"
                type="text"
                placeholder="Search Course ..."
              />
            </Col>
            <Col md="3">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={categoryOptions}
                value={currentCategory}
                onChange={(data) => {
                  setCurrentCategory(data);
                }}
              />
            </Col>
            <Col md="3">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={priceOptions}
                value={currentPrice}
                onChange={(data) => {
                  setCurrentPrice(data);
                }}
              />
            </Col>
            <Col md="3" className="d-flex justify-content-end">
              <Button
                className="btn-icon"
                color="primary"
                onClick={() => setCenteredModal(!centeredModal)}
              >
                Add Course
              </Button>
              <AddCourseModal centeredModal={centeredModal} setCenteredModal={setCenteredModal} />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <Col>
          <DataTable columns={columnsdata} data={tabledata} pagination />
        </Col>
      </Card>
    </Fragment>
  );
};

export default Courses;
