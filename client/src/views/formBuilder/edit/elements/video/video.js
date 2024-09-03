let Video = {

  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child', // Can be dropped only inside `form` elements
      droppable: true, // Can't drop other elements inside
      attributes: {
        class: 'video-element',
        type: 'video'
      }
      ,
      components: [
        {
          tagName: 'video',
          components: '',
          draggable: false,
          droppable: false,
          selectable: false,
          hoverable: false,
          attributes: {class: '', src:'/images/video2.webm', controls: true}
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

export default Video
