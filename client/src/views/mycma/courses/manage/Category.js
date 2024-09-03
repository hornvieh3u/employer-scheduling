// ** React Imports
import { Fragment, useState } from 'react';

// ** Components
import AddCategoryModal from './addCategoryModal';

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

const Category = () => {
  // ** States
  const [centeredModal, setCenteredModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    value: '',
    label: 'Filter By Category'
  });
  const categoryOptions = [
    { value: '', label: 'Filter By Category' },
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' }
  ];

  const tabledata = [
    {
      id: 'E84h4k4',
      category: 'Product',
      subCategory: 45,
      stock: 29
    },
    {
      id: 'E84h4k4',
      category: 'Product',
      subCategory: 45,
      stock: 29
    },
    {
      id: 'E84h4k4',
      category: 'Product',
      subCategory: 45,
      stock: 29
    },
    {
      id: 'E84h4k4',
      category: 'Product',
      subCategory: 45,
      stock: 29
    }
  ];

  const columnsdata = [
    {
      name: 'ID',
      sortable: true,
      // width: '130px',
      sortField: 'id',
      selector: (row) => row.id
    },
    {
      name: 'Category Name',
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
      name: 'Stock',
      sortable: true,
      // width: '130px',
      sortField: 'stock',
      selector: (row) => row.stock
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
                placeholder="Search by category type ..."
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
            <Col md="6" className="d-flex justify-content-end">
              <Button
                className="btn-icon"
                color="primary"
                onClick={() => setCenteredModal(!centeredModal)}
              >
                Add Category
              </Button>
              <AddCategoryModal centeredModal={centeredModal} setCenteredModal={setCenteredModal} />
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

export default Category;
