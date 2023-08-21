import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import './TeamModal.css'
import { useState } from 'react';
import { createTeam, editTeam} from '../../store/teams';
import { useModal } from '../../context/Modal';
import { useContext } from 'react';
import { CurrTeamContext } from '../../context/currTeam';




function TeamModal({ edit }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(edit ? edit.name : '');
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
        const team = {
            name,
        };
        if (edit) team.id = edit.id;
        dispatch(edit ? editTeam(team) : createTeam(team))
            .then(newTeam => {
                setCurrTeam(newTeam.id);
                history.push(`/teams/${newTeam.id}/issues`);
            })
            .then(closeModal)
    }

    return (
        <>
            <h1 id='teamModTtl'>{edit ? 'Edit' : 'New'} Team</h1>
            <form onSubmit={onSubmit}>
                <input id='teamNameIn' type='string' placeholder='Team Name' value={name} onChange={(e) => setName(e.target.value)} />
                {submitted && errors.title && <div className='issueFormErrors'><p>{errors.title}</p></div>}
                <button type='submit'>{edit ? 'Confirm edit' : 'Create Team'}</button>
            </form>
        </>
    )
}
export default TeamModal;
