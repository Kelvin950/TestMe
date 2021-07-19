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
         this._time=120;
         this._timeContainer =    document.querySelector(".time")
    }

    addQuizHandler(handler){
        this._parentElem.addEventListener("click" , (e)=>{
             if(!e.target.classList.contains("img"))return
       
             const img =  e.target;
             console.log(img);
             let  {category} =  img.dataset;
           category =  String(category);
           setInterval(this._timer.bind(this) , 1000);
         
            handler(category)
        })
    }
    render(data , state){

        this._questionData =  data;
        this._data = state;
      
        console.log(this._num);
        console.log(this._questionData);
        console.log(this._data);
        const markup  =this._markup();
        this._clear();
            this._setActive();
           
        this._parentElem.insertAdjacentHTML("afterbegin" , markup);
        
        paginationView.render(this._data);
        
    }
    _addScore(){
    console.log(this._num);
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
           console.log(  this._data.questionArray);
           console.log(e.target.value , e.target.name);
               console.log(  this._data.questionArray[e.target.name]);
               const obj =   this._data.questionArray[e.target.name];
                  if(atob(obj.correct_answer) === e.target.value){
         
                         console.log(e.target.name);
                         this._num[e.target.name] = this._num[e.target.name]+1;
                         console.log( this._num[e.target.name]);
                  }else{
                      if(   this._num[e.target.name] >0)
                    this._num[e.target.name] = this._num[e.target.name]-1;
                    console.log( this._num[e.target.name]);
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
               console.log(err);
               this.renderError();
           }
       }
  
       _renderScore(){
           let markup;
                if(  this._data.questionArray.length>0){
                  const  score =  this._addScore();
                  this._addTotalScore();
                    model.SaveUserdata();
                    console.log(score);
                    //create markup base on score
                   markup=` ${(score> 0.5*  this._data.questionArray.length)?`
                   
                    <h3> <i class="fas fa-check win"></i>${score} out ${this._data.questionArray.length} Good</h3>` :`
                    <i class="fas fa-poop lose"></i>
                    <h3>${score} out ${this._data.questionArray.length}. Its not the end of the world.Try again</h3>
                    `}`

                }
                this._unclear();
            this._scoreEL.innerHTML="";
            this._scoreEL.insertAdjacentHTML("afterbegin" , markup);
            this._scoreEL.classList.remove("hidden1");

       }
       _addTotalScore(){
           (this._data.userdata.totalScore)=this._data.userdata.totalScore+this._addScore();
           console.log( this._data.userdata.totalScore);
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
    
    this._submit();}
        }
        this._time -=1;
     
      }
}


export  default new QuizView();