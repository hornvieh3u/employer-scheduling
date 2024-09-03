const createOption = (value, isHidden) => ({
  tagName: 'div',
  attributes: {type: value, hidden: isHidden},
  content: '<p class="count-down-title">00</p><p class="count-down-label">' + value + '</p>',
  layerable: false,
  droppable: false,
  draggable: false,
  selectable: false,
  hoverable: false,
});
let countdown = {
    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: { class: 'count-down element' },
            components: [
              {
                tagName: 'ul',
                attributes: {class: '',},
                components: [
                  createOption('YEARS', true),
                  createOption('MONTH', true),
                  createOption('WEEKS', true),
                  createOption('DAYS', true),
                  createOption('HOURS', false),
                  createOption('MINUTES', false),
                  createOption('SECONDS', false),
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
            ul {
                margin-top: 15px;
                list-style: none;
                display:flex;
                justify-content: center;
                column-gap: 50px;

            }

              `,
        }
    }
}

export default countdown

