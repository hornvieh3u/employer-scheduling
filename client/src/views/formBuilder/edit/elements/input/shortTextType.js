let ShortTextType = {
    model: {
        defaults: {
            tagName: 'div',
            draggable: '.section-column-child',
            droppable: false,
            attributes: {class: 'short-text element'},
            components: [

                {
                    tagName: 'input',
                    attributes: {
                        type: 'text',
                        name: 'short-text',
                        class: 'short-text-input',
                    },
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
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
            styles: `
                .short-text-input {width: 100%; height: 35px; border-radius: 5px;}
                .short-text {padding: 10px}
            `
        }
    }
}

export default ShortTextType
