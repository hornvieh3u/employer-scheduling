let numberType = {
    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: {class: 'number'},
            components: [
                {
                    tagName: 'div',
                    type: 'text',
                    components: 'Number',
                    attributes: {class: 'number-label'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                },
                {
                    tagName: 'input',
                    attributes: {
                        type: 'number',
                        name: 'number-text',
                        class: 'number-input',
                    },
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                }
            ],
            styles: `
                .number-input {width: 50%; height: 35px; border-radius: 5px;}
                .number {padding: 10px}
            `
        }
    }
}

export default numberType
