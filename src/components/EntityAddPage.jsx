import React from "react"
import { Col } from "react-bootstrap";
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import * as gvs from "../grid-vals"

export default class EntityAddPage extends React.Component {
    render() {
        const {
            entityType,
            entityForm,
            reauthenticateModal,
            backLink
        } = this.props
        const titleCasedEntityType = entityType.toTitleCase()
        return (
            <div>
                <GasJotHelmet title={"Add " + titleCasedEntityType} />
                <GasJotNavbar />
                {reauthenticateModal}
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    { backLink != null ? backLink : "" }
                    <h4 style={{paddingBottom: 5}}>{"Add " + titleCasedEntityType}</h4>
                    {entityForm}
                </Col>
            </div>
        )
    }
}
