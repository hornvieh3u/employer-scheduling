let multipleChoiceType = {
    model: {
        defaults: {
            tagName: 'div',
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: { class: 'multiple-choice element', type: "checkbox" },
            components: [
                {
                    tagName: 'div',
                    attribute: { class: 'checkbox' },
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    components: [
                        {
                            tagName: 'input',
                            attributes: { class: 'checkbox-button', type: 'checkbox' },
                            lable:'',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                            hoverable: false,
                        },
                        {
                            tagName: 'div',
                            type: 'text',
                            attributes: {class: 'checkbox-label fillable'},
                            components: 'This is a checkbox headline element',
                            draggable: false,
                            droppable: true,
                            selectable: false,
                            hoverable: false,
                        }
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
                        }
                    ],
                    hoverable: false,
                    badgable: false,
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    attributes: { class: 'bottom add-more-element' },

                }

            ],
            styles: `
                .multiple-choice {padding: 10px}
                .checkbox {width: 100%}
                .checkbox-button { width: 10%; float: left; height: 15px }
            `
        }
    }

}

export default multipleChoiceType
