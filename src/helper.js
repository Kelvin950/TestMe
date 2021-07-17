export const  PageNumber=  1;  //for pagination
export const questionsPerPage=  5 ;  //for pagination
export const CategoryNum =  1;

export const fetchQuestion = async function(category){

    try{
        const res =  await fetch(`https://opentdb.com/api.php?amount=12&category=${category}&difficulty=easy&encode=base64`);
           if(!res.ok){
               throw new Error(` Error ${res.status}`)
           }

        const data = await res.json();
      
        return data
    }catch(err){
        throw err.message
    }
}