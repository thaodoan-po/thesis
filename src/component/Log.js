import React, { Component } from 'react';
import { store } from '../firebase';
export default class Log extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            method: '',
            date: '',
            status: '',
            cpu: {}
        };
    }
    getData = () => {
        let ref = store.collection(`users/doanthao150399999/001`).doc('user');
        ref.get().then((snapshot) => {
            const name = snapshot.data().name;
            const method = snapshot.data().method;
            const date = snapshot.data().date;
            const time = snapshot.data().time;
            const status = snapshot.data().status;
            this.setState({
                name: name,
                method: method,
                date: date + ' ' + time,
                status: status
            });
        })
        let cpu = [];
        let collections = store.collection(`users/doanthao150399999/001`).doc('cpu').collection('warning').get()
            .then(response => {
                response.forEach(document => {
                    const cpuTemp = {
                        percent: document.id,
                        time: document.data().time
                    };
                    cpu.push(cpuTemp);
                });
            })
        this.setState({
            cpu: cpu
        });
        //console.log(cpu);
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const cpuPercent = this.state.cpu;
        return (
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-left">History</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-borderless" width="100%" cellSpacing={0}>
                            <th className="text-left">User Login</th>
                            <tr className="text-left">
                                <td>{this.state.name}</td>
                                <td>{this.state.method}</td>
                                <td>{this.state.date}</td>
                                <td>{this.state.status}</td>
                            </tr>
                            <th className="text-left">High CPU Usage</th>
                            {
                                Object.keys(cpuPercent).map((i, num) =>
                                    <tr>
                                        <td className="text-left">{num + 1}</td>
                                        <td>{cpuPercent[i].percent}%</td>
                                        <td>{cpuPercent[i].time}</td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}