import React, { Component } from 'react';
import { db } from '../firebase';
import { Pagination } from './Pagination';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const ui = {
  textAlign: 'center',
  width: '500px',
  padding: '40px',
  background: '#28bae6',
  boxShadow: '0 20px 75px rgba(0, 0, 0, 0.23)',
  color: '#fff'
}
const h1 = {
  display: 'block',
  fontSize: '2em',
  marginBlockStart: '0.67em',
  marginBlockEnd: '0.67em',
  marginInlineStart: '0px',
  marginInlineEnd: '0px',
  fontWeight: 'bold'
}

const button = {
  width: '160px',
  padding: '10px',
  border: '1px solid #fff',
  margin: '10px',
  cursor:'pointer',
  background: 'none',
  color: '#fff',
  fontSize: '14px'
}

class Process extends Component {

  constructor(props) {
    super(props);
    this.options = {
      sizePage: 10,
      sizePagination: 3
    }
    this.state = {
      process: {},
      page: 0,
      idMemAsc: true,
      isCpuAsc: false,
    }
  }
  killProcess = (e) => {
    if (!window.confirm(`Do you really want to kill this process?`))
      return;
    let ref = db.ref(`monitor/users/${this.props.user}/domain/001/task`);
    ref.set({
      cmd: `kill -9 ${e.target.value}`
    });
  }
  submit = (e) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div style={ui}>
            <h1 style={h1}>Are you sure?</h1>
        <p>You want to kill {e.target.value}?</p>
            <button style={button}
              onClick={() => {
                this.killProcess(e);
                onClose();
              }}
            >
              Yes, kill it!
            </button>
            <button style={button} onClick={onClose}>No</button>
          </div>
        );
      }
    });
  };
  sortMem = (process) => {
    const processArray = Object.keys(process).map(key => {
      return process[key];
    });

    const { isMemAsc } = this.state;
    this.setState({
      isMemAsc: !isMemAsc,
    })
    let sorted = [];
    if (isMemAsc) {
      sorted = processArray.sort((a, b) => b.mem - a.mem);
      this.setState({ process: { ...sorted } });
      return;
    }
    sorted = processArray.sort((a, b) => a.mem - b.mem);
    this.setState({ process: { ...sorted } });
  }

  sortCPU = (process) => {
    const processArray = Object.keys(process).map(e => {
      return process[e]
    })
    const { isCpuAsc } = this.state;
    this.setState({
      isCpuAsc: !isCpuAsc
    })
    let sortedArray = [];
    if (isCpuAsc) {
      sortedArray = processArray.sort((a, b) => b.cpu - a.cpu);
      this.setState({
        process: { ...sortedArray }
      })
      return
    }
    sortedArray = processArray.sort((a, b) => a.cpu - b.cpu);
    this.setState({
      process: { ...sortedArray }
    })
  }

  getData = () => {
    let ref = db.ref(`monitor/users/${this.props.user}/domain/001/procRunning`);
    ref.on('value', snapshot => {
      this.setState({
        process: snapshot.val(),
      });
      console.log(snapshot.val());
    });
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const { process } = this.state;
    let len = Object.keys(this.state.process).length
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
                  <th scope="col">Process</th>
                  <th scope="col">Path</th>
                  <th scope="col">%Mem
                    <button type="button" className="btn btn-outline-light btn-sm"
                      onClick={() => {
                        this.sortMem(process)
                      }}
                    >
                      <i className="fas text-gray-300 fa-sort" />
                    </button>
                  </th>
                  <th scope="col">%CPU
                    <button type="button" className="btn btn-outline-light btn-sm"
                      onClick={() => {
                        this.sortCPU(process)
                      }}
                    >
                      <i className="fas text-gray-300 fa-sort" />
                    </button>
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {
                  this.createPage()
                }
              </tbody>
            </table>
            <Pagination currentPage={this.state.page + 1} totalPage={Math.ceil(len / 10)} onChangePage={this.handlePageChange} />
          </div>
        </div>
      </div>
    );
  }
  createPage = () => {
    let rows = [], index = this.state.page * this.options.sizePage,
      tmp = Object.keys(this.state.process);
    while (
      (index < (this.state.page + 1) * this.options.sizePage) &&
      (index < tmp.length)
    ) {
      rows.push((
        <tr>
          <td>{index + 1}</td>
          <td>{tmp[index]}</td>
          <td>{this.state.process[tmp[index]].cmd}</td>
          <td>{this.state.process[tmp[index]].dir}</td>
          <td>{this.state.process[tmp[index]].mem}</td>
          <td>{this.state.process[tmp[index]].cpu}</td>
          <td><button value={tmp[index]} type="button" class="btn btn-danger" onClick={this.killProcess}>Kill</button></td>
        </tr>
      ));
      index++;
    }
    return rows;
  }
  handlePageChange = (e) => {
    this.setState({
      page: e - 1,
    })
  }
}

export default Process;