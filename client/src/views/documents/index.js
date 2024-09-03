// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

// ** Email App Component Imports
import Docs from './Docs';
import Sidebar from './Sidebar';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { getDocs, selectDoc, selectAllMail, resetSelectedMail, searchDocuments } from './store';

// ** Styles
import '@styles/react/apps/app-email.scss';

const DocsApp = () => {
  // ** States
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.documents);

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    dispatch(
      getDocs({
        q: query || '',
        folder: params.folder || 'inbox'
        //label: params.label || ''
      })
    );
  }, [params.folder, params.label]);
  useEffect(() => {
    if (query !== '') {
      dispatch(
        searchDocuments({
          query: query || ''
        })
      );
    }
  }, [query]);
  

  return (
    <Fragment>
      <Sidebar
        store={store}
        dispatch={dispatch}
        getDocs={getDocs}
        sidebarOpen={sidebarOpen}
        toggleCompose={toggleCompose}
        setSidebarOpen={setSidebarOpen}
        resetSelectedMail={resetSelectedMail}
      />
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <Docs
            store={store}
            query={query}
            setQuery={setQuery}
            dispatch={dispatch}
            getDocs={getDocs}
            selectDoc={selectDoc}
            folder={params.folder}
            composeOpen={composeOpen}
            //paginateMail={paginateMail}
            selectAllMail={selectAllMail}
            toggleCompose={toggleCompose}
            setSidebarOpen={setSidebarOpen}
            //updateMailLabel={updateMailLabel}
            resetSelectedMail={resetSelectedMail}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default DocsApp;
