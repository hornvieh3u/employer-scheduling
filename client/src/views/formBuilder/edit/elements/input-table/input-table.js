let inputTableType = {
    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: {class: 'input-table'},
            components: [
                {
                    tagName: 'b',
                    type: 'text',
                    components: 'Type a question',
                    attributes: {class: 'input-table-text'}
                },
                {
                    tagName: 'table',
                    attributes: {class: 'table table-bordered'},
                    components:[
                        {
                            tagName: 'thead',
                            components: [
                                {
                                    tagName: 'tr',
                                    components: [
                                        {
                                            tagName: 'th',
                                            components: [
                                                {
                                                    tagName: 'h6',
                                                    type: 'text',
                                                    components: ''
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'th',
                                            components: [
                                                {
                                                    tagName: 'b',
                                                    type: 'text',
                                                    components: 'Not Satisfied'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'th',
                                            components: [
                                                {
                                                    tagName: 'b',
                                                    type: 'text',
                                                    components: 'Somewhat Satisfied'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'th',
                                            components: [
                                                {
                                                    tagName: 'b',
                                                    type: 'text',
                                                    components: 'Satisfied'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'th',
                                            components: [
                                                {
                                                    tagName: 'b',
                                                    type: 'text',
                                                    components: 'Very Satisfied'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagName: 'tbody',
                            components: [
                                {
                                    tagName: 'tr',
                                    components: [
                                        {
                                            tagName: 'th',
                                            components:[
                                                {
                                                    tagName: 'b',
                                                    types: 'text',
                                                    components: [
                                                        'Cleanliness'
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        }
                                    ]
                                },
                                {
                                    tagName: 'tr',
                                    components: [
                                        {
                                            tagName: 'th',
                                            components:[
                                                {
                                                    tagName: 'b',
                                                    types: 'text',
                                                    components: [
                                                        'Responsiveness'
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        }
                                    ]
                                },
                                {
                                    tagName: 'tr',
                                    components: [
                                        {
                                            tagName: 'th',
                                            components:[
                                                {
                                                    tagName: 'b',
                                                    types: 'text',
                                                    components: [
                                                        'Friendliness'
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        },
                                        {
                                            tagName: 'td',
                                            components:`<input type="radio" />`
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            styles: `
                .input-table{ padding: 10px }
            `
        }
    }
}

export default inputTableType