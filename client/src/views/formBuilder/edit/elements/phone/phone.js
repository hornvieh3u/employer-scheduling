let phoneType = {
    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: {class: 'phone'},
            components: [
                {
                    tagName: 'h5',
                    type: 'text',
                    components: 'Phone Number',
                    attributes: {class: 'phone-number-text'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                },
                {
                    tagName: 'input',
                    attributes: {
                        type: 'text',
                        name: 'phonenumber',
                        class: 'phone-number-input',
                        placeholder: '(000) 000-0000'
                    },
                    draggable: false,
                    droppable: false,
                    selectable: false,
                },
                {
                    tagName: 'div',
                    type: 'text',
                    components: 'Please enter a valid phone number.',
                    draggable: false,
                    droppable: false,
                    selectable: false,
                }
            ],
            styles: `
                .phone-number-input {width: 40%; height: 35px; border-radius: 5px;}
                .phone {padding: 10px}
            `
        }
    }
}

export default phoneType
