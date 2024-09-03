const onClick = function(){

}

let submitType = {
  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child', // Can be dropped only inside `form` elements
      droppable: false, // Can't drop other elements inside
      attributes: {class: 'submit element'},
      components: [
        {
          tagName: 'button',
          attributes: {class: 'btn-submit', type: 'submit'},
          type: 'submit',
          components: [
            {
              tagName: 'span',
              content: 'Submit',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: {class: 'button-text'},
            },
            {
              tagName: 'span',
              content: '',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: {class: 'button-subtext'},
            }
          ],
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
                .submit { display: flex; justify-content: center; padding: 10px; }

            `,
      script: onClick
    }
  }
}

export default submitType
