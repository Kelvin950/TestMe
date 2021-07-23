

import photo from "url:../img/photo_2021-07-15_11-12-06.jpg"
import sport from "url:../img/merlin_153612873_5bb119b9-8972-4087-b4fd-371cab8c5ba2-superJumbo.jpg";
import music from "url:../img/axel-antas-bergkvist-UOGFqFfUD0A-unsplash.jpg";
import books from "url:../img/shayna-douglas-TQV8qkwuEzA-unsplash.jpg";
import movies from "url:../img/serge-kutuzov-meqVd5zwylI-unsplash.jpg";
export default class View{


    constructor(){
        this._overlay =  document.querySelector(".overlay");
        this._errorParent  = document.querySelector(".error")
        this._spinner = document.querySelector(".spinner");
        this._parentElem =  document.querySelector(".mainview");
        this._data=0;
        this._errorMSg  = "No connection";
        this._pag =  document.querySelector("#kel");
        this._reloadButton =  document.querySelector(".reload");
        this._togglebtn =  document.querySelector(".toggle-btn");
        this._sidebar =  document.querySelector(`#sidebar`);
        this._imgTargets =  document.querySelectorAll('.img[data-src]');
        this._sourceArray = [sport , music ,books , movies];
        this._timeContainer =    document.querySelector(".time");
        this._starQuiz= document.querySelector(".startquiz");
        this._cancel =  document.querySelector(".cancel");
    }
    _clear(){
        this._spinner.classList.add("hidden1")
        this._overlay.classList.add("hidden1")
        this._parentElem.innerHTML="";
    }
    _hideTimer(){
        this._timeContainer.classList.add("hidden1");
    }
    _togglebutton(){
        this._sidebar.classList.toggle("active");
        this._togglebtn.classList.toggle("hidden");
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
    _showStart(){
        this._overlay.classList.remove("hidden1");
        this._starQuiz.classList.remove("hidden1");
    }
    removeStart(){
        this._overlay.classList.add("hidden1");
        this._starQuiz.classList.add("hidden1");
    }
    _cancelStart(){
        this._cancel.addEventListener("click", ()=>{
            this.removeStart();
        })
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
         reloadHomePage(){
             location.reload();
         }
         addHandlerReloadSub(){
             
            this._reloadButton.addEventListener("click", ()=>{
                this.reloadHomePage();



            })
         }
         _removeSidebar(){
            this._sidebar.classList.remove("active");
            this._togglebtn.classList.add("hidden1");
         }
         _loadimg(entries ,observer){
            const [entry]=  entries;

  if(!entry.isIntersecting)return;
  

  

  const source = +entry.target.dataset.src;

  entry.target.src =  this._sourceArray[source];

 entry.target.addEventListener("load",()=>{
    entry.target.classList.remove("lazy-img");
  
 })
 
  observer.unobserve(entry.target);
         }
         createObserver(){
            const imgObserver =  new IntersectionObserver(this._loadimg.bind(this) , {
                threshold:[ 0.25, 0.5, 0.75, 1],
                rootMargin:'20px'
                })
              
                imgObserver.observe(this._imgTargets[2]);
                this._imgTargets.forEach(img => imgObserver.observe(img));
              
         }
}

