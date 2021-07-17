

export default class View{


    constructor(){
        this._overlay =  document.querySelector(".overlay");
        this._spinner = document.querySelector(".spinner");
        this._parentElem =  document.querySelector(".mainview");
        this._data=0;
    }
    _clear(){
        this._spinner.classList.add("hidden1")
        this._overlay.classList.add("hidden1")
        this._parentElem.innerHTML="";
    }

}

