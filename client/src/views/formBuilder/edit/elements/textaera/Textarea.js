let Textarea = {

    model: {
        defaults: {
            tagName: 'div',
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'long-text element'},
            components: [
                {
                    tagName: 'textarea',
                    attributes: {
                        type: 'text',
                        name: 'long-text',
                        class: 'long-text-textarea',
                        placeholder: 'Type a question'
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
                .long-text-textarea {height: 100px; width: 100%; border-radius: 5px}
                .long-text {padding: 10px}
            `
        }
    }

}

export default Textarea;
