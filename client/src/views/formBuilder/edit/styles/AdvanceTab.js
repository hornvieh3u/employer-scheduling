import React from 'react';
import AlignHorizontal from './properties/AlignHorizontal';
import BackgroundColor from './properties/BackgroundColor';
import BorderColor from './properties/BorderColor';
import Borders from './properties/Borders';
import BorderStyle from './properties/BorderStyle';
import BorderType from './properties/BorderType';
import BoxShadow from './properties/BoxShadow';
import Corners from './properties/Corners';
import Display from './properties/Display';
import Effects from './properties/Effects';
import Float from './properties/Float';
import FontWeight from './properties/FontWeight';
import HorizontalSpace from './properties/HorizontalSpace';
import IconColor from './properties/IconColor';
import IconPicker from './properties/IconPicker';
import IconPosition from './properties/IconPosition';
import LetterSpacing from './properties/LetterSpacing';
import LineHeight from './properties/LineHeight';
import Padding from './properties/Padding';
import Position from './properties/Position';
import RadiusEdge from './properties/RadiusEdge';
import Spacing from './properties/Spacing';
import TextAlign from './properties/TextAlign';
import TextShadow from './properties/TextShadow';
import TextTransform from './properties/TextTransform';
import VerticalSpace from './properties/VerticalSpace';
import Width from './properties/Width';
import Shadow from './properties/Shadow';
import WrapperFormBgColor from './properties/WrapperFormBgColor';
import WrapperFontColor from './properties/WrapperFontColor';
import WrapperInputBackground from './properties/WrapperInputBackground';
import Opacity from './properties/Opacity';
import WrapperFontSize from './properties/WrapperFontSize';

