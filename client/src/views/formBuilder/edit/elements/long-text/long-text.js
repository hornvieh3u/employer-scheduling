let longTextType = {

    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: {class: 'long-text'},
            components: [
                {
                    tagName: 'h4',
                    type: 'text',
                    components: 'Type a question',
                    attributes: {class: 'long-text-label'},
					draggable: false,
                    droppable: false,
                    selectable: false,
                },
                {
                    tagName: 'textarea',
                    attributes: {
                        type: 'text',
                        name: 'long-text',
                        class: 'long-text-textarea',
                        placeholder: 'Type a question'
                    },
					draggable: false,
                    droppable: false,
                    selectable: false,
                },
                {
                    tagName: 'div',
                    type: 'text',
                    components: 'Type a sublabel',
                    attributes: {class: 'long-text-sublabel'},
					draggable: false,
                    droppable: false,
                    selectable: false,
                }
            ],
            styles: `
                .long-text-textarea {height: 200px; width: 100%; border-radius: 5px}
                .long-text {padding: 10px}
            `
        }
    }

}

export default longTextType;