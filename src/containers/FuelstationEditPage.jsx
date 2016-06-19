import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import FuelstationForm from "../components/FuelstationForm.jsx"
import { attemptSaveFuelstation } from "../actions/actionCreators"
import { toFuelstationFormModel } from "../utils"
import EntityEditDetailPage from "../components/EntityEditDetailPage.jsx"
import ReauthenticateModal from "./ReauthenticateModal.jsx"

class FuelstationEditPage extends React.Component {
    render() {
        const fuelstationPayload = this.props.fuelstation.payload
        const { cancelFuelstationEdit, handleSubmit, api, becameUnauthenticated } = this.props
        const { requestInProgress, fpErrorMask } = api
        const fuelstationId = fuelstationPayload["fpfuelstation/id"]
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your gas station, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(fuelstationId)} />
        const entityForm = <FuelstationForm
                               cancelFuelstationEdit={cancelFuelstationEdit}
                               onSubmit={() => handleSubmit(fuelstationId)}
                               requestInProgress={requestInProgress}
                               fuelstationId={fuelstationId}
                               initialValues={toFuelstationFormModel(fuelstationPayload)}
                               editMode={true}
                               fpErrorMask={fpErrorMask} />
        return (<EntityEditDetailPage
                    editMode={true}
                    entityType="fuelstation"
                    entitiesUri="/fuelstations"
                    reauthenticateModal={reauthenticateModal}
                    entityForm={entityForm} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        fuelstation: state.serverSnapshot._embedded.fuelstations[ownProps.params.fuelstationId],
        becameUnauthenticated: state.becameUnauthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelFuelstationEdit: (fuelstationId) => { dispatch(push("/fuelstations/" + fuelstationId)) },
        handleSubmit: (fuelstationId) => {
            dispatch(attemptSaveFuelstation(fuelstationId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuelstationEditPage)
