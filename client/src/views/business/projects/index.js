// ** Reactst Imports
import { Fragment, useEffect } from 'react';
import { getTableData } from '../../../requests/projects/project';
// ** Component Imports
import ProjectTable from './table/ProjectTable';

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsData } from './store/reducer';

const Projects = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.userData.id);
  useEffect(async () => {
    try {
      getTableData(id).then((responce) => {
        dispatch(getProjectsData(responce.data.result));
      });
    } catch (error) {
      return error;
    }
  }, []);

  return (
    <Fragment>
      <ProjectTable />
    </Fragment>
  );
};

export default Projects;
