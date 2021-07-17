import paginationView from "./paginationView";
import View from "./View"
import Pagination from "./paginationView"

class QuizView extends View{

    constructor(){
           
        super();
  
        this._data = 0 ;
      

    }

    addQuizHandler(handler){
        this._parentElem.addEventListener("click" , (e)=>{
             if(!e.target.classList.contains("img"))return
       
             const img =  e.target;
             console.log(img);
             let  {category} =  img.dataset;
           category =  String(category);
            handler(category)
        })
    }
    render(data , state){

        this._data =  data;
        const markup  =this._markup()
        this._clear();
            this._setActive();
            
        this._parentElem.insertAdjacentHTML("afterbegin" , markup);
        paginationView.render(state);
     
    }
    _markup(){
        return this._data.map((v , index)=>{
           
            return `<div class="question">
            <p>${atob(v.question)}</p>
                <div class="answer">
                <label>
                ${v.incorrect_answers.map((i)=>{
                
                 return `<div>
                 <input type = "radio" name=${index} value = ${atob(i)}/> <label for="answers">${atob(i)}</label>
                 </div>`
                    
                    
                }).join("")}
                </label>
                </div>
                </div>
            `
            
        }).join("")
                          ;

    }
       
  
    renderSpinner(){
        this._spinner.classList.remove("hidden1")
        this._overlay.classList.remove("hidden1")
    }
    _setActive(){
       document.querySelector("body").style.backgroundColor="lavender";
    }
   

}


export  default new QuizView();