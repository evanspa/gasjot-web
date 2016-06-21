import React from "react"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Image } from "react-bootstrap"
import EntitiesPage from "../components/EntitiesPage.jsx"
import _ from "lodash"
import * as urls from "../urls"

class FuelstationsPage extends React.Component {
    render() {
        const { fuelstations, fuelstationRowOnClick, handleAddFuelstation } = this.props
        const fields = [
            { label: "Gas Station Name", valueKey: "fpfuelstation/name" },
            { label: "Brand",
              valueKey: "fpfuelstation/type-id",
              formatter: (typeId) => {
                  return (<Image src={"/images/fstypes/thumbnails/fstype-" + typeId + ".png"} responsive />)
              }}
        ]
        return (
            <EntitiesPage
                entityType="gas station"
                entityIdKey="fpfuelstation/id"
                entities={fuelstations}
                fields={fields}
                entityRowOnClick={fuelstationRowOnClick}
                entitiesSortFn={(o1, o2) => {
                        return o2.payload["fpfuelstation/updated-at"] - o1.payload["fpfuelstation/updated-at"]
                    }}
                handleAddEntity={ handleAddFuelstation }
                entityLinkToFn={(fuelstationId) => { return urls.fuelstationDetailUrl(fuelstationId) }} />
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
FuelstationsPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        fuelstations: state.serverSnapshot._embedded.fuelstations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fuelstationRowOnClick: (fuelstationId) => { dispatch(push(urls.fuelstationDetailUrl(fuelstationId))) },
        handleAddFuelstation: () => { dispatch(push(urls.ADD_FUELSTATION_URI)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationsPage)
