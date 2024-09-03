
const createBullet = (title, content) => ({
  tagName: 'li',
  components: [
    {
      tagName: 'i',
      components: '',
      hoverable: false,
      badgable: false,
      draggable: false,
      droppable: false,
      selectable: false,
      attributes: { class: 'fa fa-check' }
    },
    {
      tagName: 'b',
      content: ' ' + title + ' ',
      type: 'text',
      hoverable: false,
      badgable: false,
      draggable: false,
      droppable: false,
      selectable: false,
      attributes: { class: 'bullet-list-content' }
    },
    {
      tagName: 'span',
      content: content,
      type: 'text',
      hoverable: false,
      badgable: false,
      draggable: false,
      droppable: false,
      selectable: false,
      attributes: { class: 'bullet-list-content' }
    }
  ],
  layerable: false,
  droppable: false,
  draggable: false,
  selectable: false,
  hoverable: false,
});
let bulletType = {
  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child',
      droppable: false,
      attributes: { class: 'bullet-element element' },
      components: [
        {
          tagName: 'ul',
          attributes: { class: 'bullet-container' },
          layerable: false,
          droppable: false,
          draggable: false,
          selectable: false,
          hoverable: false,
          components: [
            createBullet('title', 'content')
          ]
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
              attributes: { class: 'fa fa-plus' },
            },
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'bottom add-more-element' },

        }
      ],
      styles: `.bullet-container {list-style: none; display: flex; flex-direction: column}

            `
    }
  },
  view: {
    events: {
      keydown: 'handleKeyDown'
    },
    handleKeyDown(e) {
      let parentUL = this.model.getChildAt(0);
      if (e.keyCode == 13) {
        e.preventDefault();
        parentUL.append(createBullet('title', 'content'));
   
        if(parentUL.view.el.className.includes('order')) {
          let childModels = parentUL.attributes.components.models;
          for (var i = 0; i < childModels.length; i++) {
            let subChildModels = childModels[i].attributes.components.models;
            for (var j = 0; j < subChildModels.length; j++) {
              if(subChildModels[j].attributes.tagName == 'i') {
                subChildModels[j].setClass('fa fa-' + (i + 1));
              }
            }
          }
        }

        return false;
      } else if (e.keyCode == 8) {
        if (e.target.innerText.length <= 1) {
          if (parentUL.attributes.components.length > 1) {
            let id = e.target.parentElement.id;
            let childModels = parentUL.attributes.components.models;
            let isExist = false;
            for (var i = 0; i < childModels.length; i++) {
              if (childModels[i].view.el.id == id) {
                parentUL.getChildAt(i).remove();
                isExist = true;
              }
            }
            if(isExist) {
              if(parentUL.view.el.className.includes('order')) {
                childModels = parentUL.attributes.components.models;
                for (var i = 0; i < childModels.length; i++) {
                  let subChildModels = childModels[i].attributes.components.models;
                  for (var j = 0; j < subChildModels.length; j++) {
                    if(subChildModels[j].attributes.tagName == 'i') {
                      subChildModels[j].setClass('fa fa-' + (i + 1));
                    }
                  }
                }
              }

              return false;
            }

          }


        }

      }
      return true;

    }
  }
}

export default bulletType
