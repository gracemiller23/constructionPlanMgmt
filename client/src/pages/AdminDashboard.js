import React, { Component } from 'react';
import { UserConsumer } from '../UserContext';

import Dashboard from '../Components/Dashboard';
import TopTabTabCont from '../Components/Subcomponents/TopTabElements/TopTabTabCont';
import TopTabBodyCont from '../Components/Subcomponents/TopTabElements/TopTabBodyCont';
import TopTabTab from '../Components/Subcomponents/TopTabElements/TopTabTab';
import TopTabBody from '../Components/Subcomponents/TopTabElements/TopTabBody';
import SubconProfile from '../Components/SubconProfile';

class AdminDashboard extends Component {
  render() {

    return (
      <div className="container-fluid">
      <Dashboard>
        <div className="row">

        </div>
        <div className="row">
            <div className="col">
                <TopTabTabCont tabContId="admin-tab-content">

                    <TopTabTab title="Subs Invited" linkId="subs-invited" linkClasses="active" linkToId="subs-invited-content" selected="true"/>
                    <TopTabTab title="Subs Chosen" linkId="subs-chosen"  linkToId="subs-chosen-content" selected="false"/>
                    <TopTabTab title="Archived" linkId="archived" linkToId="archived-content" selected="false"/>
                    <TopTabTab title="Subcontractors" linkId="subcontractors" linkToId="subcontractors-content" selected="false"/>
                    <TopTabTab title="My Profile" linkId="my-profile" tabClasses="ml-auto" linkToId="my-profile-content" selected="false"/>

                  </TopTabTabCont>
                <TopTabBodyCont tabBodyId="admin-tab-body">
                      <TopTabBody tabBodyClasses="show active" tabBodyId="subs-invited-content" tabTopId="subs-invited">
                          <div><p>Here's something</p></div>
                        </TopTabBody>
                        <TopTabBody tabBodyId="subs-chosen-content" tabTopId="subs-chosen">
                        <div><p>Here's something</p></div>
                        </TopTabBody>
                        <TopTabBody tabBodyId="archived-content" tabTopId="archived">
                        <div><p>Here's something</p></div>
                        </TopTabBody>
                        <TopTabBody tabBodyId="subcontractors-content" tabTopId="subcontractors">
                        <div><p>Here's something</p></div>
                        </TopTabBody>
                        <TopTabBody tabBodyId="my-profile-content" tabTopId="my-profile">
                        <UserConsumer>
                            {prov => (
                              <SubconProfile profile={prov.state.profile} firstName={prov.name.firstName} lastName={prov.name.lastName}formatPhone={prov.formatPhoneNumber} editProfilePath={""}/>
                            )}
                          </UserConsumer>
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