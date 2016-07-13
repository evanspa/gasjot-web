import React from "react"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import EntitiesPage from "../components/entities-page.jsx"
import * as utils from "../utils"
import _ from "lodash"
import moment from "moment"
import momentLocalizer from "react-widgets/lib/localizers/moment"
import { destroy } from "redux-form"
import { GAS_LOG_FORM } from "../forms"
import * as urls from "../urls"

class GasLogsPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const {
            gasLogs,
            vehicles,
            fuelstations,
            gasLogRowOnClick,
            handleAddGasLog
        } = this.props
        const fields = [
            { label: "Purchase Date",
              valueKey: "fplog/purchased-at",
              formatter: (purchasedAt) => { return utils.formatDate(moment, purchasedAt) }},
            { label: "Vehicle",
              valueKey: "fplog/vehicle-id",
              formatter: (vehicleId) => { return vehicles[vehicleId].payload['fpvehicle/name'] }},
            { label: "Gas Station",
              valueKey: "fplog/fuelstation-id",
              formatter: (fuelstationId) => { return fuelstations[fuelstationId].payload['fpfuelstation/name'] }},
            { label: "Num Gallons",
              valueKey: "fplog/num-gallons"},
            { label: "Gallon Price",
              valueKey: "fplog/gallon-price"}
        ]
        return (
            <EntitiesPage
                entityType="gas log"
                entityIdKey="fplog/id"
                entities={gasLogs}
                fields={fields}
                entityRowOnClick={gasLogRowOnClick}
                entitiesSortFn={(o1, o2) => {
                        return o2.payload["fplog/purchased-at"] - o1.payload["fplog/purchased-at"]
                    }}
                handleAddEntity={handleAddGasLog}
                entityLinkToFn={gasLogId => urls.gasLogDetailUrl(gasLogId)} />
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
GasLogsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        gasLogs: state.serverSnapshot._embedded.fplogs,
        vehicles: state.serverSnapshot._embedded.vehicles,
        fuelstations: state.serverSnapshot._embedded.fuelstations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gasLogRowOnClick: (gasLogId) => {
            dispatch(destroy(GAS_LOG_FORM))
            dispatch(push(urls.gasLogDetailUrl(gasLogId)))
        },
        handleAddGasLog: () => {
            dispatch(destroy(GAS_LOG_FORM))
            dispatch(push(urls.ADD_GAS_LOG_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GasLogsPage)
