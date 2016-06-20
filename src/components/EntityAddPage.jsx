import React from "react"
import { Col } from "react-bootstrap";
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"

export default class EntityAddPage extends React.Component {
    render() {
        const {
            entityType,
            entityForm,
            backLink
        } = this.props
        const titleCasedEntityType = entityType.toTitleCase()
        return (
            <div>
                <GasJotHelmet title={"Add " + titleCasedEntityType} />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    { backLink != null ? backLink : "" }
                    <h3 style={{paddingBottom: 5}}>{"Add " + titleCasedEntityType}</h3>
                    {entityForm}
                </Col>
            </div>
        )
    }
}
