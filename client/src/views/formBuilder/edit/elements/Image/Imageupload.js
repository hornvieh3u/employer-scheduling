let Imageupload = {

  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child', // Can be dropped only inside `form` elements
      droppable: false, // Can't drop other elements inside
      attributes: {
        class: 'image-container element'
      },
      components: [
        {
          tagName: 'img',
          components: '',
          draggable: false,
          droppable: false,
          selectable: false,
          hoverable: false,
          attributes: {class: '', alt: 'Demo Image', src: '/images/team-member-1.svg'}
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
      styles: ``,
    }
  }

}

export default Imageupload
