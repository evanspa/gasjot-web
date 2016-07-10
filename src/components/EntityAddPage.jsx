import React from "react"
import { Col } from "react-bootstrap";
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"

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
                <Col md={8} mdOffset={2} xs={12} xsOffset={0}>
                    { backLink != null ? backLink : "" }
                    <h4 style={{paddingBottom: 5}}>{"Add " + titleCasedEntityType}</h4>
                    {entityForm}
                </Col>
            </div>
        )
    }
}
