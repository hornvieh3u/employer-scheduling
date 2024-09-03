import React, { useContext, useEffect, useState } from 'react';
import { DocumentContext } from '../../../../utility/context/Document';
import Recipients from '../Recipients';
import { Bold, Italic, Underline } from 'react-feather';
import FontFamily from './../../../formBuilder/edit/configuration/fontfamily';
import {
  Button,
  FormGroup,
  Input,
  Label,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader
} from 'reactstrap';
import ItemProps from './ItemProps';
import { addCustomField, getCustomField } from '../../../../requests/documents/custom-fields';
const offCanvasParent = {
  position: 'relative'
};
const offCanvas = {
  position: 'absolute'
};
export default function PropertiesMenu({ item }) {
  // ** Contexts
  const {
    board,
    setBoard,
    openProps,
    selectedItem,
    setSelectedItem,
    setOpenProps,
    setCustomFields
  } = useContext(DocumentContext);
  // const [properties, setproperties] = useState({ ...selectedItem })
  const [required, setRequired] = useState(false);
  const [margin, setMargin] = useState({ top: 0, bottom: 0 });

  const mainToggle = () => {
    setOpenProps(!openProps);
  };
  const handleCollapse = (e) => {
    e.preventDefault();
    var area = e.target.getAttribute('aria-controls');

    if (document.getElementById(area).classList.contains('show')) {
      document.getElementById(area).classList.remove('show');
    } else {
      document.getElementById(area).classList.add('show');
    }
  };
  const handleRequireChange = (e) => {
    setRequired(e.target.checked);
    setSelectedItem({ ...selectedItem, required: e.target.checked });
  };
  const handleChangeProperties = (e) => {
    e.preventDefault();
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
    console.log('e', e.target.value);
  };
  const handleBoldClicked = () => {
    setSelectedItem({ ...selectedItem, bold: !selectedItem.bold });
  };
  const handleItalicClicked = () => {
    setSelectedItem({ ...selectedItem, italic: !selectedItem.italic });
  };
  const handleUnderlineClicked = () => {
    setSelectedItem({ ...selectedItem, underline: !selectedItem.underline });
  };
  const handlePaddingChange = (e) => {
    setSelectedItem({ ...selectedItem, padding: e.target.value });
  };
  const handleLineHeight = (e)=>{
    setSelectedItem({ ...selectedItem, height: e.target.value });
  }
  const handleLineColor = (e)=>{
    setSelectedItem({ ...selectedItem, fontColor: e.target.value });
  }
  const handleDelete = () => {
    //setBoard(board.filter((x) => (x.id !== selectedItem.id && x.type !== selectedItem.type)));
    const filter = { id: selectedItem.id, type: selectedItem.type };
    const temp = board.filter(function (item) {
      if (item.id === filter.id && item.type === filter.type) {
        return false;
      }

      return true;
    });
    setBoard(temp);
  };
  const handleAddCustomField = async () => {
    //add new custom field
    const fields = { ...selectedItem, icon: '', recipient: {}, id: 0, left: 0, top: 0 };

    const payload = {
      settingsName: selectedItem.dataLabel,
      type: selectedItem.type,
      fields: fields
    };
    await addCustomField(payload);
    const cf = await getCustomField();
    setCustomFields(cf);
  };

  useEffect(() => {
    setRequired(selectedItem.required);
    setBoard(
      board.map((b) => {
        if (b.id === selectedItem?.id && b.type === selectedItem?.type) {
          return selectedItem;
        }
        return b;
      })
    );
  }, [selectedItem]);
  useEffect(() => {
    const header = document.getElementById('modalHeader');
    const footer = document.getElementById('modalFooter');
    setMargin({ top: header.clientHeight, bottom: footer.clientHeight });
  }, []);
  const list = () => (
    <div style={{ width: 280 }}>
      <div className="accordion" style={{ borderRadius: 'none' }}>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingRecipient">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseRecipient"
              onClick={handleCollapse}
            >
              Recipient
            </button>
          </h2>
          <div
            id="collapseRecipient"
            className="accordion-collapse collapse show"
            aria-labelledby="headingRecipient"
          >
            <div className="accordion-body">
              <Recipients item={selectedItem} />
              {[
                'attachment',
                'checkbox',
                'company',
                'drawing',
                'dropdown',
                'initial',
                'radio',
                'sign',
                'stamp',
                'text',
                'title'
              ].includes(selectedItem?.type) && (
                <FormGroup check>
                  <Input
                    name="required"
                    type="checkbox"
                    checked={required}
                    onChange={handleRequireChange}
                  />{' '}
                  <Label check>Required Field</Label>
                </FormGroup>
              )}
              {/* {['company', 'title', 'text', 'checkbox', 'dropdown', 'radio'].includes(
                selectedItem?.type
              ) && (
                <FormGroup check>
                  <Input type="checkbox" /> <Label check>Read Only</Label>
                </FormGroup>
              )} */}
            </div>
          </div>
        </div>
        {['note'].includes(selectedItem?.type) && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingText">
              <button
                className="accordion-button"
                type="button"
                aria-expanded="true"
                aria-controls="collapseText"
                onClick={handleCollapse}
              >
                Add Text
              </button>
            </h2>
            <div
              id="collapseText"
              className="accordion-collapse collapse show"
              aria-labelledby="headingText"
            >
              <div className="accordion-body">
                <Input
                  name="addText"
                  type="textarea"
                  value={selectedItem?.addText}
                  className="border py-0"
                  onChange={handleChangeProperties}
                />
              </div>
            </div>
          </div>
        )}
        {[
          'sign',
          'initial',
          'stamp',
          'signDate',
          'name',
          'email',
          'company',
          'title',
          'text',
          'checkbox',
          'dropdown',
          'radio',
          'formula',
          'note',
          'drawing',
          'attachment',
          'approve',
          'decline'
        ].includes(selectedItem?.type) && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFormating">
              <button
                className="accordion-button"
                type="button"
                aria-expanded="true"
                aria-controls="collapseFormating"
                onClick={handleCollapse}
              >
                Formating
              </button>
            </h2>
            <div
              id="collapseFormating"
              className="accordion-collapse collapse show"
              aria-labelledby="headingFormating"
            >
              <div className="accordion-body">
                {[
                  'sign',
                  'initial',
                  'stamp',
                  'checkbox',
                  'radio',
                  'drawing',
                  'attachment',
                  'approve',
                  'decline'
                ].includes(selectedItem?.type) && (
                  <div className="row">
                    <div className="col-6">
                      <Input
                        type="text"
                        name="formatting"
                        onChange={handleChangeProperties}
                        className="border py-0"
                        value={selectedItem?.formatting}
                      />
                    </div>
                    <div className="col-6 my-auto">
                      <span>Scale %</span>
                    </div>
                  </div>
                )}
                {[
                  'signDate',
                  'name',
                  'email',
                  'company',
                  'title',
                  'text',
                  'formula',
                  'note',
                 
                ].includes(selectedItem?.type) && (
                  <div>
                    <FormGroup>
                      <Input
                        type="select"
                        name="font"
                        value={selectedItem?.font}
                        onChange={handleChangeProperties}
                      >
                        {FontFamily.families.map((item, i) => {
                          return (
                            <option value={item} key={i}>
                              {item}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>

                    <div className="row">
                      <div className="col-5 ">
                        <FormGroup>
                          <Input
                            type="select"
                            name="fontSize"
                            value={selectedItem?.fontSize}
                            onChange={handleChangeProperties}
                          >
                            <option value={'9'}>9</option>
                            <option value={'10'}>10</option>
                            <option value={'11'}>11</option>
                            <option value={'12'}>12</option>
                            <option value={'13'}>13</option>
                            <option value={'14'}>14</option>
                            <option value={'15'}>15</option>
                          </Input>
                        </FormGroup>
                      </div>
                      <div className="col-7 mx-0 ">
                        <Button
                          color={`${selectedItem?.bold ? 'primary' : 'link'}`}
                          name="bold"
                          onClick={handleBoldClicked}
                          style={{
                            padding: '5px',
                            margin: '1px'
                          }}
                        >
                          <Bold />
                        </Button>
                        <Button
                          color={`${selectedItem?.italic ? 'primary' : 'link'}`}
                          name="italic"
                          onClick={handleItalicClicked}
                          style={{
                            padding: '5px',
                            margin: '1px'
                          }}
                        >
                          <Italic />
                        </Button>
                        <Button
                          color={`${selectedItem?.underline ? 'primary' : 'link'}`}
                          name="underline"
                          onClick={handleUnderlineClicked}
                          style={{
                            padding: '5px',
                            margin: '1px'
                          }}
                        >
                          <Underline />
                        </Button>
                      </div>
                    </div>
                    <FormGroup>
                      <Label>Color</Label>
                      <Input type='color' name="fontColor"
                        value={selectedItem?.fontColor}
                        onChange={handleChangeProperties} />
                     
                    </FormGroup>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {['dropdown', 'radio', 'checkbox'].includes(selectedItem?.type) && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingddItems">
              <button
                className="accordion-button"
                type="button"
                aria-expanded="true"
                aria-controls="collapseddItems"
                onClick={handleCollapse}
              >
                Items & values
              </button>
            </h2>
            <div
              id="collapseddItems"
              className="accordion-collapse collapse show"
              aria-labelledby="headingddItems"
            >
              <div className="accordion-body">
                <ItemProps />
              </div>
            </div>
          </div>
        )}
        {['radio', 'checkbox'].includes(selectedItem?.type) && (
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingddItems">
              <button
                className="accordion-button"
                type="button"
                aria-expanded="true"
                aria-controls="collapseddItems"
                onClick={handleCollapse}
              >
                Line Height
              </button>
            </h2>
            <div
              id="collapseddItems"
              className="accordion-collapse collapse show"
              aria-labelledby="headingddItems"
            >
              <div className="accordion-body">
                <div className="d-flex justyfy-content-start">
                  <Input type="text" onChange={handlePaddingChange} />{' '}
                  <span className="my-auto">px</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {['line'].includes(selectedItem?.type) && (
         <>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingddItems">
              <button
                className="accordion-button"
                type="button"
                aria-expanded="true"
                aria-controls="collapseddItems"
                onClick={handleCollapse}
              >
                Line Height
              </button>
            </h2>
            <div
              id="collapseddItems"
              className="accordion-collapse collapse show"
              aria-labelledby="headingddItems"
            >
              <div className="accordion-body">
                <div className="d-flex justyfy-content-start">
                  <Input type="text" onChange={handleLineHeight} value={selectedItem?.height}/>{' '}
                  <span className="my-auto">px</span>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
          <h2 className="accordion-header" id="headingddItems">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseddItems"
              onClick={handleCollapse}
            >
              Color
            </button>
          </h2>
          <div
            id="collapseddItems"
            className="accordion-collapse collapse show"
            aria-labelledby="headingddItems"
          >
            <div className="accordion-body">
              <div className="d-flex justyfy-content-start">
                <Input type="color" onChange={handleLineColor} value={selectedItem?.fontColor}/>{' '}
                <span className="my-auto">px</span>
              </div>
            </div>
          </div>
        </div>
         </>
        )}
        {/* <div className="accordion-item">
          <h2 className="accordion-header" id="headingDataLabel">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseDataLabel"
              onClick={handleCollapse}
              // style={{
              //     backgroundColor: grey[200],
              //     color: grey[700]
              // }}
            >
              Data Label
            </button>
          </h2>
          <div
            id="collapseDataLabel"
            className="accordion-collapse collapse show"
            aria-labelledby="headingDataLabel"
          >
            <div className="accordion-body">
              <Input
                value={selectedItem?.dataLabel}
                type="text"
                name="dataLabel"
                onChange={handleChangeProperties}
                className="border py-0"
              />
            </div>
          </div>
        </div> */}
        {/* <div className="accordion-item">
          <h2 className="accordion-header" id="headingTooltip">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseTooltip"
              onClick={handleCollapse}

              // style={{
              //     backgroundColor: grey[200],
              //     color: grey[700]
              // }}
            >
              Tooltip
            </button>
          </h2>
          <div
            id="collapseTooltip"
            className="accordion-collapse collapse show"
            aria-labelledby="headingTooltip"
          >
            <div className="accordion-body">
              <Input
                type="textarea"
                name="tooltip"
                value={selectedItem?.tooltip}
                className="border py-0"
                onChange={handleChangeProperties}
              ></Input>
            </div>
          </div>
        </div> */}

        {/* <div className="accordion-item">
          <h2 className="accordion-header" id="headingLocation">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseLocation"
              onClick={handleCollapse}
            >
              Location
            </button>
          </h2>
          <div
            id="collapseLocation"
            className="accordion-collapse collapse show"
            aria-labelledby="headingLocation"
          >
            <div className="accordion-body">
              <div className="row">
                <div className="col-5">
                  <Input
                    name="left"
                    value={selectedItem?.left}
                    className="border py-0"
                    onChange={handleChangeProperties}
                  ></Input>
                </div>
                <div className="col-7 my-auto">
                  <span>Location from left</span>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <Input
                    name="top"
                    value={selectedItem?.top}
                    className="border py-0"
                    onChange={handleChangeProperties}
                  ></Input>
                </div>
                <div className="col-7 my-auto">
                  <span>Location from top</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="accordion-item">
          <h2 className="accordion-header" id="headingAutoplace">
            <button
              className="accordion-button"
              type="button"
              aria-expanded="true"
              aria-controls="collapseAutoplace"
              onClick={handleCollapse}
            >
              Autoplace Text
            </button>
          </h2>
          <div
            id="collapseAutoplace"
            className="accordion-collapse collapse show"
            aria-labelledby="headingAutoplace"
          >
            <div className="accordion-body">
              <Input
                name="autoplaceText"
                value={selectedItem?.autoplaceText}
                className="border py-0"
                onChange={handleChangeProperties}
              ></Input>
            </div>
          </div>
        </div> */}
      </div>
      <div className="card" style={{ position: 'relative', right: '0px', bottom: '0px' }}>
        <div className="card-body">
          <Button className="w-100" color="primary" outline onClick={handleAddCustomField}>
            Save as custom field
          </Button>
          <Button className="w-100 my-2" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <Offcanvas
      offcanvasClassName="offCanvas"
      toggle={mainToggle}
      direction="end"
      isOpen={openProps}
      backdrop={false}
      className="border-start shadow "
      style={{ marginTop: `${margin.top + 1}px`, marginBottom: `${margin.bottom + 1}px` }}
    >
      <OffcanvasHeader toggle={mainToggle}>
        {selectedItem?.icon}
        <span className="ps-1">{selectedItem?.title}</span>
      </OffcanvasHeader>
      <OffcanvasBody>{list()}</OffcanvasBody>
    </Offcanvas>
  );
}
