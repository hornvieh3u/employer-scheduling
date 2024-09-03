const script = function(){
    window.$(".scale-input-1").click(function(){
        window.$(".scale-input-1").css('background-color','black').css('color','white')
        window.$(".scale-input-2").css('background-color','white').css('color','black')
        window.$(".scale-input-3").css('background-color','white').css('color','black')
        window.$(".scale-input-4").css('background-color','white').css('color','black')
        window.$(".scale-input-5").css('background-color','white').css('color','black')
    })
    window.$(".scale-input-2").click(function(){
        window.$(".scale-input-1").css('background-color','black').css('color','white')
        window.$(".scale-input-2").css('background-color','black').css('color','white')
        window.$(".scale-input-3").css('background-color','white').css('color','black')
        window.$(".scale-input-4").css('background-color','white').css('color','black')
        window.$(".scale-input-5").css('background-color','white').css('color','black')
    })
    window.$(".scale-input-3").click(function(){
        window.$(".scale-input-1").css('background-color','black').css('color','white')
        window.$(".scale-input-2").css('background-color','black').css('color','white')
        window.$(".scale-input-3").css('background-color','black').css('color','white')
        window.$(".scale-input-4").css('background-color','white').css('color','black')
        window.$(".scale-input-5").css('background-color','white').css('color','black')
    })
    window.$(".scale-input-4").click(function(){
        window.$(".scale-input-1").css('background-color','black').css('color','white')
        window.$(".scale-input-2").css('background-color','black').css('color','white')
        window.$(".scale-input-3").css('background-color','black').css('color','white')
        window.$(".scale-input-4").css('background-color','black').css('color','white')
        window.$(".scale-input-5").css('background-color','white').css('color','black')
    })
    window.$(".scale-input-5").click(function(){
        window.$(".scale-input-1").css('background-color','black').css('color','white')
        window.$(".scale-input-2").css('background-color','black').css('color','white')
        window.$(".scale-input-3").css('background-color','black').css('color','white')
        window.$(".scale-input-4").css('background-color','black').css('color','white')
        window.$(".scale-input-5").css('background-color','black').css('color','white')
    })
}

let scaleRatingType = {
    model: {
        defaults: {
            tagName: 'div',
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'scale-rating element'},
            components:[

                `
                    <div class="rating_scale">
                        <button class="scale scale-input-1"> 1 </button>
                        <button class="scale scale-input-2"> 2 </button>
                        <button class="scale scale-input-3"> 3 </button>
                        <button class="scale scale-input-4"> 4 </button>
                        <button class="scale scale-input-5"> 5 </button>
                    </div>
                `,
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
                    attributes: {class: 'fa fa-plus'},
                  }
                ],
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: {class: 'bottom add-more-element'},

              }
            ],
            styles: `
                .scale-rating{padding: 10px}
                .scale{border-radius: 25px;
                       width: 50px;
                       height: 50px;
                       color: black;
                       text-align: center;
                       font-size: 20px;
                       background-color: white;
                       margin-right: 10px;
                }

            `,
            script
        }
    }
}

export default scaleRatingType
