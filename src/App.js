import React from 'react';
import './App.css';
import Topbar from './component/Topbar';
import Footer from './component/Footer';
import Pageheading from './component/Pageheading';
import Card from './component/Card';
import Linechart from './component/Linechart';
import Piechart from './component/Piechart';
import Process from './component/Process';

function App() {
  return (
    <div className="App">
      
        <Topbar/>
        <div className="container-fluid">
          <Pageheading title="Dashboard"/>
          
          {/* Content row */}
          <div className="row">

            {/* Card listing */}
            <Card title="Avarage CPU" color="primary" num="8%" icon="microchip" />
            <Card title="Total Network" color="success" num="0,32s" icon="rss" />
            <Card title="Avarage Ram" color="info" num="40%" icon="server" />
            <Card title="Avarage Response Time" color="warning" num="119mbps" icon="clock" />

          </div>

          {/* Chart area */}
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <Linechart title="Networking"></Linechart>
            </div>
            <div className="col-xl-4 col-lg-5">
              <Piechart title="CPU"></Piechart>
            </div>
          </div>
          <div className="row">
            <div class="col-lg-6 mb-4">
              <Process></Process>
            </div>
          </div>

        </div>
        <Footer/>

    </div>
  );
}

export default App;
