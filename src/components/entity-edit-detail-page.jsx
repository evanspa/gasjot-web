import React from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router"
import _ from "lodash"
import GasJotHelmet from "./gasjot-helmet.jsx"
import GasJotNavbar from "./navbar.jsx"
import * as gvs from "../grid-vals"

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
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h4 style={{paddingBottom: 5}}>{heading}</h4>
                    {entityForm}
                </Col>
            </div>
        )
    }
}
