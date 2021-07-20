export const  PageNumber=  1;  //for pagination
export const questionsPerPage=  5 ;  //for pagination
export const CategoryNum =  1;
export const AmountOfQuesions =  15;
export const Difficulty =  "easy"
const delayTime = 5;
const waitexecutionTime = 10;
export let timeLeft = 120;
import quizView from "./view/quizView.js"
import sidebarView from "./view/sidebarView.js"
export const tooLong = function(){
 
    return new Promise((_,reject)=>{

        setTimeout(function(){
            reject(new Error("No connection"))
        },waitexecutionTime*1000 )
    })
}

export const fetchQuestion = async function(category, amount,difficulty){

    try{

        const fetch1 = fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&encode=base64`);
    
        const res =  await Promise.race([fetch1 ,tooLong() ])
           if(!res.ok){
               throw new Error(` Error ${res.status}`)
           }

        const data = await res.json();
      
        return data;
    }catch(err){
        throw err
    }
}

//function delays another functions execution
export const delay  =  function(fn){

return new Promise((resolve , reject)=>{
              
    setTimeout(fn.bind(quizView) ,3000);
})
}

export const delay2  =  function(fn){

    return new Promise((resolve , reject)=>{
                  
        setTimeout(fn.bind(sidebarView) ,3000);
    })
    }
//execute when a function takes too long to execute
