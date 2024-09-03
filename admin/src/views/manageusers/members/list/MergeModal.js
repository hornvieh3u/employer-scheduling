import React, { useEffect } from 'react';
import { ArrowLeft, Check, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
// import AddItem from '../../../apps/filemanager/AddItem';
// import ListItem from '../../../apps/filemanager/ListItem';
// import { getFileAndFolders, prevPath, setCurrentPath } from '../../../apps/filemanager/store';

const MergeModal = ({ isMergeModalOpen, setIsMergeModalOpen, selectedList }) => {
  const dispatch = useDispatch();

  // const currentPath = useSelector((state) => state.filemanager.currentPath);
  // const files = useSelector((state) => state.filemanager.files);
  // const folders = useSelector((state) => state.filemanager.folders);

  // ** Initialization
  useEffect(() => {
    dispatch(setCurrentPath('/'));
  }, []);

  // ** Fetch all files and folder in current path
  // useEffect(() => {
  //   dispatch(getFileAndFolders(currentPath));
  // }, [currentPath]);

  // ** Handler functions
  const handleBack = () => {
    if (currentPath === '/') return;
    dispatch(prevPath());
  };

  return (
    <Modal isOpen={isMergeModalOpen} className="modal-dialog-centered modal-xl">
      <ModalHeader toggle={() => setIsMergeModalOpen(!isMergeModalOpen)}>
        Select Doc for merging
      </ModalHeader>
      <ModalBody>
        <div className="d-flex align-items-center mt-2 ml-2">
          <div className="cursor-pointer" onClick={() => handleBack()}>
            <ArrowLeft size={20} />
          </div>
          <h5 className="ms-1 mb-0">MyDrive</h5>
        </div>
        {/* <AddItem /> */}
        <div style={{ height: '600px', overflowY: 'auto' }}>
          {folders.length || files.length ? (
            <ul className="todo-task-list bg-white p-2">
              {folders.concat(files).map((item) => {
                return <ListItem item={item} />;
              })}
            </ul>
          ) : (
            <div className="no-results show"></div>
          )}
        </div>

        <div className="d-flex justify-content-between mt-2">
          <Button color="primary" className="btn-prev" onClick={() => setIsMergeModalOpen(false)}>
            <X size={14} className="align-middle me-sm-25 me-0"></X>
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => setIsMergeModalOpen(false)}>
            <span className="align-middle d-sm-inline-block d-none">Ok</span>
            <Check size={14} className="align-middle ms-sm-25 ms-0"></Check>
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default MergeModal;
