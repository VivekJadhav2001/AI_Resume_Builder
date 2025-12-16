import { createSlice } from "@reduxjs/toolkit";
import { FORM_SECTIONS } from "../constant";
// import { encryptData } from "../utils/Encryption";

const formDataSlice = createSlice({
    name: "formData",
    initialState: {},
    reducers: {

        // Update store on page load after getting data from local storage
        updateStoreData(state, action) {
            // Return new state for store
            return action.payload
        },


        // Updates state section like intro, objective, projects etc by taking these details in arguments section, questionId, answer
        updateData(state, action) {

            const section = action.payload.section
            const questionId = action.payload.questionId
            const answer = action.payload.answer
            const subSectionKey = action.payload?.subSectionKey
            // state = action.payload
            console.log(subSectionKey,'sub section keyu')
            console.log(action.payload,'action payload')
            if (subSectionKey) {
                state[section][subSectionKey].forEach((item) => {
                    if (item.id === questionId) {
                        item.answer = answer
                    }
                })

                state.renderingQuestions = state[section]
            } else {

                console.log(state,section,'error debug')
                state[section].forEach((item) => {
                    console.log(item,'in updating input')
                    if (item.id === questionId) {
                        item.answer = answer
                    }
                })

                state.renderingQuestions = state[section]

            }

        },

        // On submit of form
        updateFormRender(state) {

            

            if (state.currentForm === FORM_SECTIONS.INTRO) {
                state.currentForm = FORM_SECTIONS.OBJECTIVE;
                state.renderingQuestions = state.objective;
            } else if (state.currentForm === FORM_SECTIONS.OBJECTIVE) {
                state.currentForm = FORM_SECTIONS.SKILLS;
                state.renderingQuestions = state.skills;
            } else if (state.currentForm === FORM_SECTIONS.SKILLS) {

                // If experience present in template render experienct
                if (state.experience) {
                    state.currentForm = FORM_SECTIONS.EXPERIENCE;
                    state.renderingQuestions = state.experience
                }
                // If not display project section
                else {
                    state.currentForm = FORM_SECTIONS.PROJECT;
                    state.renderingQuestions = state.projects;
                }
            } else if (state.currentForm === FORM_SECTIONS.EXPERIENCE) {
                state.currentForm = FORM_SECTIONS.PROJECT;
                state.renderingQuestions = state.projects;
            }
            else if (state.currentForm === FORM_SECTIONS.PROJECT) {
                state.currentForm = FORM_SECTIONS.EDUCATION;
                state.renderingQuestions = state.education;
            }
            else if (state.currentForm === FORM_SECTIONS.EDUCATION) {
                state.currentForm = FORM_SECTIONS.CERTIFICATIONS
                state.renderingQuestions = state.certifications
            }

            // Store user entered data on submit of each form
            localStorage.setItem("userData", JSON.stringify(state))

        },

        updateBackRender(state) {
            if (state.currentForm === FORM_SECTIONS.OBJECTIVE) {
                state.currentForm = FORM_SECTIONS.INTRO;
                state.renderingQuestions = state.intro;
            }

            else if (state.currentForm === FORM_SECTIONS.SKILLS) {
                state.currentForm = FORM_SECTIONS.OBJECTIVE;
                state.renderingQuestions = state.objective;
            }

            else if (state.currentForm === FORM_SECTIONS.EXPERIENCE) {
                state.currentForm = FORM_SECTIONS.SKILLS;
                state.renderingQuestions = state.skills;
            }

            else if (state.currentForm === FORM_SECTIONS.PROJECT) {
                if (state.experience) {
                    state.currentForm = FORM_SECTIONS.EXPERIENCE;
                    state.renderingQuestions = state.experience;
                } else {
                    state.currentForm = FORM_SECTIONS.SKILLS;
                    state.renderingQuestions = state.skills;
                }
            }

            else if (state.currentForm === FORM_SECTIONS.EDUCATION) {
                state.currentForm = FORM_SECTIONS.PROJECT;
                state.renderingQuestions = state.projects;
            }

            else if (state.currentForm === FORM_SECTIONS.CERTIFICATIONS) {
                state.currentForm = FORM_SECTIONS.EDUCATION;
                state.renderingQuestions = state.education;
            }

            // SAVE STATE ON PREVIOUS   
          localStorage.setItem("userData", JSON.stringify(state))

        },

        clearStoreData() {
             localStorage.removeItem("userData");
            return {};
        }
    }
});

export const { updateData, updateFormRender, updateBackRender, updateStoreData, clearStoreData } = formDataSlice.actions
export default formDataSlice.reducer
