import React from "react"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import EntitiesPage from "../components/entities-page.jsx"
import * as utils from "../utils"
import _ from "lodash"
import moment from "moment"
import momentLocalizer from "react-widgets/lib/localizers/moment"
import { destroy } from "redux-form"
import { ODOMETER_LOG_FORM } from "../forms"
import * as urls from "../urls"

class OdometerLogsPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const { odometerLogs, vehicles, odometerLogRowOnClick, handleAddOdometerLog } = this.props
        const fields = [
            { label: "Log Date",
              valueKey: "envlog/logged-at",
              formatter: (loggedAt) => { return utils.formatDate(moment, loggedAt) }},
            { label: "Vehicle",
              valueKey: "envlog/vehicle-id",
              formatter: (vehicleId) => { return vehicles[vehicleId].payload['fpvehicle/name'] }},
            { label: "Range",
              valueKey: "envlog/dte"}
        ]
        return (
            <EntitiesPage
                entityType="odometer log"
                entityIdKey="envlog/id"
                entities={odometerLogs}
                fields={fields}
                entityRowOnClick={odometerLogRowOnClick}
                entitiesSortFn={(o1, o2) => {
                        return o2.payload["envlog/logged-at"] - o1.payload["envlog/logged-at"]
                    }}
                handleAddEntity={handleAddOdometerLog}
                entityLinkToFn={odometerLogId => urls.odometerLogDetailUrl(odometerLogId)} />
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
OdometerLogsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        odometerLogs: state.serverSnapshot._embedded.envlogs,
        vehicles: state.serverSnapshot._embedded.vehicles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        odometerLogRowOnClick: (odometerLogId) => {
            dispatch(destroy(ODOMETER_LOG_FORM))
            dispatch(push(urls.odometerLogDetailUrl(odometerLogId)))
        },
        handleAddOdometerLog: () => {
            dispatch(destroy(ODOMETER_LOG_FORM))
            dispatch(push(urls.ADD_ODOMETER_LOG_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OdometerLogsPage)
