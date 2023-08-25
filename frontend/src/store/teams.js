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
const DELETE_TEAM = 'team/delete';
const POST_COMMENT = 'comment/post';
const PUT_COMMENT = 'comment/put';
const DELETE_COMMENT = 'comment/delete';



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

const putIssue = (iss, teamId, oldProjId) => {
    return {
        type: EDIT_ISSUE,
        issue: iss,
        teamId,
        oldProjId
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

const putTeam = (newTeam) => {
    return {
        type: EDIT_TEAM,
        newTeam
    }
}

const postProject = (newProject) => {
    return {
        type: CREATE_PROJECT,
        newProject
    }
}

const putProject = (newProject) => {
    return {
        type: EDIT_PROJECT,
        newProject
    }
}

const delProject = (teamId, projId) => {
    return {
        type: DELETE_PROJECT,
        projId,
        teamId
    }
}

const delTeam = (teamId) => {
    return {
        type: DELETE_TEAM,
        teamId
    }
}

const postComm = (comm, issId, projId, teamId) => {
    return {
        type: POST_COMMENT,
        comm,
        issId,
        projId,
        teamId
    }
}

const putComm = (comm, issId, projId, teamId) => {
    return {
        type: PUT_COMMENT,
        comm,
        issId,
        projId,
        teamId
    }
}

const delComm = (comm, issId, projId, teamId) => {
    return {
        type: DELETE_COMMENT,
        comm,
        issId,
        projId,
        teamId
    }
}



//THUNKS=========================================================================================
export const userInfo = () => async (dispatch) => {
    let all = await csrfFetch('/api/users/teams');
    all = await all.json();
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
                let issFlat = { ...iss, Comments: {} };
                iss.Comments.forEach(comm => {
                    let commFlat = { ...comm, Replies: [] };
                    comm.Replies.forEach(rep => { commFlat.Replies.push(rep.id) });
                    issFlat.Comments[comm.id] = commFlat;
                });
                projFlat.Issues[iss.id] = issFlat;
            });
            teamFlat.Projects[proj.id] = projFlat;
        });
        allFlat[team.id] = teamFlat;
    });
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
    dispatch(putIssue(newIss, edit.currTeam, edit.oldProj))
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
    let newTeam = await csrfFetch(`/api/teams/${team.id}`, {
        method: 'PUT',
        body: JSON.stringify(team)
    });
    newTeam = await newTeam.json();
    dispatch(putTeam(newTeam));
    return newTeam;
}

export const createProject = (project) => async (dispatch) => {
    let newProj = await csrfFetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(project)
    });
    newProj = await newProj.json();
    newProj.Issues = {};
    dispatch(postProject(newProj));
    return newProj;
}

export const editProject = (project) => async (dispatch) => {
    let newProject = await csrfFetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(project)
    });
    newProject = await newProject.json();
    dispatch(putProject(newProject));
    return newProject;
}

export const deleteProject = (project) => async (dispatch) => {
    await csrfFetch(`/api/projects/${project.id}`, { method: 'DELETE' });
    return dispatch(delProject(project.teamId, project.id));
}

export const deleteTeam = (team) => async (dispatch) => {
    await csrfFetch(`/api/teams/${team.id}`, { method: 'DELETE' });
    return dispatch(delTeam(team.id));
}

export const addComment = (comm) => async (dispatch) => {
    const { issueId, posterId, replyOf, comment } = comm;
    let newComm = await csrfFetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            issueId,
            posterId,
            replyOf,
            comment
        })
    });
    newComm = await newComm.json();
    newComm.Replies = [];
    return dispatch(postComm(newComm, comm.issueId, comm.projId, comm.teamId));
}

export const editComment = (comm) => async (dispatch) => {
    let editComm = await csrfFetch(`/api/comments/${comm.id}`, {
        method: 'PUT',
        body: JSON.stringify({ comm: comm.comment })
    });
    editComm = await editComm.json();
    return dispatch(putComm(editComm, comm.issueId, comm.projId, comm.teamId));
}

export const delComment = (comm) => async (dispatch) => {
    await csrfFetch(`/api/comments/${comm.id}`, { method: 'DELETE' });
    return dispatch(delComm(comm, comm.issueId, comm.projId, comm.teamId));
}


//REDUCER=========================================================================
const initialState = {};

const teamReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_ALL:
            return action.payload;
        case SET_ALL_NONE:
            return {};
        case CREATE_ISSUE:
            newState = Object.assign({}, state);
            newState[action.teamId].Projects[action.issue.projectId].Issues[action.issue.id] = action.issue;
            return newState;
        case EDIT_ISSUE:
            newState = Object.assign({}, state);
            if (action.issue.projectId !== action.oldProjId) delete newState[action.teamId].Projects[action.oldProjId].Issues[action.issue.id]
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
            newState = Object.assign({}, state);
            newState[action.newTeam.id].name = action.newTeam.name;
            return newState;
        case CREATE_PROJECT:
            newState = Object.assign({}, state);
            newState[action.newProject.teamId].Projects[action.newProject.id] = action.newProject;
            return newState;
        case EDIT_PROJECT:
            newState = Object.assign({}, state);
            newState[action.newProject.teamId].Projects[action.newProject.id].name = action.newProject.name;
            newState[action.newProject.teamId].Projects[action.newProject.id].description = action.newProject.description;
            return newState;
        case DELETE_PROJECT:
            newState = Object.assign({}, state);
            delete newState[action.teamId].Projects[action.projId];
            return newState;
        case DELETE_TEAM:
            newState = Object.assign({}, state);
            delete newState[action.teamId];
            return newState;
        case POST_COMMENT: {
            newState = Object.assign({}, state);
            const { teamId, projId, issId, comm } = action;
            newState[teamId].Projects[projId].Issues[issId].Comments[comm.id] = comm;
            if (comm.replyOf) newState[teamId].Projects[projId].Issues[issId].Comments[comm.replyOf].Replies.push(comm.id);
            return newState;
        }
        case PUT_COMMENT: {
            newState = Object.assign({}, state);
            const { teamId, projId, issId, comm } = action;
            newState[teamId].Projects[projId].Issues[issId].Comments[comm.id].comment = comm.comment;
            return newState;
        }
        case DELETE_COMMENT: {
            newState = Object.assign({}, state);
            const { teamId, projId, issId, comm } = action;
            if (comm.replyOf) {
                let mainComm = newState[teamId].Projects[projId].Issues[issId].Comments[comm.replyOf];
                let repDex = mainComm.Replies.findIndex(comm.id);
                mainComm.Replies.splice(repDex, 1);
            }
            else for (let i = 0; i < comm.Replies.length; i++) delete newState[teamId].Projects[projId].Issues[issId].Comments[comm.Replies[i]];
            delete newState[teamId].Projects[projId].Issues[issId].Comments[comm.id];
            return newState;
        }
        default:
            return state;
    }
};

export default teamReducer;
