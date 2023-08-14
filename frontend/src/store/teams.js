import { csrfFetch } from "./csrf";

const SET_ALL = "teams/setAll";
const SET_ALL_NONE = 'teams/setAllNone'

const setAll = (all) => {
    return {
        type: SET_ALL,
        payload: all,
    };
};

const setAllNone = () => {
    return {
        type: SET_ALL_NONE
    }
}

export const userInfo = () => async (dispatch) => {
    let all = await csrfFetch('/api/users/teams');
    all = await all.json();
    let allFlat = {};
    all.forEach(team => {
        let teamFlat ={
            ...team,
            Members: {},
            Projects: {}
        };
        team.Members.forEach(mem => {
            teamFlat.Members[mem.id] = mem;
        });
        team.Projects.forEach(proj=>{
            let projFlat = {...proj, Issues:{} };
            proj.Issues.forEach(iss=>{
                projFlat.Issues[iss.id] = iss;
            });
            teamFlat.Projects[proj.id] = projFlat;
        });
        allFlat[team.id] = teamFlat;
    });
    // console.log(allFlat)
    dispatch(setAll(allFlat));
}

export const noUser = () => async (dispatch) => {
    dispatch(setAllNone())
}

const initialState = {};

const teamReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_ALL:
            return action.payload;
        case SET_ALL_NONE:
            return {};
        default:
            return state;
    }
};

export default teamReducer;
