// ** React Imports
import { Fragment, useState } from 'react';
// ** Third Party Components
import '@styles/react/apps/app-email.scss';
// ** myforms App Component Imports
import Sidebar from './component/TopCard';
import { useSelector } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';

import FilterTopBar from './component/FilterTopBar';

const WorkHistory = ({}) => {
  const [selectedValue, setSelectedValue] = useState('today');
  const [selectedFilter, setSelectedFilter] = useState('remote');

  const { totalEmployeeCount, activeEmployeeCount, internshipEmployeeCount, formerEmployeeCount } =
    useSelector((state) => state.employeeContact);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeEmployee = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <Fragment>
      <Sidebar
        totalEmployeeCount={totalEmployeeCount}
        activeEmployeeCount={activeEmployeeCount}
        internshipEmployeeCount={internshipEmployeeCount}
        formerEmployeeCount={formerEmployeeCount}
      />

      <div>
        <FilterTopBar
          selectedValue={selectedValue}
          handleChangeEmployee={handleChangeEmployee}
          handleSelectChange={handleSelectChange}
          selectedFilter={selectedFilter}
        />
      </div>
    </Fragment>
  );
};

export default WorkHistory;
