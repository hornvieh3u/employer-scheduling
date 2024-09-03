let datePickerType = {
    model: {
        defaults: {
            tagName: 'div',
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'datepicker'},
            components: [
                {
                    tagName: 'h6',
                    type: 'text',
                    attributes: {class : 'datepicker-label'},
                    components: 'Date',
					          draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                },
                `<div class="datepicker-input">
                    <input id="startDate" class="form-control" type="date" />
                    <span id="startDateSelected"></span>
                </div>`,
                {
                    tagName: 'div',
                    type: 'text',
                    attributes: {class : 'datepicker-label'},
                    components: 'date',
					          draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                }
            ],
            styles:`
                .datepicker {padding: 10px}
                .datepicker-input {width: 50%;}
            `
        }
    }
}

export default datePickerType
