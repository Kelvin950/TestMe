import {fetchQuestion , CategoryNum ,PageNumber , questionsPerPage } from "./helper.js"
export const state={

    questionArray:[],
    category:CategoryNum,
    page:PageNumber,
    numQuestions:questionsPerPage,
    userdata:{
        
    }
}

//get questions from API
 export const getquestion  = async function(categoryp){

     state.category =  categoryp

     const data =  await fetchQuestion(state.category)
       state.questionArray =  data.results;//save questions to state
       //append correct answer to incorrect answers
       state.questionArray.forEach(question => question.incorrect_answers.push(question.correct_answer))
   
}


export const pagination  = function(page =  state.page){

    state.page = page;

    const start= (state.page-1)*state.numQuestions;
    const end = state.page * state.numQuestions;
 return state.questionArray.slice(start , end);

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