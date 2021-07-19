

export default class View{


    constructor(){
        this._overlay =  document.querySelector(".overlay");
        this._errorParent  = document.querySelector(".error")
        this._spinner = document.querySelector(".spinner");
        this._parentElem =  document.querySelector(".mainview");
        this._data=0;
        this._errorMSg  = "No connection";
        this._pag =  document.querySelector("#kel");
    }
    _clear(){
        this._spinner.classList.add("hidden1")
        this._overlay.classList.add("hidden1")
        this._parentElem.innerHTML="";
    }
    renderSpinner(){
        this._spinner.classList.remove("hidden1");
        this._overlay.classList.remove("hidden1");
    }
    _removeSpinner(){
        this._spinner.classList.add("hidden1");
        this._overlay.classList.add("hidden1");
    }
    _unclear(){
        this._overlay.classList.remove("hidden1");
        this._spinner.classList.add("hidden1");
    }
        renderError(err){
         // this._errorMSg = err
          
            const markup =  this._errorMarkup();
            this._errorParent.innerHTML = markup;
                this._errorParent.classList.remove("hidden1")//render error message

         }
         _errorMarkup(){

            return `
            <h3><i class="fas fa-sad-tear tear">${this._errorMSg}</h3>`
         }
         AddHandlerclearMainview(){

            this._parentElem.addEventListener("click" ,()=>{
                document.querySelector(".done").classList.add("hidden1");
                document.querySelector(".error").classList.add("hidden1");
            })
         }
         hidePagbutton(){
             this._pag.classList.add("hidden1")
         }
}

