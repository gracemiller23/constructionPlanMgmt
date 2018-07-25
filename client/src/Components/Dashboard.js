import React from 'react';


const Dashboard = (props) => {
  //simply a container - props passed as children

    return (
        <div className="row ">
            <div className="col dashboard-main">
                 {props.children}
            </div>
        </div>
    )
  }

  export default Dashboard;