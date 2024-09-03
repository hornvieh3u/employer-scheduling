const script = function(){

    if(typeof jQuery == 'undefined')
    {
      console.log('inserting jquery...');
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
      document.body.appendChild(script);
    }else{
        console.log("jquery inserted...")
        window.$(document).ready(function(){
            window.$('#add-field-button').click(function(){
                window.$('.fill-blank-text').append(`<input type="text" placeholder="blanks" />`)
            })
        })
    }

}

let fillBlankType = {

    model: {
        defaults: {
            tagName : 'div',
            droppable: true,
            attributes: {class: 'fill-blank'},
            components: [
                {
                    tagName: 'div',
                    type: 'text',
                    components:  `
                        <div class="fill-blank-input">
                            <div class="add-fill-button">
                                <button id="add-field-button">
                                    Add field
                                </button>
                            </div>
                            <div class="fill-blank-text">
                                This is a fill in the  <input type="text" placeholder="blanks" /> field 
                                Please add appropriate <input type="text" placeholder="blank"/> fields 
                                and text
                            </div>
                        </div>
                    `
                }
            ],
            styles: `
                .fill-blank{padding: 10px}
                #add-fill-button {margin-bottom: 10px;}
                input{border-top-style: none; 
                      border-left-style: none; 
                      border-right-style: none;
                      width: 120px;
                    }
            `,
            script
        }
    }

}

export default fillBlankType