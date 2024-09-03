let singleChoiceType = {
    model:{
        defaults :{
            tagName: 'div',
            droppable: true,
            attributes: {class: 'single-choice'},
            components: [
                {
                    tagName: 'h4',
                    type: 'text',
                    components: 'Type a question',
                    attributes: {class: 'single-choice-question'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                },
                {
                    tagName: 'div',
                    attribute: {class: 'single-choice-option'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    components: [
                        {
                            tagName: 'input',
                            attributes: {class: 'single-choice-radio', type: 'radio'},
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        },
                        {
                            tagName: 'label',
                            type: 'text',
                            attributes: {class: 'single-choice-label'},
                            components: 'Type Option 1',
                            draggable: false,
                            droppable: false,
                            selectable: false
                        }
                    ]
                },
                {
                    tagName: 'div',
                    attribute: {class: 'single-choice-option'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    components: [
                        {
                            tagName: 'input',
                            attributes: {class: 'single-choice-radio', type: 'radio'},
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        },
                        {
                            tagName: 'label',
                            type: 'text',
                            attributes: {class: 'single-choice-label'},
                            components: 'Type Option 2',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        }
                    ]
                }
            ],
            styles: `
                .single-choice { padding: 10px }
                .single-choice-option { width: 100%;}
                .single-choice-radio { width: 10%; }
                .single-choice-label {width: 90%;}
            `
        }
    }
}

export default singleChoiceType
