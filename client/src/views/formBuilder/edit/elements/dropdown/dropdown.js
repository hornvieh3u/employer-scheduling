/*let typeOption = {
    isComponent: el => el.tagName == 'OPTION',

    model: {
      defaults: {
        tagName: 'option',
        layerable: false,
        droppable: false,
        draggable: false,
        hoverable: false,
      },
    },
}*/

const createOption = (value, text) => ({
  tagName: 'option',
  attributes: {value: value},
  components: text,
  layerable: false,
  droppable: false,
  draggable: false,
  selectable: false,
  hoverable: false,
});

let dropDownType = {
    model: {
        defaults: {
            tagName: 'div',
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'drop-down element'},
            components: [
                {
                    tagName: 'select',
                    attributes: {class: 'select-button',},
                    components: [
                        createOption('', '')
                    ],
                    layerable: false,
                    droppable: false,
                    draggable: false,
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
                .drop-down {width: 100%; padding: 10px}
                .select-button {width: 100%; height: 35px;}
                .options-text: {white-space: pre; height: 30px; width: 100%; border-radius: 3px}
            `
        }
    }
}

export default dropDownType;
