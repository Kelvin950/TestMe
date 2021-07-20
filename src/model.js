import {fetchQuestion , CategoryNum ,PageNumber , questionsPerPage ,delay , AmountOfQuesions ,Difficulty } from "./helper.js"
export const state={

    questionArray:[],
    category:CategoryNum,
    page:PageNumber,
    numQuestions:questionsPerPage,
    userdata:{
        totalScore:0,
        amount:AmountOfQuesions,
        difficulty:Difficulty
    },
    questionArrayDocs:[],
    
}

//get questions from API
 export const getquestion  = async function(categoryp , amount , difficulty){

    try{
     state.category =  categoryp

     const data =  await fetchQuestion(state.category , state.userdata.amount,state.userdata.difficulty)
       state.questionArray =  data.results;//save questions to state
       //append correct answer to incorrect answers
       state.questionArray.forEach(question => question.incorrect_answers.push(question.correct_answer))
    }catch(err){
        throw err;
    }
}

//push questions into new arrray
export const pushQuestions = function(){

    state.questionArray.forEach((v, index)=>{

        state.questionArrayDocs.push(`<div class="question">
        <p>${atob(v.question)}</p>
            <div class="answer">
            <label>
            ${v.incorrect_answers.map((i)=>{
            
             return `<div>
                <label>
             <input type = "radio" name="${index}" value="${atob(i)}" /> <label for="answers">${atob(i)}</label>
             </label>
             </div> `
                
                
            }).join("")}
           
            </div>
            </div>
        `)

    })
}






export const pagination  = function(page =  state.page){

    state.page = page;

    const start= (state.page-1)*state.numQuestions;
    const end = state.page* state.numQuestions;
    
        
 return state.questionArrayDocs.slice(start , end);

}


export const takeUserdata=  function(data){

     const newdata =  data.flat();//take user data 
     const [empty, name , diff, amount]= newdata;//destructor;

     state.userdata.name =  name;
     state.userdata.difficulty = diff;
     state.userdata.amount = amount

}

export const SaveUserdata= function(){

    localStorage.setItem("userdata",JSON.stringify(state.userdata) );

}

export const getUserData= function(){
   const storage= localStorage.getItem("userdata" );
   if(storage) state.userdata = JSON.parse(storage);
}


getUserData();