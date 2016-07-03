import React from "react"
import { push } from 'react-router-redux'
import { Row, Col, Tabs } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import GasJotHelmet from "../components/GasJotHelmet.jsx";
import GasJotNavbar from "../components/NavBar.jsx"
import EntityList from "../components/EntityList.jsx"
import _ from "lodash"
import * as urls from "../urls"

export default class EntitiesPage extends React.Component {
    render() {
        const {
            entityType,
            entityIdKey,
            entities,
            fields,
            entityRowOnClick,
            entitiesSortFn,
            handleAddEntity,
            entityLinkToFn
        } = this.props
        const capitalizedEntityType = entityType.toTitleCase()
        return (
            <div>
                <GasJotHelmet title={"Your " + capitalizedEntityType + "s"} />
                <GasJotNavbar />
                <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                    <Link to={urls.ROOT_URI}>&#8592; back</Link>
                    <h3 style={{paddingBottom: 5}}>{"Your " + capitalizedEntityType + "s"}</h3>
                    <EntityList
                        entityType={entityType}
                        entities={entities}
                        fields={fields}
                        handleAddEntity={handleAddEntity}
                        entityRowOnClick={entityRowOnClick}
                        entityIdKey={entityIdKey}
                        entitiesSortFn={entitiesSortFn}
                        entityLinkToFn={entityLinkToFn}
                    />
                </Col>
            </div>
        )
    }
}
