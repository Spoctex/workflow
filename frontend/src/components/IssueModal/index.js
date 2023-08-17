import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { issueLabel, issuePriority, issueStatus } from '../enumGlobal';
import './NewIssue.css'
import { useState } from 'react';
import { createIssue, editIssue, userInfo } from '../../store/teams';
import { useModal } from '../../context/Modal';




function IssueModal({ currTeam, edit }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(edit ? edit.title : '');
    const [description, setDescription] = useState(edit ? edit.description : null);
    const [status, setStatus] = useState(edit ? edit.status : 'Backlog');
    const [label, setLabel] = useState(edit ? edit.label : null);
    const [priority, setPriority] = useState(edit ? edit.priority : null);
    const [projectId, setProjectId] = useState(edit ? edit.projectId : Object.values(currTeam.Projects).find(proj => proj.name === 'Global').id);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    async function onSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        let errs = {};
        if (title.length < 4) errs.title = 'Please provide a title longer than 4 characters';
        if (title.length > 50) errs.title = 'Please provide a title shorter than 50 characters';
        if (description && description.length > 400) errs.description = 'Please keep your description shorter than 400 characters';
        if (Object.values(errs).length) return setErrors(errs);
        const iss = {
            title,
            description,
            status,
            label,
            priority,
            projectId,
            currTeam: currTeam.id
        };
        if (edit) iss.id = edit.id;
        dispatch(edit ? editIssue(iss) : createIssue(iss))
            .then((newIss) => history.push(`/${currTeam.id}/${iss.projectId}/${edit ? iss.id : newIss.id}`))
            .then(closeModal)
        // console.log('passing', iss)
    }

    return (
        <div>
            <h1>{edit ? 'Edit' : 'New'} Issue</h1>
            <form onSubmit={onSubmit}>
                <input type='string' placeholder='Issue Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                {submitted && errors.title && <div className='issueFormErrors'><p>{errors.title}</p></div>}
                <textarea placeholder='Add description...' value={description} onChange={(e) => setDescription(e.target.value ? e.target.value : null)} />
                {submitted && errors.description && <div className='issueFormErrors'><p>{errors.description}</p></div>}
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    {issueStatus.map(stat => (
                        <option value={stat}>{stat}</option>
                    ))}
                </select>
                <select value={label} onChange={(e) => setLabel(e.target.value === 'Label' ? null : e.target.value)}>
                    <option value={null}>Label</option>
                    {issueLabel.map(label => (
                        <option value={label}>{label}</option>
                    ))}
                </select>
                <select value={priority} onChange={(e) => setPriority(e.target.value === 'Priority' ? null : e.target.value)}>
                    <option value={null}>Priority</option>
                    {issuePriority.map(prior => (
                        <option value={prior}>{prior}</option>
                    ))}
                </select>
                <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                    {Object.values(currTeam.Projects).map(proj => {
                        if (proj.name !== 'Global') return (
                            <option value={proj.id}>{proj.name}</option>
                        )
                        return (
                            <option value={proj.id}>Project</option>
                        )
                    }
                    )}
                </select>
                <button type='submit'>{edit ? 'Confirm edit' : 'Create Issue'}</button>
            </form>
        </div>
    )
}
export default IssueModal;
