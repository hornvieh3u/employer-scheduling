const fullNameType =  {
        // Make the editor understand when to bind `my-input-type`
        //isComponent: el => el.tagName === 'INPUT',
        // Model definition
        model: {
          // Default properties
          defaults: {
            tagName: 'div',
            //draggable: '', // Can be dropped only inside `form` elements
            droppable: true, // Can't drop other elements inside
            attributes: {class: 'full-name element'},
            components: [
                {
                    tagName: 'h5',
                    type: 'text',
                    components: 'Name',
                    attributes: {class: 'name-text'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                },
                {
                    tagName: 'div',
                    attributes: {class: 'name-input'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    components: [

                        {
                            tagName: 'input',
                            attributes: {
                                type: 'text',
                                name: 'firstname',
                                class: 'first-name-input'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        },
                        {
                            tagName: 'input',
                            attributes: {
                                type: 'text',
                                name: 'lastname',
                                class: 'last-name-input'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        }

                    ]
                },
                {
                    tagName: 'div',
                    attributes: {class: 'name-text'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    components: [
                        {
                            tagName: 'div',
                            type: 'text',
                            components: 'first name',
                            attributes: {class: 'first-name-text'},
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        },
                        {
                            tagName: 'div',
                            type: 'text',
                            components: 'last name',
                            attributes: {class: 'last-name-text'},
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        }
                    ],
                },
              {
                tagName: 'div',
                components: [
                  {
                    tagName: 'i',
                    components: '',
                    hoverable: false,
                    badgable: false,
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    attributes: {class: 'fa fa-plus'},
                  }
                ],
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: {class: 'bottom add-more-element'},

              }

            ],
            styles: `.full-name {padding: 10px}
                     .name-text {width: 100%}
                     .first-name-text {width: 47.5%; float: left; margin-right: 5%;}
                     .last-name-text  {width: 47.5%; float: left}
                     .name-input {width: 100%}
                     .first-name-input {width: 47.5%; margin-right: 5%; height: 35px; border-radius: 3px;}
                     .last-name-input  {width: 47.5%; height: 35px; border-radius: 3px;}
            `
          }
        }
}

export default fullNameType;
