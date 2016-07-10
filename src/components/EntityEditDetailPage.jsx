import React from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router"
import _ from "lodash"
import GasJotHelmet from "../components/GasJotHelmet.jsx"
import GasJotNavbar from "../components/NavBar.jsx"

export default class EntityDetailPage extends React.Component {
    render() {
        const {
            entityType,
            entitiesUri,
            reauthenticateModal,
            entityForm,
            editMode
        } = this.props
        const capitalizedEntityType = entityType.toTitleCase()
        let pageTitle
        let heading
        if (editMode) {
            pageTitle = "Edit " + capitalizedEntityType
            heading = pageTitle
        } else {
            pageTitle = capitalizedEntityType + " Detail Page"
            heading = capitalizedEntityType + " Details"
        }
        return (
            <div>
                <GasJotHelmet title={pageTitle} />
                <GasJotNavbar />
                {reauthenticateModal}
                <Col md={8} mdOffset={2} xs={12} xsOffset={0}>
                    <h4 style={{paddingBottom: 5}}>{heading}</h4>
                    {entityForm}
                </Col>
            </div>
        )
    }
}
