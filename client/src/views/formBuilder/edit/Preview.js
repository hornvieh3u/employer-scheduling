import React, { useEffect } from 'react'

export default function Preview() {
    useEffect(() => {
        let html = localStorage.getItem("gjs-html");
        let css = localStorage.getItem("gjs-css");
  
  
        html = html.replace("<body", "<div");
        html = html.replace("</body>", "</div>");
        html = html + `<style>${css}</style>`;
        html = html + `<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.5/umd/popper.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
    <script type="text/javascript" src="https://cdn.ckeditor.com/4.19.0/standard/ckeditor.js"></script>
    <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css">
    <link rel="stylesheet" href="/assets/form-builder/grapes-form.css">`;


        document.getElementById("editor").innerHTML = html;
  
        let products = document.getElementsByClassName("product");
        for(let product of products) {
          // let totalPrice = "$" + product.getAttribute('totalprice');
          // product.querySelector("[name='total_price']").innerHTML = (totalPrice);
          // product.querySelector("[name='down_payment']").innerHTML = (totalPrice);
          // product.querySelector("[name='total_price_amount']").innerHTML = (totalPrice);
  
        }
  
        let memberships = document.getElementsByClassName("membership");
        for(let membership of memberships) {
          // let totalPrice = "$" + membership.getAttribute('totalprice');
          // let registerFee = "$" + membership.getAttribute('registerfee');
          // let dPayment = "$" + membership.getAttribute('dpayment');
          //
          //
          // membership.querySelector("[name='total_price']").innerHTML = (totalPrice);
          // membership.querySelector("[name='down_payment']").innerHTML = (dPayment);
          // membership.querySelector("[name='registration_fee']").innerHTML = (registerFee);
          // membership.querySelector("[name='total_price_amount']").innerHTML = (totalPrice);
  
        }
  
        let buttons = document.getElementsByClassName("btn-submit");
        for(let button of buttons) {
          button.addEventListener("click", (e) => {
  
          })
        }
  
    },[]);
  return (
    <div className="App" id="editor">

    </div>
  )
}
