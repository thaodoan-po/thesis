import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import { store } from '../firebase';
export default class LinechartNet extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (

      <div className="card shadow mb-4">

        {/* Card Header */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">{this.props.title}</h6>
        </div>

        {/* Card Body */}
        <div className="card-body">
          <div className="chart-area">
            <Line
              data={{
                datasets: [
                  {
                    label: 'In',
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    lineTension: 0,
                    cubicInterpolationMode: 'monotone',
                  },
                  {
                    label: 'Out',
                    borderColor: '#3cba9f',
                    fill: false,
                    lineTension: 0,
                    cubicInterpolationMode: 'monotone',
                  }
                ]
              }}
              options={{
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                  }
                },
                tooltips: {
                  backgroundColor: "rgb(255,255,255)",
                  bodyFontColor: "#858796",
                  titleMarginBottom: 10,
                  titleFontColor: '#6e707e',
                  titleFontSize: 14,
                  borderColor: '#dddfeb',
                  borderWidth: 1,
                  xPadding: 15,
                  yPadding: 15,
                  displayColors: false,
                  intersect: false,
                  mode: 'index',
                  caretPadding: 10
                },
                scales: {
                  xAxes: [
                    {
                      type: "realtime",
                      realtime: {
                        // duration: 20000,
                        refresh: 10000,
                        delay: 1000,
                        onRefresh: function (chart) {
                          let ref = store.collection('users/doanthao150399999/001/').doc('network');
                          ref.get().then(snapshot => {
                            const datasets = chart.config.data.datasets
                            datasets[0].data.push({
                              x: Date.now(),
                              y: snapshot.data().in
                            });
                            datasets[1].data.push({
                              x: Date.now(),
                              y: snapshot.data().out
                            })
                          })
                        }
                      }
                    }
                  ],
                  yAxes: [{
                    ticks: {
                      maxTicksLimit: 5,
                      padding: 10
                    },
                    gridLines: {
                      color: "rgb(234, 236, 244)",
                      zeroLineColor: "rgb(234, 236, 244)",
                      drawBorder: false,
                      borderDash: [2],
                      zeroLineBorderDash: [2]
                    }
                  }],
                },
                title: {
                  display: false,
                },
                legend: {
                  display: false,
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
