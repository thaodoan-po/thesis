import React, { Component } from 'react';
import {db} from '../firebase';
class Process extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  getData = () => {
    let ref = db.ref('monitor/users/001/domain/001/topProcess');
    ref.on('value', snapshot => {
      this.setState(snapshot.val());
    });
  }
  killProcess = (pid) => {
    if(!window.confirm('Do you really want to kill process?'))
      return;
    let ref = db.ref('monitor/users/001/domain/001/task');
      ref.set({
        cmd: 'kill -9 ' + pid
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
                <h6 className="m-0 font-weight-bold text-primary text-left">Process Running</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">PID</th>
                        <th scope="col">Command</th>
                        <th scope="col">%Mem</th>
                        <th scope="col"></th>
                      </tr>
                      </thead>
                    <tfoot></tfoot>
                    <tbody>
                      {
                        temp.map((i, num) =>
                          <tr>
                            <td>{num+1}</td>
                            <td>{i}</td>
                            <td>{this.state[i].cmd}</td>
                            <td>{this.state[i].mem}</td>
                            <td><button value={i} type="button" class="btn btn-danger" type="submit" onClick={() =>this.killProcess(i)}>Kill</button></td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        );
    }
}

export default Process;