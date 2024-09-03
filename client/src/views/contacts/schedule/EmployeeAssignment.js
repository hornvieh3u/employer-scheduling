import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { ArrowRight, User } from 'react-feather';
import { Input } from 'reactstrap';
import { useGetAllEmployees } from '../../../requests/contacts/employee-contacts';

const columns = [
  {
    name: 'Photo',
    selector: (row) => <User size={18} />
  },
  {
    name: 'Name',
    selector: (row) => row.fullName
  },
  {
    name: 'Position',
    selector: (row) => row.position
  },
];

function EmployeeAssignment(props) {
  const [unassginedEmployees, setUnassginedEmployees] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(-1);

  const { data: groups } = useSelector( state => state.scheduleSetting.groups )
  const { employeesInSchedule } = useSelector( state => state.scheduleSetting.schedules )
  const {
    data: employees,
    refetch: fetchEmployees,
  } = useGetAllEmployees();

  useEffect(() => {
    fetchEmployees();

    let assigned = [];
    employeesInSchedule.forEach(employeeInSchedule => {
      assigned.push( employeeInSchedule._id )
    });

    let unassgined = [];
    employees.forEach(employee => {
      if( !assigned.includes(employee._id) ) {
        if( selectedGroup >= 0 ) {
          groups[selectedGroup].positions.forEach(pos => {
            if( employee.position == pos.name ) {
              unassgined.push(employee);
            }
          })
        } else {
          unassgined.push(employee);
        }
      }
    })

    setUnassginedEmployees( unassgined );
  }, [selectedGroup, employees]);

  return (
    <div className="employee-assignment">
      <div className="d-flex justify-content-start align-items-center">
        <div className="employer-name d-flex">
          <span>
            Peters Brown
            <ArrowRight size={16} />
          </span>
        </div>
        <Input id="group-selector" name="select" type="select" style={{ width: '250px' }} onChange={e => setSelectedGroup(e.target.value)}>
          <option value="-1">All</option>
          {
            groups.map((group, index) => {
              return (<option value={index}>{ group.name }</option>)
            })
          }
        </Input>
      </div>
      <hr />
      <DataTable columns={columns} data={unassginedEmployees} selectableRows pagination onSelectedRowsChange={props.selectEmployee} />
    </div>
  );
}

export default EmployeeAssignment;
