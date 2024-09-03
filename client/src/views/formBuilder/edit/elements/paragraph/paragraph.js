const script = function(){

    if(typeof CKEDITOR == 'undefined')
    {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.src = "https://cdn.ckeditor.com/4.19.0/standard/ckeditor.js";
      document.body.appendChild(script);
    }
    else{
        window.$('[data-rte]').each(function(){
            window.CKEDITOR.replace(this);
        })
    }

}

let paragraphType = {
    model: {
        defaults:{
            tagName: 'div',
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'paragraph element'},
            components: [
                {
                    tagName: 'h5',
                    type: 'text',
                    components: '',
                    attributes: {class: 'short-text-label'},
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
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

                /*`
                    <textarea name="par" id="par" rows="10" cols="80" data-rte="1">
                    </textarea>
                `*/
            ],
            styles: `
                .paragraph{ padding: 10px}
            `,
            script
        }
    }
}

export default paragraphType
