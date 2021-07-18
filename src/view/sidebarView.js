
import View from "./View"
import photo from "url:../img/photo_2021-07-15_11-12-06.jpg"
class Sidebar extends View{


    constructor(){
                   super();
        this._togglebtn =  document.querySelector(".toggle-btn");
       this._sidebar =  document.querySelector(`#sidebar`);
       this._form =  0;
       this._nav=  document.querySelector(".navigation");
       this._difficulty = 0;
       this._amount= 0;
    }

    addsidebarhandler(){

        this._togglebtn.addEventListener("click" , ()=>{
           this._togglebutton();
        })
       

    }
    addhandler(handler , handler2){
            this._nav.addEventListener("click" , (e)=>{
                
                if(e.target.classList.contains("Profile")){ handler();
                }
                else if(e.target.classList.contains("settings1")){
                    handler2();
                }
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
                  ${(this._data.name)?this._data.name:"random"}
                </p>
                  
                <p>
                    Difficulty : <span class="difficulty">${(this._data.difficulty)?this._data.difficulty:"easy"}</span>
                </p>
                <p>
                    Total Score : 2
                </p>

                <div class="bar">
                       
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
                        <input type="text" name="username" placeholder="username">


                    </div>
                    <div class="form-design">
                        <label>password</label>
                        <input type="password" name="password" placeholder="password" disabled>


                    </div>
                    <div class="form-design">
                        <label>Difficulty</label>
                         <select id="difficulty">
                             <option value="Easy">
                                Easy
                             </option>
                             <option value="Medium">
                                Medium
                             </option>
                             <option value="Hard">
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
         this._parentElem.insertAdjacentHTML("afterbegin" , markup)


    }
    renderSettings(){
        this._clear();
        this._togglebutton();
        const markup =  this._markupsettings();
        this._parentElem.insertAdjacentHTML("afterbegin" , markup)
    }
_togglebutton(){
    this._sidebar.classList.toggle("active");
    this._togglebtn.classList.toggle("hidden");
}

addFormdata(handler){
    this._form=document.querySelector(".form-group")
    this._difficulty =  document.querySelector("#difficulty");
    this._amount =document.querySelector("#amount")
     this._form.addEventListener("submit" , (e)=>{

         e.preventDefault();
         const formdata = new FormData(this._form)
       let data = [...formdata , this._difficulty.value , this._amount.value]
    
          console.log(data);
      handler(data)
        

     })

}
}

export default new Sidebar();