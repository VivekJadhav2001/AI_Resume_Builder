import { TEMPLATES_ID } from "../../constant";
import templateOneInitialState from "../templatesQuestions/template_1";
import templateTwoInitialState from "../templatesQuestions/template_2";


// Assign initial state to store based on selected template
export function selectTemplateQuestions(template) {
    if (template.id === TEMPLATES_ID.TEMPLATE_1) {
        return templateOneInitialState
    }else if(template.id === TEMPLATES_ID.TEMPLATE_2){
        return templateTwoInitialState
    }
}