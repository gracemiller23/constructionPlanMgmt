import React, { Component } from 'react';

import Dashboard from '../Components/Dashboard';
import TopTabTabCont from '../Components/Subcomponents/TopTabElements/TopTabTabCont';
import TopTabBodyCont from '../Components/Subcomponents/TopTabElements/TopTabBodyCont';
import TopTabTab from '../Components/Subcomponents/TopTabElements/TopTabTab';
import TopTabBody from '../Components/Subcomponents/TopTabElements/TopTabBody';

class AdminDashboard extends Component {
  render() {

    return (
      <div className="container-fluid">
      <Dashboard>
        <div class="row">

        </div>
        <div class="row">
            <div class="col">
                <TopTabTabCont tabContId="">

                    <TopTabTab title="" linkId="" linkClasses="active" linkToId="" selected=""/>
                    <TopTabTab title="" linkId="" linkClasses="" linkToId="" selected=""/>
                    <TopTabTab title="" linkId="" linkClasses="" linkToId="" selected=""/>
                    <TopTabTab title="" linkId="" tabClasses="ml-auto" linkClasses="" linkToId="" selected=""/>

                  </TopTabTabCont>
                <TopTabBodyCont tabBodyId="">
                      <TopTabBody tabBodyClasses="show active" tabBodyId="" tabTopId="">
                        
                        </TopTabBody>
                        <TopTabBody tabBodyId="" tabTopId="">
                        
                        </TopTabBody>
                        <TopTabBody tabBodyId="" tabTopId="">
                        
                        </TopTabBody>
                        <TopTabBody tabBodyId="" tabTopId="">
                        
                        </TopTabBody>
                  </TopTabBodyCont>
            </div>
        </div>

        </Dashboard>      
</div>
    );
  }
}

export default AdminDashboard;