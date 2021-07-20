import paginationView from "./paginationView";
import View from "./View"
import  *  as model from "../model.js"
import Pagination from "./paginationView"
import {delay ,timeLeft} from "../helper.js"

class QuizView extends View{

    constructor(){
           
        super();
  
        this._data = 0 ;
        this._num =[]
        this._questionData = 0;
        this._scoreEL  =  document.querySelector(".score");
        this._scoreEL1  =  document.querySelector(".score1");
         this._time=120;
         
    }

    addQuizHandler(handler){
        this._parentElem.addEventListener("click" , (e)=>{
             if(!e.target.classList.contains("img"))return
       
             const img =  e.target;
           
             let  {category} =  img.dataset;
           category =  String(category);
           setInterval(this._timer.bind(this) , 1000);
         
            handler(category)
        })
    }
    render(data , state){

        this._questionData =  data;
        this._data = state;
      
      
        const markup  =this._markup();
        this._clear();
            this._setActive();
              this._removeSidebar();
        this._parentElem.insertAdjacentHTML("afterbegin" , markup);
        
        paginationView.render(this._data);
        
    }
    _addScore(){

       return this._num.reduce(( total,v)=>{
        return total+v;
        },0)
    }
    _markup(){
        return this._questionData.join(" ");
        
                          

    }
       addCheckAnswersHandler(){
           document.querySelector(".mainview").addEventListener("click" , (e)=>{
           if(e.target.type!=="radio")return;
        
               const obj =   this._data.questionArray[e.target.name];
                  if(atob(obj.correct_answer) === e.target.value){
         
                        
                         this._num[e.target.name] = this._num[e.target.name]+1;
                         
                  }else{
                      if(   this._num[e.target.name] >0)
                    this._num[e.target.name] = this._num[e.target.name]-1;
                   
                  }
          
           })
       }
       //
       async _submit(){
        try{
           this.renderSpinner();//render spinner
              
           const e=delay.bind(this)
           await e(this._renderScore);
       
           
       //delays renderScore
        }
           catch(err){
              
               this.renderError();
           }
       }
  
       _renderScore(){
           let markup;
                if(  this._data.questionArray.length>0){
                  const  score =  this._addScore();
                  this._addTotalScore();
                    model.SaveUserdata();
                  
                    //create markup base on score
                   markup=` ${(score> Math.floor(0.5*  this._data.questionArray.length))?`
                   
                    <h3> <i class="fas fa-check win"></i>${score} out ${this._data.questionArray.length} Good</h3>` :`
                    <i class="fas fa-poop lose"></i>
                    <h3>${score} out ${this._data.questionArray.length}. Its not the end of the world.Try again</h3>
                    `}`

                }
                this._unclear();
           this._scoreEL1.innerHTML="";
            this._scoreEL1.insertAdjacentHTML("afterbegin" , markup);
            this._scoreEL.classList.remove("hidden1");

       }
       _addTotalScore(){
           const score =  this._addScore();
          
           (this._data.userdata.totalScore)=this._data.userdata.totalScore+score
          
       }

       addHandlerSubmit(){
         document.querySelector(".submit").addEventListener("click" , ()=>{
             this._submit();
         })
       }
 
    _setActive(){
       document.querySelector("body").style.backgroundColor="lavender";
    }
   
      _timer(){
         
        let min = Math.floor( this._time/60);//set minute
        let sec=  this._time%60//set seconds
        
      //  console.log(  this._time);
       // console.log(min);
       // console.log(sec);
        const tume1=  `<p>${min} : ${(sec>=10)?sec:`0${sec}`}<p>`//set markup
    this._timeContainer.classList.remove("hidden1");
    this._timeContainer.innerHTML=tume1;
        if(  this._time===60){
        this._timeContainer.classList.add("warn");
        }
        if(  this._time<10){
      
        this._timeContainer.classList.remove("warn");
        this._timeContainer.classList.add("danger");
            if(this._time<0){
        
        this._timeContainer.innerHTML=" time is up";
        this._submit();     
    }
    
   
        }
        this._time -=1;
     
      }

      initializeNumArray(){
        this._num =  new Array(this._data.questionArray.length).fill(0);
      }
}


export  default new QuizView();