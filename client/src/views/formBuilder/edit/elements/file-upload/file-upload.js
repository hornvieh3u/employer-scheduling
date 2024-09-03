const script = function(){
    //selecting all required elements
    const dropArea = document.querySelector(".drag-area"),
        dragText = dropArea.querySelector("header"),
        button = dropArea.querySelector("button"),
        input = dropArea.querySelector("input");
        let file; //this is a global variable and we'll use it inside multiple functions

        button.onclick = ()=>{
        input.click(); //if user click on the button then the input also clicked
    }

    input.addEventListener("change", function(){
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file = this.files[0];
        dropArea.classList.add("active");
        showFile(); //calling function
    });


    //If user Drag File Over DropArea
    dropArea.addEventListener("dragover", (event)=>{
        event.preventDefault(); //preventing from default behaviour
        dropArea.classList.add("active");
        dragText.textContent = "Release to Upload File";
    });

    //If user leave dragged File from DropArea
    dropArea.addEventListener("dragleave", ()=>{
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    });

    //If user drop File on DropArea
    dropArea.addEventListener("drop", (event)=>{
        event.preventDefault(); //preventing from default behaviour
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file = event.dataTransfer.files[0];
        showFile(); //calling function
    });

    function showFile(){
        let fileType = file.type; //getting selected file type
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
        if(validExtensions.includes(fileType)){ //if user selected file is an image file
            let fileReader = new FileReader(); //creating new FileReader object
            fileReader.onload = ()=>{
            let fileURL = fileReader.result; //passing user file source in fileURL variable

            let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
            }
            fileReader.readAsDataURL(file);
        }else{
            alert("This is not an Image File!");
            dropArea.classList.remove("active");
            dragText.textContent = "Drag & Drop to Upload File";
        }
    }

}

let fileUploadType = {

    model: {
        defaults: {
            tagName: 'div',
            draggable: '.section-column-child', // Can be dropped only inside `form` elements
            droppable: false, // Can't drop other elements inside
            attributes: {class: 'file-upload'},
            components: [
                `
                    <div class="drag-area">
                        <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
                        <header>Drag & Drop to Upload File</header>
                        <span>OR</span>
                        <button>Browse File</button>
                        <input type="file" hidden>
                    </div>
                `
            ],
            styles: `
            .file-upload {padding: 10px}
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
            .drag-area{
              border: 2px dashed #fff;
              height: 500px;
              width: 700px;
              border-radius: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
            .drag-area.active{
              border: 2px solid #fff;
            }
            .drag-area .icon{
              font-size: 100px;
              color: #fff;
            }
            .drag-area header{
              font-size: 30px;
              font-weight: 500;
              color: #fff;
            }
            .drag-area span{
              font-size: 25px;
              font-weight: 500;
              color: #fff;
              margin: 10px 0 15px 0;
            }
            .drag-area button{
              padding: 10px 25px;
              font-size: 20px;
              font-weight: 500;
              border: none;
              outline: none;
              background: #fff;
              color: #5256ad;
              border-radius: 5px;
              cursor: pointer;
            }
            .drag-area img{
              height: 50%;
              width: 100%;
              object-fit: cover;
              border-radius: 5px;
            }
            `,
            script
        }
    }

}

export default fileUploadType
