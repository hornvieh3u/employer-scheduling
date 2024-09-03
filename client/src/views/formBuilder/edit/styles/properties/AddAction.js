import React from 'react'
import { Button } from 'reactstrap';

export default function AddAction({getSelectedHtmlElement}) {
    const handleChangeEvent = () => {
        let attributes = getSelectedHtmlElement().getAttributes();
          let selected = attributes.selectedOption;
          let openURL = attributes.openURL;
          let openWay = attributes.openWay;
          //setButtonOpenURL(openURL);
          //setButtonOpenWay(openWay);
          //setSelectAction(selected);
          //toggleButtonAction({}, true);
      }
  return (
    <>
     <Button
        color="primary"
        size="sm"
        className="inputstyle w-100"
        onClick={handleChangeEvent}
      >
        SET ACTION
      </Button>
    </>
  )
}
