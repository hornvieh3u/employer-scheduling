let spinnerType = {
    model: {
        defaults: {
            tagName: 'div',
            attributes: {class: 'spinner'},
            components:[
                {
                    tagName: 'h5',
                    type: 'text',
                    components: 'Type a question'
                },
                `
                <div class="input-group mb-3 spinner-input">
                    <div class="input-group-prepend">
                        <span class="input-group-text">-</span>
                    </div>
                    <input type="number" class="form-control"/>
                    <div class="input-group-append">
                        <span class="input-group-text">+</span>
                    </div>
                </div>
                `,
                {
                    tagname: 'div',
                    type: 'text',
                    components: 'Type a sublabel'
                }
            ],
            styles: `
                .spinner{padding: 10px}
                .spinner-input {width: 50%;}
            `
        }
    }
}

export default spinnerType