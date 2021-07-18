import paginationView from "./paginationView";
import View from "./View"
import Pagination from "./paginationView"

class QuizView extends View{

    constructor(){
           
        super();
  
        this._data = 0 ;
        this.num = [0,0,0,0,0,0,0,0,0,0,0,0];

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
    render(data , state ,questionArray){

        this._data =  data;
        console.log(data);
        const markup  =this._markup();
        this._clear();
            this._setActive();
            
        this._parentElem.insertAdjacentHTML("afterbegin" , markup);
      
        paginationView.render(state);
        
    }
    _markup(){
        return this._data.join(" ");
        
                          

    }
       addCheckAnswersHandler(questionArray){
           document.querySelector(".mainview").addEventListener("click" , (e)=>{
           if(e.target.type!=="radio")return;
           console.log(questionArray);
           console.log(e.target.value , e.target.name);
               console.log(questionArray[e.target.name]);
               const obj = questionArray[e.target.name];
                  if(atob(obj.correct_answer) === e.target.value){
         
                         console.log(e.target.name);
                         this.num[e.target.name] = this.num[e.target.name]+1;
                         console.log( this.num[e.target.name]);
                  }else{
                      if(   this.num[e.target.name] >0)
                    this.num[e.target.name] = this.num[e.target.name]-1;
                    console.log( this.num[e.target.name]);
                  }
          
           })
       }
  
    renderSpinner(){
        this._spinner.classList.remove("hidden1");
        this._overlay.classList.remove("hidden1");
    }
    _setActive(){
       document.querySelector("body").style.backgroundColor="lavender";
    }
   
      pushQuestions(){
          //push questions to array
      }
}


export  default new QuizView();