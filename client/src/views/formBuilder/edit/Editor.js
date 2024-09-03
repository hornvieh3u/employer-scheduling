import React, { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { Button } from 'reactstrap';

import 'grapesjs/dist/css/grapes.min.css';
import '../../../assets/scss/form-builder/style.scss';
import '../../../assets/scss/form-builder/main.scss';

import grapesjs from 'grapesjs';
// import gjsBlocksBasic from 'grapesjs-blocks-basic';
// import gjsForms from 'grapesjs-plugin-forms';
import blocksJson from './configuration/blocks';
import { formBuilderPlugin } from './elements/formBuilderPlugin';
import Styles from './styles/Styles';

export default function Editor({
  toggleBlocks,
  isBlocks,
  toggleStyles,
  isStyles,
  toggleLayers,
  isLayers,
  form, // if template exists or edit mode
  device,
  editor,
  setEditor
}) {
  
  const [originContent, setOriginContent] = useState(undefined)
  const [blocks, setBlocks] = useState([])

  //const [val, setVal] = useState("1");

  const handleBlocks = (props) => {
    setBlocks(props.blocks)
    window.dragStart = props.dragStart
    window.dragStop = props.dragStop
  }


  const onDragStart = (block) => {
    window.dragStart(block);
  }

  const onDragStop = () => {
    window.dragStop();
    toggleBlocks(false)
    toggleStyles(false)

  }


  //handle style actions
  const toggleFormSettings = (event, value) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    toggleStyles(value);
  }
  
  const toggleFormProperties = (event, value) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    toggleBlocks(value)
  }
  const openAddElement = () => {
    toggleBlocks(true);
    //setVal("2");
  }

  const toggleButtonAction = (event, value) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    toggleFormProperties({}, false);
    //setOpenButtonAction(value);
    if(value == true) {
      let attributes = editor.getSelected().getChildAt(0).getAttributes();
      if(!attributes.selectedOption) {
        setButtonAction(4);
      }
    }
  }
  

  //end of setting actions

  useEffect(() => {
    const gjsEditor = grapesjs.init({
      container: '#editor',
      plugins: [(editor) => formBuilderPlugin(editor)],
      //   pluginsOpts: {
      //     gjsBlocksBasic: {},
      //     gjsForms: {}
      //   },
      canvas: {
        styles: [
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
          'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
          'https://unpkg.com/dropzone@5/dist/min/dropzone.min.css',
          '/assets/form-builder/grapes-form.css'
        ],
        scripts: [
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.5/umd/popper.min.js',
          //'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/js/mdb.min.js',
          'https://unpkg.com/dropzone@5/dist/min/dropzone.min.js',
          'https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js',
          'https://cdn.ckeditor.com/4.19.0/standard/ckeditor.js',
          'https://js.stripe.com/v3/'
        ]
      },
      blockManager: {
        custom: true,
        blocks: blocksJson,
        appendTo: '#blocks'
      },
      // styleManager: {
      //   appendTo: '#styles'
      // },
      layerManager: {
        appendTo: '#layers'
      },
      deviceManager: {
        default: 'desktop',
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: ''
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '770px',
            widthMedia: '992px'
          },
          {
            id: 'mobileLandscape',
            name: 'Mobile landscape',
            width: '568px',
            widthMedia: '768px'
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '480px'
          }
        ]
      },
      panels: {
        defaults: []
      },
      //storageManager: {},
      commands: {
        defaults: [{}]
      }
    });

    //use template or edit mode
    if (form && form.formData) {
      let formData = JSON.parse(form.formData)
      if (formData['gjs-components'].replace(/^"|"$/g, "").length > 0) {
        let component = JSON.parse(formData['gjs-components'].replace(/^"|"$/g, ""));
        if(component.length == 0) {
          component = {
            type: 'section-full-width',
          }
          gjsEditor.setComponents(component);
        } else {
          gjsEditor.setComponents(component);
        }
        setOriginContent(component);

      }

      if (formData['gjs-styles'].replace(/^"|"$/g, "").length > 0) {
        gjsEditor.setStyle(JSON.parse(formData['gjs-styles'].replace(/^"|"$/g, "")))
      }
    } else {
      gjsEditor.setComponents({
        type: 'section-full-width'
      });
    }

    //gjsEditor.runCommand('visibility');

    //responsive view buttons
    gjsEditor.Commands.add('set-device-desktop', (editor) => {
      editor.setDevice('desktop');
    });
    gjsEditor.Commands.add('set-device-tablet', (editor) => {
      editor.setDevice('tablet');
    });
    gjsEditor.Commands.add('set-device-mobile', (editor) => {
      editor.setDevice('mobilePortrait');
    });
    


    var dragCategory = '';
    var dragLastX = 0;
    var dragLastY = 0;
    var dragName = '';
    var dragPosition = 0;
    gjsEditor.on('block:drag:start', function(model) {
      dragCategory = model.attributes.category;
      dragName = model.attributes.label;
    });

    const mergeSpanStr = '<span style="color: green; font-size: ' + "32px" + '"> I </span>';
    gjsEditor.on('canvas:dragend', function(model) {
      console.log("model",model.target.classList)
      if(model.target.classList.contains('fillable') && dragCategory === 'Merge Block') {
        let id = model.target.id;
        let rect = model.target.getBoundingClientRect();
        let element = editor.DomComponents.getWrapper().find('#' + id)[0];
        let content = model.target.innerHTML;
        dragLastX = model.pageX - rect.x;
        dragLastY = model.pageY - rect.y;
        dragPosition = getPosition(dragLastX, dragLastY, model.target, content);
        content = content.replace(mergeSpanStr, '');
        let newContent = content.slice(0, dragPosition)
          + ` {${dragName}} `
          + content.slice(dragPosition);
        model.target.innerHTML = newContent;
        element.components(newContent);
        document.body.removeChild(document.getElementById('input-textarea-caret-position-mirror-div'));
        //element.set({content: newContent})
      }
    });

    gjsEditor.on('canvas:dragover', function(model) {
      if(model.target.classList.contains('fillable') && dragCategory === 'Merge Block') {
        let rect = model.target.getBoundingClientRect();
        let content = model.target.innerHTML;
        let x = model.pageX - rect.x;
        let y = model.pageY - rect.y;

        content = content.replace(mergeSpanStr, '');

        dragPosition = getPosition(x, y, model.target, content);
        let newContent = content.slice(0, dragPosition)
          + mergeSpanStr
          + content.slice(dragPosition);
        model.target.innerHTML = newContent;
        //element.set({content: newContent})
      }
    });

    gjsEditor.on('component:hovered', model => {
      if (model && model.getEl()) {
        if (!gjsEditor.getSelected()) {
          gjsEditor.select(model);
        } else if (gjsEditor.getSelected().getId() !== model.getId()) {
          gjsEditor.select(model);
        }
      }
    });

    const settingId = 'setting';
    const htmlLabel = `<svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16"> <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" fill="white"></path> <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" fill="white"></path> </svg> `;
    gjsEditor.on('component:selected', () => {
      const selectedComponent = gjsEditor.getSelected();
      const defaultToolbar = selectedComponent.get('toolbar');

      const container = gjsEditor.getContainer();
      const componentType = selectedComponent.attributes.type;
      let category = 'Form';
      blocksJson.forEach(block => {
        if (block.id == componentType) {
          category = block.category;
        }
      });
      if(category == 'Member') {
        category = 'Form';
      }
      container.className = "gjs-editor-cont " + category + " " + category + "-selected";

      // check if this command already exists on this component toolbar
      const commandExists = defaultToolbar.some(item => item.id === settingId);

      // if it doesn't already exist, add it
      if (!commandExists) {
        selectedComponent.set({
          toolbar: [...defaultToolbar, {
            id: settingId,
            command: function () {
              toggleStyles(true);
            },
            label: htmlLabel
          }]
        });
      }


    });

    gjsEditor.on('component:add', model => {
      if (!model.parent() || !model.parent().view) {
        return;
      }
      const element = model.parent().view.el;
      if (element && element.classList) {
        if (element.classList.contains('section-row-child')) {
          if (element.children.length > 1) {
            element.classList.add('non-empty');
          }
        }

        if (element.classList.contains('section-column-child')) {
          if (element.children.length > 1) {
            element.classList.add('non-empty');
          }
        }

        //element.classList.remove("non-empty");
      }

    })
    gjsEditor.on('component:create', model => {
      let components = localStorage.getItem("gjs-components")
      if(originContent && components !== originContent) {
        setContentChange(true);
      }
    })

    gjsEditor.on('component:update', model => {
      let components = localStorage.getItem("gjs-components")
      if(originContent && components != originContent) {
        setContentChange(true);
      }
    })
    gjsEditor.on('component:remove', model => {
      let components = localStorage.getItem("gjs-components")
      if(originContent && components != originContent) {
        setContentChange(true);
      }
    })
    gjsEditor.on(`component:mount`, model => {
      const element = model.view.el;
      if (element && typeof element.getElementsByClassName === 'function') {
        const children = element.children;
        for (const child of children) {
          if (child.classList.contains('add-new-column')) {
            child.addEventListener("click", (e) => {
              //openAddColumn();
              openAddElement()
            })
          } else if (child.classList.contains('add-new-element')) {
            child.addEventListener("click", (e) => {
              openAddElement()
            })
          } else if (child.classList.contains('add-more-element')) {
            child.addEventListener("click", (e) => {
              openAddElement()
            })
          } else {
            var clickCount = 0;
            child.addEventListener("click", (e) => {

              if (e.target !== e.currentTarget) return;
              toggleFormProperties({}, true)
              toggleFormSettings({}, false)
              toggleButtonAction({}, false)


              clickCount ++;
              let inputTagList = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'INPUT', 'TEXTAREA'];
              //if(!inputTagList.includes(e.target.nodeName)) {

              //}
              // if (clickCount == 1) {
              //   setTimeout(function(){
              //     if(clickCount == 1) {
              //       setOpenFormProperties(true);
              //     }
              //     clickCount = 0;
              //   },  300);
              // }


              //
            })
          }
        }
      }

      if (element && element.classList) {
        if (element.classList.contains('section-row-child')) {
          if (element.children.length > 1) {
            element.classList.add('non-empty');
          }
        }
        let children = element.children;
        if (children) {
          for (const child of children) {
            if (child.classList.contains('section-column-child')) {
              if (child.children.length > 1) {
                child.classList.add('non-empty');
              }
            }
          }
        }
      }
    });
    gjsEditor.on('storage:load', (obj) => {
      //editor.render()
    })
    setEditor(gjsEditor);
    //** clear editor -- remove before publish------------------------------------------ */
    // gjsEditor.DomComponents.clear(); // Clear components
    // gjsEditor.CssComposer.clear(); // Clear styles
    // gjsEditor.UndoManager.clear(); // Clear undo history
    // gjsEditor.setComponents([]); // Add components
    // gjsEditor.setStyle([]); // Add rules
    //setEditor(gjsEditor);
    return () => {
      gjsEditor.off('block:custom', handleBlocks)
    };
  }, [form]);

  //set device
  useEffect(() => {
    
    if (editor !== null) {
      
      switch (device) {
        case 'desktop':
          editor.runCommand('set-device-desktop');
          break;
        case 'tablet':
          editor.runCommand('set-device-tablet');
          break;
        case 'mobile':
          editor.runCommand('set-device-mobile');
          break;
        default:
          editor.runCommand('set-device-desktop');
          break;
      }
    }
  }, [device]);

  return (
    <>
      <div className="w-100 border">
        <div id="editor"></div>
      </div>
      {/* Components container - left */}
      <div
        className="container p-1 bg-light border-end shadow"
        style={{
          display: `${isBlocks ? 'block' : 'none'}`,
          width: '250px',
          position: 'fixed',
          top: '6.5vh',
          zIndex: '1050',
          height: '100vh',
          overflowY: 'auto',
          transition: 'transform 0.3 ease-in-out'
        }}
      >
        <div>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <h6 className="my-auto">Blocks</h6>
              <Button onClick={()=>toggleBlocks(!isBlocks)} color="link p-0">
                <X />
              </Button>
            </div>
            <hr />
          </div>
          <div id="blocks"></div>
        </div>
      </div>

      {/* Properties Container - Styles */}
      <div
        className="container p-1 bg-light border-end shadow"
        style={{
          display: `${isStyles ? 'block' : 'none'}`,
          width: '250px',
          position: 'fixed',
          top: '6.5vh',
          zIndex: '1050',
          height: '100vh',
          overflowY: 'auto',
          transition: 'transform 0.3 ease-in-out',
          right: '0px'
        }}
      >
        <div>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <h6 className="my-auto">Styles</h6>
              <Button onClick={()=>toggleStyles(!isStyles)} color="link p-0">
                <X />
              </Button>
            </div>
            <hr />
          </div>
          {/* <div id="styles"></div> */}
          <Styles editor={editor} />
        </div>
      </div>

      {/* Properties Container - Layers */}
      <div
        className="container p-1 bg-light border-end shadow"
        style={{
          display: `${isLayers ? 'block' : 'none'}`,
          width: '250px',
          position: 'fixed',
          top: '0px',
          zIndex: '1050',
          height: '100vh',
          overflowY: 'auto',
          transition: 'transform 0.3 ease-in-out',
          right: '0px'
        }}
      >
        <div>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <h6 className="my-auto">Layers</h6>
              <Button onClick={toggleLayers} color="link p-0">
                <X />
              </Button>
            </div>
            <hr />
          </div>
          <div id="layers"></div>
        </div>
      </div>
    </>
  );
}
