









import React from 'react';


const ProjectPreview = (props) => {
    //props include: 
    //title (required)
    //location(required)
    //projectId (required)
    let targetUrl= "/project/" + props.projectId;

    return (
        <div>
        <div class="row">
    <div class="col">
        <h2>{props.title}</h2>
    </div>
    <div class="col">
        <p>Bid Deadline: MM/DD/YYYY</p>
    </div>
    <div class="col">
        <p>Project Start: MM/DD/YYYY</p>
    </div>
</div>
    <div class="row">

        <div class="col " >
            <p>{props.location}</p>
        </div>

    </div>

    <div class="row">

        <div class="col " >
           <a href={targetUrl}> <button type="button" class="btn blue btn-lg btn-block">View/Edit Project</button></a>
        </div>

    </div>
    </div>
    )
  }

  export default ProjectPreview;


