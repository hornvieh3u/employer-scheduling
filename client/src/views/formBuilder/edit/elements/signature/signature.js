const script = function(){

    const initLib = function(){
        /* const el = this;
        const canvas = document.getElementById("signature-pad");
        const signaturePad = new SignaturePad(canvas);
        signaturePad.minWidth = 5;
        signaturePad.maxWidth = 10;
        signaturePad.penColor = "rgb(66, 133, 244)";
        //someExtLib(el, {});*/
    };

    if (typeof SignaturePad == 'undefined') {
        const script = document.createElement('script');
        script.onload = initLib;
        script.src = 'https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js';
        document.body.appendChild(script);
    } else {
        const canvas = document.getElementById("signature-pad");
        function resizeCanvas() {
          // When zoomed out to less than 100%, for some very strange reason,
          // some browsers report devicePixelRatio as less than 1
          // and only part of the canvas is cleared then.
          var ratio =  1;
          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = canvas.offsetHeight * ratio;
          canvas.getContext("2d").scale(ratio, ratio);
        }

        const signaturePad = new window.SignaturePad(canvas);
        signaturePad.minWidth = 1;
        signaturePad.maxWidth = 1;
        signaturePad.penColor = "rgb(0, 0, 0)";

        canvas.onresize = resizeCanvas;
        resizeCanvas()

    }

}

let signatureType = {

    model: {
        defaults: {
            tagName: 'div',
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'signature element'},
            components: [
                {
                    tagName: 'canvas',
                    attributes: {
                        class: 'signature-text',
                        type: 'text',
                        id: 'signature-pad'
                    },
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    components: 'Signature'
                },
              {
                tagName: 'h5',
                content: 'Sign content',
                draggable: false,
                droppable: true,
                selectable: false,
                hoverable: false,
                attributes: {class: 'fillable'}
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
            ],
            script: script,
        }
    }

}

export default signatureType;
