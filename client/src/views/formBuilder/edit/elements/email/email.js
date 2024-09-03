const emailType =  {
        // Make the editor understand when to bind `my-input-type`
        //isComponent: el => el.tagName === 'INPUT',
        // Model definition
        model: {
          // Default properties
          defaults: {
            tagName: 'div',
            //draggable: 'form, form *', // Can be dropped only inside `form` elements
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'email element'},
            components: [
                {
                    tagName: 'div',
                    attributes: {class: 'email-section'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    components: [
                      {
                        tagName: 'div',
                        attributes: {class: 'email-section'},
                        draggable: false,
                        droppable: false,
                        selectable: false,
                        hoverable: false,
                        components: [
                          {
                            tagName: 'input',
                            attributes: { class: 'checkbox-button', type: 'checkbox' },
                            lable:'',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                          },
                          {
                            tagName: 'div',
                            type: 'text',
                            attributes: {class: 'checkbox-label '},
                            components: 'I Would Like to Receive an SMS Text Alert Before The Event Starts',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                          },
                        ]
                      },

                        {
                            tagName: 'input',
                            attributes: {
                                type: 'text',
                                name: 'email',
                                class: 'email-input',
                                placeHolder: 'Enter Mobile Phone Here...'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        },
                        {
                            tagName: 'div',
                            type: 'text',
                            components: '(Optional but high recommended) Select Your Country Code and Enter Your Mobile phone ' +
                              'number to Receive a Text Alert Reminder 15 Minutes Before Webinar Starts',
                            attributes: {class: 'email-text'},
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        },
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
            traits: [
                'name',
                'placehoder',
                {
                    type: 'checkbox'
                }
            ],
            styles: `.email {padding: 10px;}
                     .email-text {width: 100%}
                     .email-input {width: 100%; height: 35px; border-radius: 5px;}
                     .multiple-choice {padding: 10px}
                    .checkbox {width: 100%}
                    .checkbox-button { width: 10%; float: left; height: 15px }
            `
          }
        },
    }

export default emailType
