const script = function(){

}

let stripeType = {

    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: {class: 'stripe'},
            components: [
                
                `<hr/>`,
                {
                    tagName: 'h4',
                    type: 'text',
                    components: 'Credit Card Details',
                    draggable: false,
                    droppable: false,
                    selectable: false,
                },
                {
                    tagName: 'div',
                    attributes: {class: 'fullname'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    components: [
                        {
                            tagName: 'input',
                            type: 'text',
                            attributes: {
                                class: 'first-name-input'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                        },
                        {
                            tagName: 'input',
                            type: 'text',
                            attributes: {
                                class: 'last-name-input'
                            },
                            draggable: false,
                            droppable: false,
                             selectable: false,
                        }
                    ]
                },
                {
                    tagName: 'div',
                    attributes: {class: 'fullname-label'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    components: [
                        {
                            tagName: 'div',
                            type: 'text',
                            attributes: {
                                class: 'first-name-label'
                            },
                            components: 'First Name',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                        },
                        {
                            tagName: 'div',
                            type: 'text',
                            attributes: {
                                class: 'last-name-label'
                            },
                            components: 'Last Name',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                        }
                    ]
                },
                {
                    tagName: 'div',
                    attributes: {class: 'card-number-cvv'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    components: [
                        {
                            tagName: 'input',
                            type: 'text',
                            attributes: {
                                class: 'card-number-input',
                                placeholder: 'XXXX XXXX XXXX XXX'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                        },
                        {
                            tagName: 'input',
                            type: 'number',
                            attributes: {
                                class: 'card-cvv-input',
                                placeholder: 'CVV'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                        }
                    ]
                },
                {
                    tagName: 'div',
                    attributes: {class: 'card-number-cvv-label'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    components: [
                        {
                            tagName: 'div',
                            type: 'text',
                            attributes: {
                                class: 'card-number-label'
                            },
                            components: 'Credit Card Number',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                        },
                        {
                            tagName: 'div',
                            type: 'text',
                            attributes: {
                                class: 'cvv-label'
                            },
                            components: 'CVV',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                        }
                    ]
                },
                {
                    tagName: 'div',
                    attributes: {class: 'card-expiration'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    components: [
                        {
                            tagName: 'input',
                            type: 'text',
                            attributes: {
                                class: 'card-expiration-input',
                                placeholder: 'MM / YY'
                            },
                            draggable: false,
                            droppable: false,
                            selectable: false,
                        }
                    ]
                },
                {
                    tagName: 'div',
                    attributes: {class: 'card-exp-label'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    components: [
                        {
                            tagName: 'div',
                            type: 'text',
                            attributes: {
                                class: 'card-expiration-label'
                            },
                            components: 'Card Expiration',
                            draggable: false,
                            droppable: false,
                            selectable: false,
                        }
                    ]
                }

            ],
            script,
            styles: `
                .stripe {padding: 10px}
                .add-product-button {height: 35px; color: #fff; width: 100%; background-color: #0f0;border-radius: 5px;}        
                
                .fullname {width: 100%;}
                .first-name-input {width: 47.5%; margin-right: 5%; height: 35px; border-radius: 5px;}
                .last-name-input {width: 47.5%; height: 35px; border-radius: 5px;}
                .fullname-label {width: 100%; margin-bottom: 25px;}
                .first-name-label {width: 47.5%; margin-right: 5%; float: left;}
                .last-name-label {width: 47.5%; float: left;}

                .card-number-cvv{width: 100%;}
                .card-number-input {width: 47.5%; margin-right: 5%; height: 35px; border-radius: 5px;}
                .card-cvv-input {width: 47.5%; height: 35px; border-radius: 5px;}
                .card-number-cvv-label {width: 100%; margin-bottom: 10px;}
                .card-number-label {width: 47.5%; margin-right: 5%; float: left;}
                .card-cvv-label {width: 47.5%; float: left;}

                .card-expiration{width: 100%;}
                .card-expiration-input {width: 47.5%; margin-right: 5%; height: 35px; border-radius: 5px;}
                .card-exp-label {width: 100%;}
                .card-expiration-label {width: 47.5%; margin-right: 5%; float: left;}
            
            `
        }
    }

}

export default stripeType;