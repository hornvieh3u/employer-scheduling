const script = function(){

}

let shortTextType = {
    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: {class: 'short-text'},
            components: [
                {
                    tagName: 'h5',
                    type: 'text',
                    components: 'Type a question',
                    attributes: {class: 'short-text-label'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                },
                {
                    tagName: 'input',
                    attributes: {
                        type: 'text',
                        name: 'short-text',
                        class: 'short-text-input',
                    },
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                },
                {
                    tagName: 'div',
                    type: 'text',
                    components: 'Type a sublabel',
                    attributes: {class: 'short-text-sublabel'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                }
            ],
            styles: `
                .short-text-input {width: 50%; height: 35px; border-radius: 5px;}
                .short-text {padding: 10px}
            `
        }
    }
}

export default shortTextType
