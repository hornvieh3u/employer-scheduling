/*    eslint-disable */

// ** React Imports
import React, { useEffect, useState } from 'react';

//** Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { getProjectsData } from '../store/reducer';
// ** Icons Imports
import { Plus } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap';

// ** Third Party Components
import ReactPaginate from 'react-paginate';

// ** Styles
import '@styles/base/pages/page-projects.scss';

// ** Component Imports
import GroupTable from './GroupTable';
import ProjectModal from '../modal/Modal';
import NoProjectLayout from '../noprojectlayout/noprojectlayout';

//** API
import { createNewTable, addRow } from '../../../../requests/projects/project';

const ProjectTable = () => {
  const [modal, setModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [tables, setTables] = useState({});

  const [itemOffset, setItemOffset] = useState(0);

  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userData);
  const projectData = useSelector((state) => state.projectManagement.getProjects);

  const [updatedProjectsData, setUpdatedProjectsData] = useState(projectData);

  const endOffset = itemOffset + 5;

  const pageCount = Math.ceil(projectData?.length / 5);

  useEffect(() => {
    if (projectData && projectData.length > 0) {
      setUpdatedProjectsData(projectData.slice(itemOffset, endOffset));

    }

  }, [projectData, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % projectData.length;
    setItemOffset(newOffset);
  };

  const handleAddRow = (tableID) => {
    let payload = { tableID: tableID, userID: currentUser.id };
    addRow(payload).then((response) => {
      dispatch(getProjectsData(response?.data?.UpdatedTables));
    });
  };

  const handleTableToggle = (index) => {
    setTables({ ...tables, [index]: !tables[index] });
  };

  const saveGroup = (e) => {
    e.preventDefault();

    if (newGroupName) {
      toggle();
      let payload = {
        userID: currentUser.id,
        title: newGroupName
      };
      createNewTable(payload).then((response) => {
        dispatch(getProjectsData(response.data.data));
        setNewGroupName('');
      });
    }
  };

  return (
    <div>
      <Row>
        <Col sm="12" className="px-1 pb-2 d-flex justify-content-between">
          <Button color="primary" size="md" className="btn-add-new" onClick={toggle}>
            <Plus size={14} className="me-25"></Plus>{' '}
            <span className="align-middle">New Group</span>
          </Button>
        </Col>
      </Row>
      <ProjectModal
        title="Create New Group"
        toggle={toggle}
        modal={modal}
        label="Group Name"
        labelFor="groupName"
        fieldName="groupName"
        fieldId="groupName"
        saveButtonText="Save"
        saveButtonColor="primary"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        onClick={saveGroup}
        addBody={true}
      />

      {projectData.length > 0 ?
        <>
          {updatedProjectsData?.map((table, index) => (
            <GroupTable
              key={table._id}
              index={index}
              projectData={table}
              itemOffset={itemOffset}
              isOpen={!tables[index] || false}
              onToggle={handleTableToggle}
              rotateIcon={!tables[index] || false}
              onAddRow={handleAddRow}
            />
          ))}

          <div className="project-reactPaginate">
            <ReactPaginate
              nextLabel=""
              breakLabel="..."
              previousLabel=""
              pageCount={pageCount}
              activeClassName="active"
              breakClassName="page-item"
              pageClassName={'page-item'}
              breakLinkClassName="page-link"
              nextLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              nextClassName={'page-item next'}
              previousLinkClassName={'page-link'}
              previousClassName={'page-item prev'}
              onPageChange={handlePageClick}
              // pageRangeDisplayed={5}
              containerClassName={'pagination react-paginate justify-content-end p-1'}
            />
          </div>
        </>
        :
        <NoProjectLayout />
      }
    </div >
  );
};

export default ProjectTable;
