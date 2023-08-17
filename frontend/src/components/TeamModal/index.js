import { useDispatch } from 'react-redux';
// import { useHistory } from "react-router-dom";
// import { issueLabel, issuePriority, issueStatus } from '../enumGlobal';
import './TeamModal.css'
import { useState } from 'react';
import { createIssue, createTeam, editIssue, editTeam, userInfo } from '../../store/teams';
import { useModal } from '../../context/Modal';
import { useContext } from 'react';
import { CurrTeamContext } from '../../context/currTeam';




function TeamModal({ currTeam, edit }) {
    const dispatch = useDispatch();
    // const history = useHistory();
    const [name, setName] = useState(edit ? edit.name : '');
    // const [description, setDescription] = useState(edit ? edit.description : null);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const { setCurrTeam } = useContext(CurrTeamContext);
    const { closeModal } = useModal();

    async function onSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        let errs = {};
        if (name.length < 4) errs.title = 'Please provide a name longer than 4 characters';
        if (name.length > 50) errs.title = 'Please provide a name shorter than 50 characters';
        if (Object.values(errs).length) return setErrors(errs);
        const iss = {
            name,
        };
        if (edit) iss.id = edit.id;
        dispatch(edit ? editTeam(iss) : createTeam(iss))
            .then(newTeam => setCurrTeam(newTeam.id))
            .then(closeModal)
        // console.log('passing', iss)
    }

    return (
        <div>
            <h1>{edit ? 'Edit' : 'New'} Team</h1>
            <form onSubmit={onSubmit}>
                <input type='string' placeholder='Team Name' value={name} onChange={(e) => setName(e.target.value)} />
                {submitted && errors.title && <div className='issueFormErrors'><p>{errors.title}</p></div>}
                <button type='submit'>{edit ? 'Confirm edit' : 'Create Team'}</button>
            </form>
        </div>
    )
}
export default TeamModal;
