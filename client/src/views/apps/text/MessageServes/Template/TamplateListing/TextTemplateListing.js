import React, { memo, useState } from "react";
import { Card, CardBody, CardText, Col, Row } from "reactstrap";
import EditTemplate from "./editTemplateModal";
import { Copy, Trash } from "react-feather";
import { Link } from "react-router-dom";
import { ChevronsRight, Edit } from "react-feather/dist";
import { HiHome } from "react-icons/hi";
// import ConfirmationModal from "../../../../../../../../../components/gloabal/confirmation";
// import { REMOVE_TEMPLATE } from "../../../../../../../../../redux/actions/marketing/text";
// import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
// import BreadCrumbs from "../../../../../../../../../components/@vuexy/breadCrumbs/BreadCrumb";

// const useStyles = makeStyles(() => ({
//   styleListItem: {
//     border: "solid 1px #e0e0e0",
//     fontFamily: "Quicksand",
//     paddingTop: "10px",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
// }));
const listoftemplates = [
  {
    "_id": "625af3ff4981c75b08c6c6e4",
    "template_name": "testing temp",
    "text": "hdjshdushdshdjshdjsd",
    "subFolderId": "625af3954981c75b08c6c6de",
    "rootFolderId": "625af1764981c75b08c6c6bc",
    "userId": "606aea95a145ea2d26e0f1ab",
    "__v": 0
  },
  {
    "_id": "625dbe58c1794d1de0ffa1e4",
    "template_name": "test",
    "text": "hey bro!",
    "subFolderId": "625af3954981c75b08c6c6de",
    "rootFolderId": "625af1764981c75b08c6c6bc",
    "userId": "606aea95a145ea2d26e0f1ab",
    "__v": 0
  }
]

const mainFolderdata = {
  "_id": "625af1764981c75b08c6c6bc",
  "folderName": "new folder muj",
  "userId": "606aea95a145ea2d26e0f1ab",
  "__v": 0
}

const subfolderdata = {
  "_id": "625af3954981c75b08c6c6de",
  "subFolderName": "checking",
  "userId": "606aea95a145ea2d26e0f1ab",
  "folderId": "625af1764981c75b08c6c6bc",
  "__v": 0
}


function TextTemplateListing(props) {

  // const classes = useStyles();
  const { data } = props;
  const [sweatAlert, setsweatAlert] = useState(false);
  const [id, setId] = useState("");
  const [iscopy, setcopy] = useState("");
  const CopyPassWord = (item, index) => {
    window.navigator.clipboard.writeText(item?.text);
    setcopy(item?._id + index);
  };
  const handleAlert = (Id) => {
    setsweatAlert(true);
    setId(Id);
  };
  const HandleDelete = () => {
    props.REMOVE_TEMPLATE(id, props.subFolderId);
    setsweatAlert(false);
  };

  if (!mainFolderdata || !subfolderdata || !listoftemplates ) {
    return null
  }
  
  return (
    <div className="w-100">
      <div className="d-flex gap-2 align-items-center pt-1">
        <Link to="/">
          <HiHome size={16} />
        </Link>
        <ChevronsRight size={16} />
        {mainFolderdata.folderName ? (
          <div className="d-flex gap-2">
            <span className="text-capitalize">{mainFolderdata?.folderName}</span>
            <ChevronsRight size={16} />
          </div>
        ) : null}
        {subfolderdata?.subFolderName ? (
          <div className="d-flex gap-2">
            <span className="text-capitalize">{subfolderdata?.subFolderName}</span>
            <ChevronsRight size={16} />
          </div>
        ) : null}
      </div>
      <div className="d-flex justify-content-end">
        {/* {listoftemplates !== null && <EditTemplate item={listoftemplates} />} */}
        <EditTemplate />
      </div>
      <br></br>
      <Row container spacing={3}>
        {listoftemplates !== null &&
          listoftemplates.map((item, index) => (
            <Col item xs={4} key={index}>
              <Card className="p-1">
                <h4>
                  {item?.template_name}
                </h4>
                <CardBody className="border rounded">
                  <CardText
                    style={{ color: "black", fontSize: "1rem" }}
                    component="p"
                    
                  >
                    {item?.text}
                  </CardText>
                </CardBody>
                <div className="d-flex justify-content-end gap-1 pt-1"
                >
                  <Copy size={16} />
                  <Edit size={16} />
                  <Trash size={16} disabled={item?.adminId !== undefined}
                    onClick={() => {
                      handleAlert(item?._id);
                    }} />
                </div>
              </Card>
            </Col>
          ))}
      </Row>
      {/* <ConfirmationModal
        primaryColor="#0483fd"
        secondaryColor="#fff"
        imagePath="/images/delete.png"
        open={sweatAlert}
        title="Delete Template?"
        onConfirm={HandleDelete}
        onCancel={() => {
          setsweatAlert(false);
        }}
        onCancelButtonTitle={"Cancel"}
        contiunuebuttonTitle={"Delete"}
        description=" Are you sure you Delete it ?"
      /> */}
    </div >
  );
};

export default memo(TextTemplateListing);
