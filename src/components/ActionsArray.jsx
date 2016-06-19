import React from "react"
import { Button } from "react-bootstrap";

export default class ActionsArray extends React.Component {
    render() {
        const {
            entityId,
            editMode,
            cancelEntityEdit,
            requestInProgress,
            markEntityForEdit,
            cancelEntityAdd,
            downloadEntity
        } = this.props

        let cancelButton = null
        let saveButton = null
        let editButton = null
        let downloadButton = null
        let actionArray

        if (entityId != null) {
            if (editMode) {
                cancelButton = <Button style={{marginBottom: 0, marginRight: 10}} onClick={() => cancelEntityEdit(entityId)} disabled={requestInProgress}>Cancel</Button>
                saveButton = <Button type="submit" style={{marginBottom: 0}} bsStyle="success" disabled={requestInProgress}>Save</Button>
                actionArray = <div>{cancelButton}{saveButton}</div>
            } else {
                editButton = <Button bsStyle="primary" style={{marginBottom: 0, marginRight: 10}} onClick={() => markEntityForEdit(entityId)}>Edit</Button>
                downloadButton = <Button onClick={() => downloadEntity(entityId)}>Refresh</Button>
                actionArray = <div>{editButton}{downloadButton}</div>
            }
        } else {
            cancelButton = <Button style={{marginBottom: 0, marginRight: 10}} onClick={cancelEntityAdd} disabled={requestInProgress}>Cancel</Button>
            saveButton = <Button type="submit" style={{marginBottom: 0}} bsStyle="success" disabled={requestInProgress}>Save</Button>
            actionArray = <div>{cancelButton}{saveButton}</div>
        }
        return actionArray
    }
}
