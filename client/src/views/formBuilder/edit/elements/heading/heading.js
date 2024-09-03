let headingType = {
    model: {
        // Default properties
        defaults: {
          tagName: 'div',
          attributes: {class: 'heading element'},
          draggable: '.section-column-child', // Can be dropped only inside `form` elements
          droppable: false, // Can't drop other elements inside
          components: [
              {
                  tagName: 'h3',
                  type: 'text',
                  components: 'Heading',
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  hoverable: false,
                  attributes: {class: ''}
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
                .heading {padding: 10px;}
                .heading h3 {text-align: left}
          `,
          stylable: ['heading-1','heading-2','font-size','align-content'],
        }
      }
}

export default headingType;
