import React from "react"
import moment from "moment"
import momentLocalizer from "react-widgets/lib/localizers/moment"
import * as utils from "../utils"
import numeral from "numeral"

export default class PriceByOctaneChart extends React.Component {
    render() {
        momentLocalizer(moment)
        const { gasLogs, octane } = this.props
        let LineChart = require("react-chartjs").Line
        let gasLogsXYData = utils.toXY(gasLogs,
                                       "fplog/purchased-at",
                                       "fplog/gallon-price",
                                       gasLogPayload => gasLogPayload["fplog/octane"] == octane)
        let gasLogsData = {
            datasets: [{
                label: "Price of " + octane + " octane",
                pointBackgroundColor: utils.CHARTJS_POINT_BG_COLOR,
                pointRadius: utils.CHARTJS_POINT_RADIUS,
                backgroundColor: utils.CHARTJS_FILL_BG_COLOR,
                data: gasLogsXYData
            }]
        }
        return (
            <LineChart
                data={gasLogsData}
                options={{
                    tooltips: {
                        callbacks: {
                            title: (toolTipItems, data) => {
                                return moment(toolTipItems[0].xLabel).format(utils.DATE_DISPLAY_FORMAT)
                            },
                            label: (toolTipItem, data) => numeral(toolTipItem.yLabel).format(utils.CURRENCY_FORMAT)
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            position: 'bottom',
                            time: {
                                displayFormats: {
                                    quarter: utils.CHARTJS_QUARTER_DATE_DISPLAY_FORMAT
                                }
                            },
                            display: true
                        }],
                        yAxes: [{
                            ticks: {
                                suggestedMin: 1,
                                callback: function(value, index, values) {
                                    return numeral(value).format(utils.CURRENCY_FORMAT)
                                }
                            }
                        }]
                    }
                }} />
        )
    }

}
