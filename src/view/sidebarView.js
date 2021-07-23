
import View from "./View"
import photo from "url:../img/photo_2021-07-15_11-12-06.jpg"
///import cryptoRandomString from 'crypto-random-string';
class Sidebar extends View{


    constructor(){
                   super();
       
       this._form =  0;
       this._nav=  document.querySelector(".navigation");
       this._difficulty = 0;
       this._amount= 0;
       this._closeSidebar=  document.querySelector(".closesidebar")
    }

    addsidebarhandler(){

        this._togglebtn.addEventListener("click" , ()=>{
           this._togglebutton();
        })
       

    }
    addcloseSideBar(){
              this._closeSidebar.addEventListener("click", ()=>{
                  this._togglebutton();
              })
    }
    addhandler(handler , handler2 , handler3){
            this._nav.addEventListener("click" , (e)=>{
                
                if(e.target.classList.contains("Profile")){ handler();
                }
                else if(e.target.classList.contains("settings1")){
                    handler2();
                }
                else if(e.target.classList.contains("quiz")){handler3()}
                else return;



                  
            })


    }
    _markupProfile(){
        return `  <div class="profile">
                        
        <div>
            <img src=${photo} alt="Profileimgage"/>

        </div>
            <div class="userdetails">
                <p>
                  ${(this._data.name)?this._data.name:this._generateRandom(7)}
                    
                </p>
                  
                <p>
                    Difficulty : <span class="difficulty">${(this._data.difficulty)?this._data.difficulty:"easy"}</span>
                </p>
                <p>
               Totalscore: ${(this._data.totalScore)?this._data.totalScore:0}
                </p>

                <div class="bar scorelevel">
                       
                </div>
            </div>
    </div>`
    }
    _markupsettings(){
        return `<div class="container settings">
        <div class="row">
            <div col-md-6>

                <form class="form-group">

                    <div class="form-design">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="username" value=${(this._data.name)?this._data.name:""}>
                         

                    </div>
                    <div class="form-design">
                        <label>password</label>
                        <input type="password" name="password" placeholder="password" disabled>


                    </div>
                    <div class="form-design">
                        <label>Difficulty</label>
                         <select id="difficulty">
                             <option value="easy">
                                Easy
                             </option>
                             <option value="medium">
                                Medium
                             </option>
                             <option value="hard">
                                Hard
                             </option>
                         </select>

                    </div>
                    <div class="form-design">
                        <label>Number of quiz</label>
                        <select id="amount">
                        <option value="10">
                            10
                         </option>
                         <option value="15">
                        15
                         </option>
                         <option value=20>
                            20
                         </option>
                        </select>

                    </div>
                    <div class="form-design">
                        <label>Update Image</label>
                        <input type="file" name="userimg" placeholder="username"disabled>


                    </div>
                    <div class="form-design">
                    <input type="submit" value="Update">
                </div>
                </form>



            </div>
             <div col-md-6>
              
                <img src=${photo} alt="userimage"/>
             </div>
        </div>
        
    </div>
`
    }
    renderProfile(data){
           this._data=data;
        this._clear();
         const markup =  this._markupProfile();
        this._togglebutton();
        this.hidePagbutton();
     
         this._parentElem.insertAdjacentHTML("afterbegin" , markup)
         this._generateBar();
         this._hideTimer();

    }
    renderSettings(){
        this._clear();
        this._togglebutton();
        const markup =  this._markupsettings();
        this.hidePagbutton();
        this._hideTimer();
        this._parentElem.insertAdjacentHTML("afterbegin" , markup)
    }

 _checkForms(){
let check = true
  const  input=  document.querySelector("input")
    if(input.value===""){
        input.classList.add("fail");
        input.placeholder="Username cannot be empty"
        check= false;
    }
  
    return check
 }
addFormdata(handler){
    this._form=document.querySelector(".form-group")
    this._difficulty =  document.querySelector("#difficulty");
    this._amount =document.querySelector("#amount")
     this._form.addEventListener("submit" , (e)=>{

         e.preventDefault();
         if(!this._checkForms())return;
              this.renderSpinner();//
         const formdata = new FormData(this._form)
       let data = [...formdata , this._difficulty.value , this._amount.value]
    
    
      handler(data)
           setTimeout(this._removeSpinner.bind(this), 3000)
           setTimeout(this._addDOne.bind(this), 3000)
     })
      
}
_addDOne(){
    document.querySelector(".done").classList.remove("hidden1"); //makes user aware the update is done
   }
   _generateBar(){
       if(this._data.totalScore >=10&& this._data.totalScore<50 ){
           document.querySelector(".scorelevel").classList.remove("bar" , "bargreen");
           document.querySelector(".scorelevel").classList.add("baryellow");
       }
       if(this._data.totalScore >=50 ){
        document.querySelector(".scorelevel").classList.remove("bar" , "baryellow");
        document.querySelector(".scorelevel").classList.add("bargreen");
    }
   }
   _generateRandom(length){
    const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    

   }
}

export default new Sidebar();