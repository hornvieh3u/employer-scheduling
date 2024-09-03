const script = function(){
    window.$(".star-input-1").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','black')
        window.$(".star-input-3").css('color','black')
        window.$(".star-input-4").css('color','black')
        window.$(".star-input-5").css('color','black')
    })

    window.$(".star-input-2").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','orange')
        window.$(".star-input-3").css('color','black')
        window.$(".star-input-4").css('color','black')
        window.$(".star-input-5").css('color','black')
    })
    window.$(".star-input-3").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','orange')
        window.$(".star-input-3").css('color','orange')
        window.$(".star-input-4").css('color','black')
        window.$(".star-input-5").css('color','black')
    })
    window.$(".star-input-4").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','orange')
        window.$(".star-input-3").css('color','orange')
        window.$(".star-input-4").css('color','orange')
        window.$(".star-input-5").css('color','black')
    })
    window.$(".star-input-5").click(function(){
        window.$(".star-input-1").css('color','orange')
        window.$(".star-input-2").css('color','orange')
        window.$(".star-input-3").css('color','orange')
        window.$(".star-input-4").css('color','orange')
        window.$(".star-input-5").css('color','orange')
    })
}

let starRatingType = {
    model: {
        defaults: {
            tagName: 'div',
            attributes: {class: 'star-rating'},
            components:[
                {
                    tagName: 'h5',
                    type: 'text',
                    components: 'Type a question'
                },
                `
                <div class="star-rating-input">
                    <span class="fa fa-star star-input-1"></span>
                    <span class="fa fa-star star-input-2"></span>
                    <span class="fa fa-star star-input-3"></span>
                    <span class="fa fa-star star-input-4"></span>
                    <span class="fa fa-star star-input-5"></span>
                </div>
                `
            ],
            styles: `
                .star-rating{padding: 10px; width: 100%;}
                span {font-size: 30px; color: #000;}
            `,
            script
        }
    }
}

export default starRatingType