export default function AdvanceTab({ editor }) {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const getWrapperHtmlElement = ()=>{
    return editor.DomComponents.getWrapper();
  }
  return (
    <div>
      {['Appointment'].includes(editor?.getSelected()?.attributes?.name) && 
      <>
      <FontWeight getSelectedHtmlElement={getSelectedHtmlElement}/>
      <TextAlign getSelectedHtmlElement={getSelectedHtmlElement}/>
      <Corners getSelectedHtmlElement={getSelectedHtmlElement}/>
      </>
      }
      {['Billing'].includes(editor?.getSelected()?.attributes?.name) && 
      <>
      <WrapperFontSize getWrapper={getWrapperHtmlElement}/>
      </>
      }
      {['Bullets'].includes(editor?.getSelected()?.attributes?.name) && (
        <IconPicker getSelectedHtmlElement={getSelectedHtmlElement} />
      )}
      {['Button'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <Width getSelectedHtmlElement={getSelectedHtmlElement} />
          <Display getSelectedHtmlElement={getSelectedHtmlElement} />
          <VerticalSpace getSelectedHtmlElement={getSelectedHtmlElement} />
          <HorizontalSpace getSelectedHtmlElement={getSelectedHtmlElement} />
          <Corners getSelectedHtmlElement={getSelectedHtmlElement} />
          <Borders getSelectedHtmlElement={getSelectedHtmlElement} />
          <BoxShadow getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextShadow getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextTransform getSelectedHtmlElement={getSelectedHtmlElement} />
          <LetterSpacing getSelectedHtmlElement={getSelectedHtmlElement} />
          <IconPicker getSelectedHtmlElement={getSelectedHtmlElement} />
          <Effects getSelectedHtmlElement={getSelectedHtmlElement} />
          <AlignHorizontal getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Captcha'].includes(editor?.getSelected()?.attributes?.name) && <></>}

      {['Checkbox','Radio'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <LineHeight getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextTransform getSelectedHtmlElement={getSelectedHtmlElement} />
          <Spacing getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextShadow getSelectedHtmlElement={getSelectedHtmlElement} />
          <IconPicker getSelectedHtmlElement={getSelectedHtmlElement} />
          <Padding getSelectedHtmlElement={getSelectedHtmlElement} />
          <Corners getSelectedHtmlElement={getSelectedHtmlElement} />
          <RadiusEdge getSelectedHtmlElement={getSelectedHtmlElement} />
          <Borders getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderType getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderStyle getSelectedHtmlElement={getSelectedHtmlElement} />
          <Shadow getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Column'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <Corners getSelectedHtmlElement={getSelectedHtmlElement} />
          <RadiusEdge getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderType getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderStyle getSelectedHtmlElement={getSelectedHtmlElement} />
          <Borders getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Shadow getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Countdown'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      
      {['Divider'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Drop Down'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <FontWeight getSelectedHtmlElement={getSelectedHtmlElement} />
          <IconPicker getSelectedHtmlElement={getSelectedHtmlElement} />
          <Corners getSelectedHtmlElement={getSelectedHtmlElement} />
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['SMS', 'Email'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <FontWeight getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextAlign getSelectedHtmlElement={getSelectedHtmlElement} />
          <Corners getSelectedHtmlElement={getSelectedHtmlElement} />
          <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <IconPicker getSelectedHtmlElement={getSelectedHtmlElement} />
          <IconColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <IconPosition getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      
      {['Form'].includes(editor?.getSelected()?.attributes?.name) && 
      <>
      <WrapperFormBgColor getWrapper={getWrapperHtmlElement}/>
      <WrapperFontColor getWrapper={getWrapperHtmlElement}/>
      <WrapperInputBackground getWrapper={getWrapperHtmlElement}/>

      </>
      }
      {['FullName'].includes(editor?.getSelected()?.attributes?.name) && (
        <>{/* whats that for */}</>
      )}
      {['Headline'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <LineHeight getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextTransform getSelectedHtmlElement={getSelectedHtmlElement} />
          <LetterSpacing getSelectedHtmlElement={getSelectedHtmlElement} />
          <TextShadow getSelectedHtmlElement={getSelectedHtmlElement} />
          <IconPicker getSelectedHtmlElement={getSelectedHtmlElement} />
          <Padding getSelectedHtmlElement={getSelectedHtmlElement} />
          <Borders getSelectedHtmlElement={getSelectedHtmlElement} />
          <Borders getSelectedHtmlElement={getSelectedHtmlElement} />
          <RadiusEdge getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderType getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderStyle getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Shadow getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      {['Image'].includes(editor?.getSelected()?.attributes?.name) && 
      <>
      <AlignHorizontal getSelectedHtmlElement={getSelectedHtmlElement}/>
      <RadiusEdge getSelectedHtmlElement={getSelectedHtmlElement}/>
      <Corners getSelectedHtmlElement={getSelectedHtmlElement}/>
      <Borders getSelectedHtmlElement={getSelectedHtmlElement}/>
      <Shadow getSelectedHtmlElement={getSelectedHtmlElement}/>
      <Opacity getSelectedHtmlElement={getSelectedHtmlElement}/>

      </>
      }
      {['Input','DatePicker','FileUpload'].includes(editor?.getSelected()?.attributes?.name) && 
      <>
      <FontWeight getSelectedHtmlElement={getSelectedHtmlElement} />
      <TextAlign getSelectedHtmlElement={getSelectedHtmlElement} />
      <Corners getSelectedHtmlElement={getSelectedHtmlElement} />
      <BackgroundColor getSelectedHtmlElement={getSelectedHtmlElement} />
      <IconPicker getSelectedHtmlElement={getSelectedHtmlElement} />
      <IconColor getSelectedHtmlElement={getSelectedHtmlElement} />
      <IconPosition getSelectedHtmlElement={getSelectedHtmlElement} />
      
      </>
      }
      {['InputTable'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Long Text'].includes(editor?.getSelected()?.attributes?.name) && 
      <>
      
      </>
      }
      {['Membership'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Number'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Page Break'].includes(editor?.getSelected()?.attributes?.name) && (
        <>{/* whats this for */}</>
      )}
      {['Paragraph'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Product List'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['rows'].includes(editor?.getSelected()?.attributes?.name) && 
      <>
      <Corners getSelectedHtmlElement={getSelectedHtmlElement}/>
      <RadiusEdge getSelectedHtmlElement={getSelectedHtmlElement}/>
      <Borders getSelectedHtmlElement={getSelectedHtmlElement}/>
      <BorderType getSelectedHtmlElement={getSelectedHtmlElement}/>
      <BorderStyle getSelectedHtmlElement={getSelectedHtmlElement}/>
      <BorderColor getSelectedHtmlElement={getSelectedHtmlElement}/>
      <Shadow getSelectedHtmlElement={getSelectedHtmlElement}/>
      
      </>
      }
      {['rating'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Section'].includes(editor?.getSelected()?.attributes?.name) && (
        <>
          <Corners getSelectedHtmlElement={getSelectedHtmlElement} />
          <RadiusEdge getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderType getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderStyle getSelectedHtmlElement={getSelectedHtmlElement} />
          <Borders getSelectedHtmlElement={getSelectedHtmlElement} />
          <BorderColor getSelectedHtmlElement={getSelectedHtmlElement} />
          <Shadow getSelectedHtmlElement={getSelectedHtmlElement} />
          <Float getSelectedHtmlElement={getSelectedHtmlElement} />
          <Position getSelectedHtmlElement={getSelectedHtmlElement} />
        </>
      )}
      
      {['Spinner'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Star Rating'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Stipe'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Survey'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Text Area'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Time'].includes(editor?.getSelected()?.attributes?.name) && <></>}
      {['Video'].includes(editor?.getSelected()?.attributes?.name) && <></>}
    </div>
  );
}
