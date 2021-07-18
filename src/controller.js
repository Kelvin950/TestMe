
import sidebarView, {Sidebar} from "./view/sidebarView.js";
import paginationView from "./view/paginationView";
import quizView from "./view/quizView.js"
import  *  as model from "./model.js"
//controller


sidebarView.addsidebarhandler();
const  controlQuizView = async function(category){

   quizView.renderSpinner();

    await model.getquestion(category);
   
console.log(model.state.questionArray);

quizView.render(model.pagination(model.state.page) ,model.state.questionArrayDocs , model.state.questionArray,model.state );
quizView.addCheckAnswersHandler(model.state.questionArray)


}

const controlPagination =function(goto){

    quizView.render(model.pagination(goto),model.state);

}

const controlProfile=function(){
    sidebarView.renderProfile(model.state.userdata);
}
const controldata =function(data){
    const userdata= data;
    model.takeUserdata(userdata);
    model.SaveUserdata();
}
const controlSettings=  function(){
    sidebarView.renderSettings();
    sidebarView.addFormdata(controldata)
        //const userdata= sidebarView.addFormdata();
        //model.takeUserdata(userdata);
       // model.SaveUserdata();
}

paginationView.addHandlerPagination(controlPagination);

quizView.addQuizHandler(controlQuizView);
//quizView.addCheckAnswersHandler(model.state.questionArray);
sidebarView.addhandler(controlProfile , controlSettings);

