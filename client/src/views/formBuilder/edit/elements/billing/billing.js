const billingType =  {
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
            attributes: {class: 'billing element'},
            components: [
                {
                    tagName: 'div',
                    attributes: {class: 'billing-section'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    components: [
                      {
                        tagName: 'div',
                        attributes: {class: 'billing-address'},
                        draggable: false,
                        droppable: false,
                        selectable: false,
                        hoverable: false,
                        components: [
                          {
                            tagName: 'h6',
                            type: 'text',
                            components: 'Full Address*',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                          },
                          {
                            tagName: 'input',
                            attributes: {
                              type: 'text',
                              name: 'address',
                              class: 'billing-input',
                              placeHolder: 'Full Address...'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                          },
                        ]
                      },
                      {
                        tagName: 'div',
                        attributes: {class: 'billing-city'},
                        draggable: false,
                        droppable: false,
                        selectable: false,
                        hoverable: false,
                        components: [
                          {
                            tagName: 'h6',
                            type: 'text',
                            components: 'City Name*',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                          },
                          {
                            tagName: 'input',
                            attributes: {
                              type: 'text',
                              name: 'city',
                              class: 'billing-input',
                              placeHolder: 'City Name...'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                          },
                        ]
                      },
                      {
                        tagName: 'div',
                        attributes: {class: 'billing-country'},
                        draggable: false,
                        droppable: false,
                        selectable: false,
                        hoverable: false,
                        components: [
                          {
                            tagName: 'h6',
                            type: 'text',
                            components: 'Country',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                          },
                          {
                            tagName: 'input',
                            attributes: {
                              type: 'text',
                              name: 'country',
                              class: 'billing-input',
                              placeHolder: 'Select Country'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                          },
                        ]
                      },

                      {
                        tagName: 'div',
                        attributes: {class: 'billing-state-container'},
                        draggable: false,
                        droppable: false,
                        selectable: false,
                        hoverable: false,
                        components: [
                          {
                            tagName: 'div',
                            attributes: {class: 'billing-state'},
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                            components: [
                              {
                                tagName: 'h6',
                                type: 'text',
                                components: 'State / Province*',
                                draggable: false,
                                droppable: false,
                                selectable: false,
                              },
                              {
                                tagName: 'input',
                                attributes: {
                                  type: 'text',
                                  name: 'state',
                                  class: 'billing-input',
                                  placeHolder: 'State/Province...'
                                },
                                draggable: false,
                                droppable: false,
                                selectable: false,
                              },
                            ]
                          },
                          {
                            tagName: 'div',
                            attributes: {class: 'billing-zip'},
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                            components: [
                              {
                                tagName: 'h6',
                                type: 'text',
                                components: 'Zip Code*',
                                draggable: false,
                                droppable: false,
                                selectable: false,
                              },
                              {
                                tagName: 'input',
                                attributes: {
                                  type: 'text',
                                  name: 'zip',
                                  class: 'billing-input',
                                  placeHolder: 'Zip Code...'
                                },
                                draggable: false,
                                droppable: false,
                                selectable: false,
                              },
                            ]
                          }

                        ]
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

            styles: `.billing {padding: 10px;}
                     .billing-text {width: 100%}
                     .billing-input {width: 100%; height: 35px; border-radius: 5px;}
                     .billing-section div {margin-top: 10px;}
                     .billing-state-container {display: flex}
                     .billing-state {width: 60%; margin-right: 10px;}
                     .billing-zip {flex: 1}

            `
          }
        },
    }

export default billingType
