import React from "react"
import { Table } from "react-bootstrap"
import { Link } from "react-router"
import _ from "lodash"
import moment from "moment"
import momentLocalizer from "react-widgets/lib/localizers/moment"
import * as utils from "../utils"

export default class EntityListTable extends React.Component {
    render() {
        const { fields,
                entities,
                entityRowOnClick,
                entitiesSortFn,
                entityIdKey,
                entityLinkToFn
        } = this.props
        momentLocalizer(moment)
        return (
            <Table responsive striped hover>
                <thead>
                    <tr>
                        {
                            (() => {
                                let headings = []
                                for (let i = 0; i < fields.length; i++) {
                                    headings.push(<th key={i}>{fields[i].label}</th>)
                                }
                                return headings
                            })()
                        }
                    </tr>
                </thead>
                <tbody>
                { (() => {
                      function tableCell(i, field, id, payload, formatter, rowOnClickFn, makeAsLink) {
                          let entityValue = payload[field.valueKey]
                          if (formatter != null) {
                              entityValue = formatter(entityValue)
                          }
                          return (
                              <td key={i + "_" + id} onClick={() => rowOnClickFn(id)}>
                                  {(() => {
                                       if (makeAsLink) {
                                           return (<Link to={entityLinkToFn(id)}>{entityValue}</Link>)
                                       } else {
                                           return entityValue
                                       }
                                  })()}
                              </td>
                          )
                      }

                      function tableCells(fields, id, payload, rowOnClickFn) {
                          let cells = []
                          for (let i = 0; i < fields.length; i++) {
                              cells.push(tableCell(i, fields[i], id, payload, fields[i].formatter, rowOnClickFn, i == 0))
                          }
                          return cells
                      }

                      const entitiesArray = _.values(entities)
                      if (entitiesSortFn != null) {
                          entitiesArray.sort(entitiesSortFn)
                      }
                      var rows = []
                      for (let i = 0; i < entitiesArray.length; i++) {
                          const entity = entitiesArray[i]
                          const entityPayload = entity.payload
                          const entityId = entityPayload[entityIdKey]
                          rows.push(
                              <tr key={entityId}>
                                  {tableCells(fields, entityId, entityPayload, entityRowOnClick)}
                              </tr>
                          )
                      }
                      return rows;
                })()}
                </tbody>
            </Table>
        )
    }
}
