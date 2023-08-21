import IssueCard from '../IssueCard';
import './IssueBoard.css';



function IssueBoard({issArr}) {



    const issBack = issArr.filter(iss => iss[0].status === 'Backlog');
    const issToDo = issArr.filter(iss => iss[0].status === 'ToDo');
    const issInProg = issArr.filter(iss => iss[0].status === 'In Progress');
    const issDone = issArr.filter(iss => iss[0].status === 'Done');
    const issCanc = issArr.filter(iss => iss[0].status === 'Canceled');
    const issDup = issArr.filter(iss => iss[0].status === 'Duplicate');

    return (
        <div id='colCont'>
            <div>
                <h2>Backlog</h2>
                {issBack.map(iss => (<IssueCard issue={iss[0]} project={iss[1]} team={iss[2]} />))}
            </div>
            <div>
                <h2>ToDo</h2>
                {issToDo.map(iss => (<IssueCard issue={iss[0]} project={iss[1]} team={iss[2]} />))}
            </div>
            <div>
                <h2>In Progress</h2>
                {issInProg.map(iss => (<IssueCard issue={iss[0]} project={iss[1]} team={iss[2]} />))}
            </div>
            <div>
                <h2>Done</h2>
                {issDone.map(iss => (<IssueCard issue={iss[0]} project={iss[1]} team={iss[2]} />))}
            </div>
            <div>
                <h2>Canceled</h2>
                {issCanc.map(iss => (<IssueCard issue={iss[0]} project={iss[1]} team={iss[2]} />))}
            </div>
            <div>
                <h2>Duplicate</h2>
                {issDup.map(iss => (<IssueCard issue={iss[0]} project={iss[1]} team={iss[2]} />))}
            </div>
        </div>
    )
}

export default IssueBoard;
