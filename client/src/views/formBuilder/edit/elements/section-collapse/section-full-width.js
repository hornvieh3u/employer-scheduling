let sectionFullWidth = {

    model: {
        defaults: {
            tagName: 'div',
            droppable: false,
            attributes: {class: "section-row section-full-width"},
            components: [
                {
                  tagName: 'div',
                  components: [
                    {
                      tagName: 'div',
                      components: [
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
                              attributes: {class: 'fa fa-plus'}
                            }
                          ],
                          hoverable: false,
                          badgable: false,
                          draggable: false,
                          droppable: false,
                          selectable: false,
                          attributes: {}
                        }
                      ],
                      hoverable: false,
                      badgable: false,
                      draggable: false,
                      droppable: false,
                      selectable: false,
                      attributes: {class: 'add-new-column'}
                    }
                  ],
                  hoverable: false,
                  badgable: false,
                  draggable: false,
                  droppable: true,
                  selectable: false,
                  attributes: {class: 'full-container section-row-child'}
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
                  attributes: {class: 'bottom add-new-column'},

                },

            ],
            styles:`
            `
        }
    }

}

export default sectionFullWidth
