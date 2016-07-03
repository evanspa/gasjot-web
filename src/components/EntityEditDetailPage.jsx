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
            editMode,
            goBackLinkText,
            goBackFn
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
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    {(() => {
                         let linkText = goBackLinkText
                         if (linkText == null) {
                             linkText = "\u2190 back to " + entityType + "s"
                         }
                         if (goBackFn != null) {
                             return (<a href="#" onClick={(event) => {
                                     event.preventDefault()
                                     goBackFn()
                                 }}>{linkText}</a>)
                         } else {
                             return (<Link to={entitiesUri}>{linkText}</Link>)
                         }
                     })()
                    }
                    <h3 style={{paddingBottom: 5}}>{heading}</h3>
                    {entityForm}
                </Col>
            </div>
        )
    }
}
