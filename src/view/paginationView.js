
class Pagination{


    constructor(){
        this._parentELem =  document.querySelector("#kel");
      this._data=0
    }
 
    addHandlerPagination(handler){

        this._parentELem.addEventListener("click" , (e)=>{
              e.preventDefault();
              if(!e.target.classList.contains("buttn"))return
                console.log(e.target);
              const {goto}  =  e.target.dataset;
              handler(+goto)

        })
    }
    _markup(){
     
        const curPage= +this._data.page; //get current Page
        const numOfpages= Math.ceil(this._data.questionArray.length / this._data.numQuestions);

        //when on first page 
        if(curPage===1 && numOfpages >1){
            return `<button data-goto = ${curPage+1} class="Next buttn">Next</button>`
        }

        //when on next page but not last page
        
        if(curPage < numOfpages ){
            return `<button  data-goto = ${curPage-1} class="Prev buttn">Prev</button>
            <button  data-goto = ${curPage+1} class="Next buttn">Next</button>`
        }

         
         //last page
         if(curPage==numOfpages && numOfpages>1){
             return `<button  data-goto = ${curPage-1} class="Prev buttn">Prev</button>
             <button class="Next" value= "submit">Submit</button>`
         }

    }
    render(data){
        this._data = data;
    
        const markup  =this._markup()
      console.log(this._parentELem);
       this._parentELem.innerHTML=""
      this._parentELem.insertAdjacentHTML("afterbegin" , markup);
    }

}

export default new Pagination();