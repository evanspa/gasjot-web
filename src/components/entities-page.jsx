import React from "react"
import { push } from 'react-router-redux'
import { Row, Col, Tabs } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import GasJotHelmet from "./gasjot-helmet.jsx";
import GasJotNavbar from "./navbar.jsx"
import EntityList from "./entity-list.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

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
            entityLinkToFn,
            goBackFn
        } = this.props
        const capitalizedEntityType = entityType.toTitleCase()
        return (
            <div>
                <GasJotHelmet title={"Your " + capitalizedEntityType + "s"} />
                <GasJotNavbar />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h4 style={{paddingBottom: 5}}>{"Your " + capitalizedEntityType + "s"}</h4>
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
