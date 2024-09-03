let timeType = {
    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: {class: 'time'},
            components: [
                {
                    tagName: 'h5',
                    type: 'text',
                    components: 'Time',
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                },
                `<div class="row">
                    <div class="col-4">
                        <input type="text" placeholder="HH : MM" class="form-control"/>
                    </div>
                    <div class="col-2">
                        <select class="form-control">
                            <option> AM </option>
                            <option> PM </option>
                        </select>
                    </div>
                 </div>
                `,
                {
                    tagName: 'div',
                    type: 'text',
                    components: 'Hour Minutes',
                    attributes: {class: 'hour-minutes-sublabel'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                }
            ],
            styles: `
                .time{ padding: 10px}
            `
        }
    }
}

export default timeType
