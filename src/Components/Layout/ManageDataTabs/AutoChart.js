import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import Team from "../../../Reducers/Team.js";
import Button from "react-bootstrap/Button";


export class AutoChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                labels: ["AUTO INNER", "AUTO OUTER", "AUTO BOTTOM", "AUTO MISSED", "AUTO ATTEMPTED"],
                datasets: [
                    {
                        data: [4, 5, 3, 5, 2, 3],
                        label: "POWER CELLS SCORED IN AUTONOMOUS",
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1

                    }
                ]
            }
        }
    }

    render() {
        return (
            <div style={{ position: "relative", width: "400", height: "200" }}>
                <Bar
                    options={{
                        responsive: true
                    }}
                    data={this.state.data}
                />
                <h1>{x}</h1>
            </div>
        )
    }
}

const spacer = {
    padding: "2vh",
};

export default AutoChart;
