import { csrfFetch } from "./csrf";

const SET_ALL = "teams/setAll";
const SET_ALL_NONE = 'teams/setAllNone';
const CREATE_ISSUE = 'issues/new';
const DELETE_ISSUE = 'issue/delete';
const EDIT_ISSUE = 'issue/put';
const CREATE_PROJECT = 'project/post';
const EDIT_PROJECT = 'project/put';
const DELETE_PROJECT = 'project/delete';
const CREATE_TEAM = 'team/post';
const EDIT_TEAM = 'team/put';



//ACTIONS===================================================================================
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

const postIssue = (iss, teamId) => {
    return {
        type: CREATE_ISSUE,
        issue: iss,
        teamId
    }
}

const putIssue = (iss, teamId) => {
    return {
        type: EDIT_ISSUE,
        issue: iss,
        teamId
    }
}

const delIssue = (issueId, projId, teamId) => {
    return {
        type: DELETE_ISSUE,
        issueId,
        projId,
        teamId
    }
}

const postTeam = (newTeam) => {
    return {
        type: CREATE_TEAM,
        newTeam
    }
}



//THUNKS=========================================================================================
export const userInfo = () => async (dispatch) => {
    let all = await csrfFetch('/api/users/teams');
    all = await all.json();
    // console.log('Thunk',all)
    let allFlat = {};
    all.forEach(team => {
        let teamFlat = {
            ...team,
            Members: {},
            Projects: {}
        };
        team.Members.forEach(mem => {
            teamFlat.Members[mem.id] = mem;
        });
        team.Projects.forEach(proj => {
            let projFlat = { ...proj, Issues: {} };
            proj.Issues.forEach(iss => {
                projFlat.Issues[iss.id] = iss;
            });
            teamFlat.Projects[proj.id] = projFlat;
        });
        allFlat[team.id] = teamFlat;
    });
    // console.log('Thunk (flat)',allFlat)
    dispatch(setAll(allFlat));
}

export const noUser = () => async (dispatch) => {
    dispatch(setAllNone())
}

export const createIssue = (iss/*{ title, description, status, label, priority, projectId }*/) => async (dispatch) => {
    let newIss = await csrfFetch('/api/issues', {
        method: 'POST',
        body: JSON.stringify(iss)
    });
    newIss = await newIss.json();
    dispatch(postIssue(newIss, iss.currTeam))
    return newIss
}

export const removeIssue = (iss, teamId) => async (dispatch) => {
    await csrfFetch(`/api/issues/${iss.id}`, { method: 'DELETE' });
    dispatch(delIssue(iss.id, iss.projectId, teamId));
}

export const editIssue = (edit/*{ title, description, status, label, priority, projectId }*/) => async (dispatch) => {
    let newIss = await csrfFetch(`/api/issues/${edit.id}`, {
        method: 'PUT',
        body: JSON.stringify(edit)
    });
    newIss = await newIss.json();
    dispatch(putIssue(newIss, edit.currTeam))
}

export const createTeam = (team) => async (dispatch) => {
    let newTeam = await csrfFetch(`/api/teams`, {
        method: 'POST',
        body: JSON.stringify(team)
    })
    newTeam = await newTeam.json();
        let teamFlat = {
            ...newTeam,
            Members: {},
            Projects: {}
        };
        newTeam.Members.forEach(mem => {
            teamFlat.Members[mem.id] = mem;
        });
        newTeam.Projects.forEach(proj => {
            let projFlat = { ...proj, Issues: {} };
            proj.Issues.forEach(iss => {
                projFlat.Issues[iss.id] = iss;
            });
            teamFlat.Projects[proj.id] = projFlat;
        });
    dispatch(postTeam(teamFlat));
    return teamFlat;
}

export const editTeam = (team) => async (dispatch) => {

}

export const createProject = (team) => async (dispatch) => {

}

export const editProject = (team) => async (dispatch) => {

}

export const deleteProject = (team) => async (dispatch) => {

}


//REDUCER=========================================================================
const initialState = {};

const teamReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_ALL:
            // console.log('Reducer',action.payload)
            return action.payload;
        case SET_ALL_NONE:
            return {};
        case CREATE_ISSUE:
            newState = Object.assign({}, state);
            // console.log(newState[action.teamId], action.teamId)
            newState[action.teamId].Projects[action.issue.projectId].Issues[action.issue.id] = action.issue;
            return newState;
        case EDIT_ISSUE:
            newState = Object.assign({}, state);
            // console.log(newState[action.teamId], action.teamId)
            newState[action.teamId].Projects[action.issue.projectId].Issues[action.issue.id] = action.issue;
            return newState;
        case DELETE_ISSUE:
            newState = Object.assign({}, state);
            delete newState[action.teamId].Projects[action.projId].Issues[action.issueId];
            return newState;
        case CREATE_TEAM:
            newState = Object.assign({}, state);
            newState[action.newTeam.id] = action.newTeam;
            return newState;
        case EDIT_TEAM:
        case CREATE_PROJECT:
        case EDIT_PROJECT:
        case DELETE_PROJECT:

        default:
            return state;
    }
};

export default teamReducer;
