import React from 'react';


const Dashboard = (props) => {
  //simply a container - props passed as children

    return (
        <div class="row ">
            <div class="col dashboard-main">
                 {props.children}
            </div>
        </div>
    )
  }

  export default Dashboard;