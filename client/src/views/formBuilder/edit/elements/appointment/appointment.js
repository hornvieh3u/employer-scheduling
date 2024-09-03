let appointmentType = {
    model: {
        defaults: {
            tagName: 'div',
            droppable: true,
            attributes: {class: 'appointment'},
            components:[
                {
                    tagName: 'h5',
                    type: 'text',
                    components: 'Appointment'
                },
                `
                        <div class="row">
                            <div class="col-md-6 offset-md-3 border p-4 shadow bg-light">
                                <form action="">
                                    <div class="row g-3">
                                        <div class="col-6">
                                            <input type="text" class="form-control" placeholder="First Name">
                                        </div>
                                        <div class="col-6">
                                            <input type="text" class="form-control" placeholder="Last Name">
                                        </div>
                                        <div class="col-6">
                                            <input type="tel" class="form-control" placeholder="Phone Number">
                                        </div>
                                        <div class="col-6">
                                            <input type="email" class="form-control" placeholder="Enter Email">
                                        </div>
                                        <div class="col-6">
                                            <input type="date" class="form-control" placeholder="Enter Date">
                                        </div>
                                        <div class="col-6">
                                            <input type="time" class="form-control" placeholder="Enter Email">
                                        </div>
                                        <div class="col-12">
                                            <input type="text" class="form-control" placeholder="Purpose of appointment">
                                        </div>
                                        <div class="col-12">
                                            <textarea class="form-control" placeholder="Message"></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                `
            ],
            styles: `
                appointment{ padding: 10px}
            `
        }
    }
}

export default appointmentType