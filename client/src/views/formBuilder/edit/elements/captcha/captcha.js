const script = function () {
    if(typeof jQuery === 'undefined')
    {
     
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
      document.body.appendChild(script);
    }else{
       
        //let IsAllowed = false;
        let cd;
        CreateCaptcha();
        function CreateCaptcha() {
            var alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                              
            var i;
            var a;
            var b;
            var c;
            var d;
            var e;
            var f;
            for (i = 0; i < 6; i++) {
              a = alpha[Math.floor(Math.random() * alpha.length)];
              b = alpha[Math.floor(Math.random() * alpha.length)];
              c = alpha[Math.floor(Math.random() * alpha.length)];
              d = alpha[Math.floor(Math.random() * alpha.length)];
              e = alpha[Math.floor(Math.random() * alpha.length)];
              f = alpha[Math.floor(Math.random() * alpha.length)];
            }
            cd = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f;
            
            window.$('#CaptchaImageCode').empty().append('<canvas id="CapCode" class="capcode" width="300" height="80"></canvas>')
            
            var ct = document.getElementById("CapCode"),
                ctx=ct.getContext("2d"),
                x = ct.width / 2,
                img = new Image();
           
            img.src = "https://webdevtrick.com/wp-content/uploads/captchaback.jpg";
            img.onload = function () {
                var pattern = ctx.createPattern(img, "repeat");
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, c.width, c.height);
                ctx.font="46px Roboto Slab";
                ctx.fillStyle = '#212121';
                ctx.textAlign = 'center';
                ctx.setTransform (1, -0.12, 0, 1, 0, 15);
                ctx.fillText(cd,x,55);
            };
          }
           
          // Validate Captcha
          function ValidateCaptcha() {
            var string1 = removeSpaces(cd);
            var string2 = removeSpaces(window.$('#UserCaptchaCode').val());
            if (string1 === string2) {
              return true;
            }
            else {
              return false;
            }
          }
           
          // Remove Spaces
          function removeSpaces(string) {
            return string.split(' ').join('');
          }
           
          // Check Captcha
         
          // function CheckCaptcha() {
          //   var result = ValidateCaptcha();
          //   if( window.$("#UserCaptchaCode").val() === "" || window.$("#UserCaptchaCode").val() === null || window.$("#UserCaptchaCode").val() === "undefined") {
          //     window.$('#WrongCaptchaError').text('Please Enter Code Given Below In a Picture.').show();
          //     window.$('#UserCaptchaCode').focus();
          //   } else {
          //     if(result === false) { 
          //       window.$('#UserCaptchaCode').val('').attr('place-holder','Enter Captcha - Case Sensitive');
          //     }else{
                
          //     }
          //   }  
          // }
    }
}

let captchaType = {
    model: {
        defaults: {
            tagName: 'div',
            attributes: {class: 'captcha'},
            components:[
                {
                    tagName: 'h5',
                    type: 'text',
                    components: 'Please verify you are a human'
                },
                `
                <section>
                    <fieldset class="captchaField">
                    <span id="SuccessMessage" class="success">Thanks! , The Captcha Is Correct!</span>
                    <input type="text" id="UserCaptchaCode" class="CaptchaTxtField" placeholder='Enter Captcha - Case Sensitive'>
                    <span id="WrongCaptchaError" class="error"></span>
                    <div class='CaptchaWrap'>
                        <div id="CaptchaImageCode" class="CaptchaTxtField">
                        <canvas id="CapCode" class="capcode" width="300" height="80"></canvas>
                        </div> 
                        <input type="button" class="ReloadBtn" onclick='CreateCaptcha();'>
                    </div>
                    <input type="button" class="btnSubmit" onclick="CheckCaptcha(); Submit();" value="Submit">
                    </fieldset>
                </section>
                `,
                
            ],
            styles: `
                .captcha{padding: 10px}
                .captchaField { 
                    margin: 0 auto;
                    margin-top: 15%;
                    border: 1px solid #ccc; 
                    padding: 15px;
                    width: 345px;
                    background-color: #fff;
                    border-radius: 5px;
                  }
                  .CaptchaWrap { position: relative; }
                  .CaptchaTxtField { 
                    border-radius: 5px; 
                    border: 1px solid #ccc; 
                    display: block;  
                    box-sizing: border-box;
                  }
                  #UserCaptchaCode { 
                    padding: 15px 10px; 
                    outline: none; 
                    font-size: 18px; 
                    font-weight: normal; 
                    font-family: 'Open Sans', sans-serif;
                    width: 343px;
                  }
                  #CaptchaImageCode { 
                    text-align:center;
                    margin-top: 15px;
                    padding: 0px 0;
                    width: 300px;
                    overflow: hidden;
                  }
                  .capcode { 
                    font-size: 46px; 
                    display: block; 
                    -moz-user-select: none;
                    -webkit-user-select: none;
                    user-select: none; 
                    cursor: default;
                    letter-spacing: 1px;
                    color: #ccc;
                    font-family: 'Roboto Slab', serif;
                    font-weight: 100;
                    font-style: italic;
                  }
                  .ReloadBtn { 
                    background:url('https://webdevtrick.com/wp-content/uploads/recaptcha.png') left top no-repeat;   
                    background-size : 100%;
                    width: 32px; 
                    height: 32px;
                    border: 0px; outline none;
                    position: absolute; 
                    bottom: 30px;
                    left: 310px;
                    outline: none;
                    cursor: pointer; /**/
                  }
                  .btnSubmit {
                    margin-top: 15px;
                    border: 0px;
                    padding: 10px 20px; 
                    border-radius: 5px;
                    font-size: 18px;
                    background-color: #1285c4;
                    color: #fff;
                    cursor: pointer;
                  }
                  .error { 
                    color: red; 
                    font-size: 12px; 
                    display: none; 
                  }
                  .success {
                    color: green;
                    font-size: 18px;
                    margin-bottom: 15px;
                    display: none;
                  }
            `,
            script
        }
    }
}

export default captchaType;