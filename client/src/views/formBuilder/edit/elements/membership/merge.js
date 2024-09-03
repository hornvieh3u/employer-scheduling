
export const mergeElement=(label ='First name',type,name)=>{
  return {
    model: {
      // Default properties
      defaults: {
        tagName: 'div',
        attributes: {class: 'merge element'},
        draggable: false, // Can be dropped only inside `form` elements
        droppable: false, // Can't drop other elements inside
        components: label,
        styles: ``,
        stylable: [],
      }
    }
  }
}


