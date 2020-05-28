import React, { Component } from 'react';
import db from '../firebase';
class Process extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  getData = () => {
    let ref = db.ref('monitor/users/001/domain/001/topProcess').orderByChild('mem');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            //console.log(state);
            this.setState(state);
        });
  }
  componentDidMount(){
    this.getData();
  }
    render() {
      console.log(this.state);
      var temp = Object.keys(this.state);
        return (
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-left">Top Process Running</h6>
              </div>
              <div className="card-body">
                {
                  temp.map(i => 
                    <div>
                      <h4 className="small font-weight-bold"> <span className="float-left"> PID {i} </span> {this.state[i].cmd} <span className="float-right"> {this.state[i].mem} % Memory</span> </h4>
                      <div className="progress mb-4">
                        <div className="progress-bar bg-warning" role="progressbar" style={{width: + this.state[i].mem}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                      </div>
                   </div>
                  )
                }
              </div>
          </div>
        );
    }
}

export default Process;