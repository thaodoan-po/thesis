import React, { Component } from 'react';
import {db} from '../firebase';

class Port extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    };
    getPort = () => {
        let ref = db.ref(`monitor/users/${this.props.user}/domain/001/port`);
        ref.on('value', snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    }
    componentDidMount() {
        this.getPort();
      }
    render() {
        var temp = Object.keys(this.state);
        var k = temp.map(key => this.state[key]);
        return (
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-left">Opening Port</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Port</th>
                                <th scope="col">Potocol</th>
                                <th scope="col">Service</th>
                            </tr>
                        </thead>
                        <tfoot></tfoot>
                        <tbody>
                                {
                                    temp.map((i, num) =>
                                        <tr>
                                            <td>{num+1}</td>
                                            <td>{i}</td>
                                            <td>{this.state[i].protocol}</td>
                                            <td>{this.state[i].service}</td>
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

export default Port;