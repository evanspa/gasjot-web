import React from "react"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import EntitiesPage from "../components/entities-page.jsx"
import _ from "lodash"
import { destroy } from "redux-form"
import { VEHICLE_FORM } from "../forms"
import * as urls from "../urls"

class VehiclesPage extends React.Component {
    render() {
        const {
            vehicles,
            vehicleRowOnClick,
            handleAddVehicle
        } = this.props
        const fields = [
            { label: "Vehicle Name", valueKey: "fpvehicle/name" },
            { label: "Plate #",      valueKey: "fpvehicle/plate" }
        ]
        return (
            <EntitiesPage
                entityType="vehicle"
                entityIdKey="fpvehicle/id"
                entities={vehicles}
                fields={fields}
                entityRowOnClick={vehicleRowOnClick}
                entitiesSortFn={(o1, o2) => {
                        return o2.payload["fpvehicle/updated-at"] - o1.payload["fpvehicle/updated-at"]
                    }}
                handleAddEntity={handleAddVehicle}
                entityLinkToFn={vehicleId => urls.vehicleDetailUrl(vehicleId)} />
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
VehiclesPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        vehicles: state.serverSnapshot._embedded.vehicles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        vehicleRowOnClick: (vehicleId) => {
            dispatch(destroy(VEHICLE_FORM))
            dispatch(push(urls.vehicleDetailUrl(vehicleId)))
        },
        handleAddVehicle : () => {
            dispatch(destroy(VEHICLE_FORM))
            dispatch(push(urls.ADD_VEHICLE_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesPage)
