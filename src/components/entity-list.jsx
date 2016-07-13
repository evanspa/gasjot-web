import React from "react"
import _ from "lodash"
import { Label, Button } from "react-bootstrap"
import EntityListTable from "./entity-list-table.jsx"

export default class EntityList extends React.Component {
    render() {
        const { entityType,
                entities,
                fields,
                handleAddEntity,
                entityRowOnClick,
                entityIdKey,
                entitiesSortFn,
                entityLinkToFn
        } = this.props
        const numEntities = _.keys(entities).length
        var inner
        if (numEntities > 0) {
            inner = <EntityListTable
                        fields={fields}
                        entities={entities}
                        entityRowOnClick={entityRowOnClick}
                        entitiesSortFn={entitiesSortFn}
                        entityIdKey={entityIdKey}
                        entityLinkToFn={entityLinkToFn} />

        } else {
            inner = <div style={{marginTop: 15}}>{"You currently have no " + entityType + "s."}</div>
        }
        return (
            <div style={{marginTop: 15 }}>
                <Button style={{marginBottom: 10}} bsStyle="primary" onClick={handleAddEntity}>{"Add " + entityType.toTitleCase()}</Button>
                { inner }
            </div>
        )
    }
}
