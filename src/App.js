import React, { Component } from 'react';
import './App.css';
import Topbar from './component/Topbar';
import Footer from './component/Footer';
import Pageheading from './component/Pageheading';
import Card from './component/Card';
import Linechart from './component/Linechart';
import Piechart from './component/Piechart';
import Process from './component/Process';
import db from './firebase';
import Port from './component/Port';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loadAvg: '',
      memUsed: '',
      total:'',
      cpu: ''
    };
  }
  getLoadAvg = () => {
    let ref = db.ref('monitor/users/001/domain/001/loadAvg/onesec');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      console.log(state);
      this.setState ({
        loadAvg: state + "s"
      });
    });
    console.log('DATA RETRIEVED');
  }
  getUsedMem = () => {
    let ref = db.ref('monitor/users/001/domain/001/mem/used');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      console.log(state);
      this.setState ({
        memUsed: state + "%"
      });
    });
    console.log('DATA RETRIEVED');
  }
  getTotalProc = () => {
    let ref = db.ref('/monitor/users/001/domain/001/totalProc/total');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      console.log(state);
      this.setState ({
        total: state
      });
    });
    console.log('DATA RETRIEVED');
  }
  getCpu = () => {
    let ref = db.ref('monitor/users/001/domain/001/cpu/cpus');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      console.log(state);
      this.setState ({
        cpu: state + "%"
      });
    });
    console.log('DATA RETRIEVED');
  }
  componentDidMount() {
    this.getLoadAvg();
    this.getUsedMem();
    this.getTotalProc();
    this.getCpu();
  }
  render(){
    return (
      <div className="App">
        
          <Topbar/>
          <div className="container-fluid">
            <Pageheading title="Dashboard"/>
            
            {/* Content row */}
            <div className="row">
  
              {/* Card listing */}
              <Card title="CPU Utilization" color="primary" num={this.state.cpu} icon="microchip" />
              <Card title="Load Averages" color="success" num={this.state.loadAvg} icon="clock" />
              <Card title="Used Memory" color="info" num={this.state.memUsed} icon="server" />
              <Card title="Running Process" color="warning" num={this.state.total} icon="list" />
  
            </div>
  
            {/* Chart area */}
            <div className="row">
              <div className="col-xl-8 col-lg-7">
                <Linechart title="Networking"></Linechart>
              </div>
              <div className="col-xl-4 col-lg-5">
                <Piechart title="Disk"></Piechart>
              </div>
            </div>
            <div className="row">
              <div class="col-lg-6 mb-4">
                <Process></Process>
              </div>
              <div class="col-lg-6 mb-4">
                <Port></Port>
              </div>
            </div>
  
          </div>
          <Footer/>
  
      </div>
    );
  }
}

export default App;
