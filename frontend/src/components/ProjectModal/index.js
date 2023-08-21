import { useDispatch } from 'react-redux';
import './ProjectModal.css'
import { useState } from 'react';
import { createProject, editProject } from '../../store/teams';
import { useModal } from '../../context/Modal';




function ProjectModal({ currTeam, edit }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(edit ? edit.name : '');
    const [description, setDescription] = useState(edit ? edit.description : null);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    async function onSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        let errs = {};
        if (name.length < 4) errs.title = 'Please provide a title longer than 4 characters';
        if (name.length > 50) errs.title = 'Please provide a title shorter than 50 characters';
        if (description && description.length > 400) errs.description = 'Please keep your description shorter than 400 characters';
        if (Object.values(errs).length) return setErrors(errs);
        const proj = {
            name,
            description,
            teamId: currTeam.id
        };
        if (edit) proj.id = edit.id;
        dispatch(edit ? editProject(proj) : createProject(proj))
            .then(closeModal)
    }

    return (
        <div>
            <h1>{edit ? 'Edit' : 'New'} Project</h1>
            <form onSubmit={onSubmit}>
                <input type='string' placeholder='Project Name' value={name} onChange={(e) => setName(e.target.value)} />
                {submitted && errors.title && <div className='issueFormErrors'><p>{errors.title}</p></div>}
                <textarea placeholder='Add description...' value={description} onChange={(e) => setDescription(e.target.value ? e.target.value : null)} />
                {submitted && errors.description && <div className='issueFormErrors'><p>{errors.description}</p></div>}
                <button type='submit'>{edit ? 'Confirm edit' : 'Create Project'}</button>
            </form>
        </div>
    )
}
export default ProjectModal;
