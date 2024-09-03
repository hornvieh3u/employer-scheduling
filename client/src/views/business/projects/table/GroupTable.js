/*    eslint-disable */

// ** React Imports
import React, { useState, useEffect } from 'react';

//** Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsData } from '../store/reducer';
// ** Icons Imports
import { Plus, Save, Delete, Trash, Trash2, MoreVertical } from 'react-feather';
import { FaChevronDown } from 'react-icons/fa';

// ** Third Party Components
import Select, { components } from 'react-select'; //eslint-disable-line
import styled from 'styled-components';
import { toast } from 'react-toastify';

// ** Utils
import { selectThemeColors } from '@utils';
import { DateFormatter } from '../resources/dateFormatter';

// ** Reactstrap Imports
import { Row, Collapse, Table, Input, UncontrolledTooltip, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

// ** Styles
import '@styles/base/pages/page-projects.scss';

// ** Comp Imports
import ProjectModal from '../modal/Modal';

// ** Assignee Avatars
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg';

//** API
import {
  addColumn,
  deleteTable,
  deleteRow,
  updateTable,
  deleteColumn
} from '../../../../requests/projects/project';

function GroupTable({ index, projectData, isOpen, onToggle, rotateIcon, onAddRow }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.userData);

  const [columnType, setColumnType] = useState('');
  const [rows, setRows] = useState([]);
  const [columeTitle, setColumnTitle] = useState([]);
  const [assignedTo, setAssignedTo] = useState({});
  const [showActions, setShowActions] = useState(false);

  const [groupTitle, setGroupTitle] = useState(projectData.title);
  const [rowIds, setRowIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteGroupModal, setDeleteGroupModal] = useState(false);
  const [saveResultModal, setSaveResultModal] = useState(false);
  const [deleteColumnModal, setDeleteColumnModal] = useState(false);
  const [columnTypeModal, setColumnTypeModal] = useState('');

  // ** Assignee Select Options
  const assigneeOptions = [
    { value: 'Pheobe Buffay', label: 'Pheobe Buffay', img: img1 },
    { value: 'Chandler Bing', label: 'Chandler Bing', img: img2 },
    { value: 'Ross Geller', label: 'Ross Geller', img: img3 },
    { value: 'Monica Geller', label: 'Monica Geller', img: img4 }
  ];

  const employeeOptions = [
    { userID: '01', value: 'Astro Kramer', label: 'Astro Kramer', img: img2 },
    { userID: '02', value: 'George Costanza', label: 'George Costanza', img: img5 },
    { userID: '03', value: 'Charlie Kelly', label: 'Charlie Kelly', img: img4 },
    { userID: '04', value: 'Dennis Reynolds', label: 'Dennis Reynolds', img: img3 }
  ];

  // ** Status Select
  const selectOptions = [
    { userID: '01', value: 'pending', label: 'Pending' },
    { userID: '02', value: 'working', label: 'Working' },
    { userID: '03', value: 'stuck', label: 'Stuck' },
    { userID: '04', value: 'done', label: 'Done' }

  ];

  const ReactSelect = styled(Select)`
    .Select-control {
      height: 26px;
      font-size: small;

      .Select-placeholder {
        line-height: 26px;
        font-size: small;
      }

      .Select-value {
        line-height: 26px;
      }

      .Select-input {
        height: 26px;
        font-size: small;
      }
    }
  `;

  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <img
            className="d-block rounded-circle me-50"
            src={data.img}
            height="26"
            width="26"
            alt={data.label}
          />
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const SelectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  useEffect(() => {
    const desiredOrder = [
      '_id',
      'project',
      'manager',
      'people',
      'timeline',
      'status',
      'text',
      'date'
    ];
    let updatedRows = projectData.rowData;
    updatedRows = JSON.parse(JSON.stringify(updatedRows));

    if (updatedRows.length > 0) {
      const keys = Object.keys(updatedRows[0]);
      const result = desiredOrder
        .filter((key) => keys.includes(key))
        .map((key) => {
          const modifiedKey = key.charAt(0).toUpperCase() + key.slice(1);
          return modifiedKey;
        });
      setColumnTitle(result);
    } else {
      setColumnTitle([]);
    }
    setRows(updatedRows);
  }, [projectData]);

  const handleChange = (e, i, j) => {
    const newRows = [...rows];
    newRows[i] = { ...newRows[i], [columeTitle[j].toLowerCase()]: e.target.value };
    setRows(newRows);
  };

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      setRowIds((prev) => [...prev, e.target.value]);
    } else {
      removeRowIds(e);
    }
    setShowActions(true);
  };

  const removeRowIds = (e) => {
    setRowIds([...rowIds.filter((ids) => ids !== e.target.value)]);
  };

  const toggleSaveResults = () => setSaveResultModal(!saveResultModal);
  const toggleDelete = () => setDeleteModal(!deleteModal);
  const toggleDeleteGroup = () => setDeleteGroupModal(!deleteGroupModal);
  const toggleColumnType = () => setColumnTypeModal(!columnTypeModal);
  const toggleDeleteColumn = () => setDeleteColumnModal(!deleteColumnModal);

  const saveTableResultHandler = (e) => {
    e.preventDefault();
    let payload = {
      userID: currentUser.id,
      tableID: projectData._id,
      title: groupTitle,
      rowData: rows
    };
    updateTable(payload).then((response) => {
      dispatch(getProjectsData(response.data.Data));
      setShowActions(false);
    });

    toggleSaveResults();
  };

  const deleteRowHandler = (e) => {
    e.preventDefault();
    if (rowIds.length < 1) {
      toast.warning('Please select a project!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      let payload = {
        data: {
          tableID: projectData._id,
          rowIDs: rowIds,
          userID: currentUser.id
        }
      };
      deleteRow(payload).then((response) => {
        dispatch(getProjectsData(response?.data.updatedTables));
        toggleDelete();
        setShowActions(false);
      });
      setRowIds([]);
    }
  };

  const addColumnHandler = () => {
    if (columnType === '') {
      toast.warning('Please select a column type!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      const payload = {
        tableID: projectData._id,
        columnType: columnType,
        userID: currentUser.id
      };
      addColumn(payload).then((response) => {
        dispatch(getProjectsData(response.data.data));
        toggleColumnType();
      });
    }
  };
  const deleteColumnHanlder = () => {
    let payload = {
      data: {
        tableID: projectData._id,
        columnType: columnType,
        userID: currentUser.id
      }
    };
    deleteColumn(payload).then((response) => {
      dispatch(getProjectsData(response.data.data))
      toggleDeleteColumn();
      setShowActions(true);
    })
  }
  const deleteGroupHandler = () => {
    let payload = {
      data: {
        tableID: projectData._id,
        userID: currentUser.id
      }
    };
    deleteTable(payload).then((response) => {
      if (response.data) {
        dispatch(getProjectsData(response.data.data));
      } else { dispatch(getProjectsData([])); }
      toggleDeleteGroup();
      setShowActions(true);
    });
  };

  return (
    <div>
      <Row style={{ marginBottom: '1rem' }}>
        <div className="board-wrapper">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-1 board-header">
              <div className="project-group" onClick={() => onToggle(index)}>
                <FaChevronDown
                  size={20}
                  className={`${rotateIcon ? 'project-group-rotate-icon' : 'project-group-rotate-start'
                    }`}
                  style={{ color: '#7367f0', cursor: 'pointer' }}
                />
              </div>
              <Input
                className="group-title"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '500',
                  border: '0',
                  backgroundColor: 'transparent'
                }}
              />
            </div>

            <ProjectModal
              title="Submit Results"
              toggle={toggleSaveResults}
              modal={saveResultModal}
              saveButtonText="Save"
              saveButtonColor="primary"
              onClick={saveTableResultHandler}
            />

            <ProjectModal
              title="Do you really want to delete selected project(s)?"
              toggle={toggleDelete}
              modal={deleteModal}
              saveButtonText="Delete"
              saveButtonColor="danger"
              onClick={deleteRowHandler}
            />

            <ProjectModal
              title="Do you really want to delete this group?"
              toggle={toggleDeleteGroup}
              modal={deleteGroupModal}
              saveButtonText="Delete"
              saveButtonColor="danger"
              onClick={deleteGroupHandler}
            />

            <ProjectModal
              title="Do you really want to delete this column?"
              toggle={toggleDeleteColumn}
              modal={deleteColumnModal}
              saveButtonText="Delete"
              saveButtonColor="danger"
              onClick={deleteColumnHanlder}
            />


            <ProjectModal
              title="Add Column Type"
              toggle={toggleColumnType}
              modal={columnTypeModal}
              saveButtonText="Add"
              saveButtonColor="primary"
              onClick={addColumnHandler}
              addInputBody={true}
              onChange={(e) => setColumnType(e.target.value)}
            />
          </div>
        </div>
      </Row>
      <Collapse className="project-table-collapse" isOpen={isOpen}>
        <Table bordered responsive>
          <thead>
            <tr>
              {columeTitle.map((column) =>
                column === '_id' ? (
                  <th style={{ maxWidth: 'fit-content' }}>Select</th>
                ) : (
                  <th style={{ minWidth: '20rem' }} id={column}>
                    <div style={{ minWidth: '20rem', display: 'flex', justifyContent: 'space-between' }}>
                      {column}
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="hide-arrow me-1"
                          tag="a"
                          href="/"
                          onClick={(e) => {
                            e.preventDefault()
                            setColumnType(column.toLowerCase())
                          }
                          }
                        >
                          <MoreVertical className="text-body" size={16} />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem>
                            <div
                              className="cursor-pointer d-flex gap-1"
                              onClick={toggleDeleteColumn}
                              style={{ color: '#ea5455' }}
                            >
                              <Trash size={18} id={'DeleteGroup-Col'} />
                              Delete
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </th>
                )
              )}{' '}
              {rows?.length > 0 && (
                <th class="ml-4" style={{ position: 'sticky', right: 0 }}>
                  <div
                    className="cursor-pointer"
                    color="primary"
                    onClick={toggleColumnType}
                    click
                    size={14}
                  >
                    <Plus size={20} id={'AddProject-Col' + projectData._id} />{' '}
                    <UncontrolledTooltip placement="top" target={'AddProject-Col' + projectData._id}>
                      Add Column
                    </UncontrolledTooltip>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, i) => (
              <tr className="project-table-row" key={row._id}>
                {columeTitle.map((column, j) => (
                  <td className="project-table-fields" key={j} style={{ textAlign: 'center' }}>
                    {column === '_id' ? (
                      <div>
                        <Input
                          className="project-table-checkbox"
                          type="checkbox"
                          value={row._id}
                          onChange={(e) => handleChangeCheckbox(e)}
                        />
                      </div>
                    ) : column === 'Project' ? (
                      <Input
                        type="text"
                        value={row[column.toLowerCase()]}
                        onChange={(e) => handleChange(e, i, j)}
                        required
                      />
                    ) : column === 'Text' ? (
                      <Input
                        type="text"
                        value={row[column.toLowerCase()]}
                        onChange={(e) => handleChange(e, i, j)}
                        required
                      />
                    ) : column === 'Date' ? (
                      <Input
                        type="date"
                        value={DateFormatter(row[column.toLowerCase()])}
                        onChange={(e) => handleChange(e, i, j)}
                        required
                      />
                    ) : column === 'Timeline' ? (
                      <Input
                        type="date"
                        value={DateFormatter(row[column.toLowerCase()])}
                        onChange={(e) => handleChange(e, i, j)}
                        required
                      />
                    ) : column === 'Manager' ? (
                      <ReactSelect
                        value={row[column.toLowerCase()] ? assigneeOptions.find(x => x.value === row[column.toLowerCase()].value) : ''}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={assigneeOptions}
                        theme={selectThemeColors}
                        onChange={(data) => {
                          const newRows = [...rows];
                          newRows[i][columeTitle[j].toLowerCase()] = data;
                          setRows(newRows);
                        }}
                        components={{ Option: AssigneeComponent }}
                        menuPortalTarget={document.body}
                      />
                    ) : column === 'People' ? (
                      <ReactSelect
                        isMulti
                        value={row.hasOwnProperty(column.toLowerCase())
                          ? employeeOptions.filter(option => row[column.toLowerCase()].some(rowOption => rowOption.value === option.value)) : []}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={employeeOptions}
                        theme={selectThemeColors}
                        onChange={(data) => {
                          const newRows = [...rows];
                          newRows[i][columeTitle[j].toLowerCase()] = data;
                          setRows(newRows);
                        }}
                        components={{ Option: AssigneeComponent }}
                        menuPortalTarget={document.body}
                      />
                    ) : column === 'Status' ? (
                      <ReactSelect
                        value={!row[column.toLowerCase()] || row[column.toLowerCase()].length < 1
                          ? '' : selectOptions.find(x => x.value === row[column.toLowerCase()].find(y => y.userID === x.userID)?.value)
                        }
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                        options={selectOptions}
                        theme={selectThemeColors}
                        onChange={(data) => {
                          const newRows = [...rows];
                          newRows[i][columeTitle[j].toLowerCase()] = [data];
                          setRows(newRows);
                        }}
                        components={{ Option: SelectComponent }}
                        menuPortalTarget={document.body}
                      />
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex align-items-center justify-content-center gap-2 my-1 mb-3">
          {rotateIcon && (<div
            className="cursor-pointer"
            onClick={() => {
              onAddRow(projectData._id);
            }}
            style={{ color: '#28c76f' }}
          >
            <Plus size={30} id={'AddProject-Tooltip' + projectData._id} />
            <UncontrolledTooltip placement="top" target={'AddProject-Tooltip' + projectData._id}>
              New Project
            </UncontrolledTooltip>
          </div>
          )}

          {rotateIcon && rowIds.length > 0 ? (<div className="cursor-pointer" onClick={toggleDelete}>
            <Delete size={25} id={'DeleteProject-Tooltip' + projectData._id} />
            <UncontrolledTooltip placement="top" target={'DeleteProject-Tooltip' + projectData._id}>
              Delete Project
            </UncontrolledTooltip>
          </div>
          )
            :
            ''
          }

          {rotateIcon && (
            <div
              className="cursor-pointer"
              onClick={toggleSaveResults}
              style={{ color: '#7367f0' }}
            >
              <Save size={25} id={'SaveChanges-Tooltip' + projectData._id} />
              <UncontrolledTooltip placement="top" target={'SaveChanges-Tooltip' + projectData._id}>
                Save Changes
              </UncontrolledTooltip>
            </div>
          )}

          {rotateIcon && (
            <div
              className="cursor-pointer"
              onClick={toggleDeleteGroup}
              style={{ color: '#ea5455' }}
            >
              <Trash2 size={25} id={'DeleteGroup-Tooltip' + projectData._id} />
              <UncontrolledTooltip
                key={projectData._id}
                placement="top"
                target={'DeleteGroup-Tooltip' + projectData._id}
              >
                Delete Group
              </UncontrolledTooltip>
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
}

export default GroupTable;
