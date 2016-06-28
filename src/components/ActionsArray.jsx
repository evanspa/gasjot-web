import React from "react"
import { Button } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal.jsx"
import SmallModal from "./SmallModal.jsx"
import { toastr } from 'react-redux-toastr'

export default class ActionsArray extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showConfirmModal: false,
            showEntityGoneModal: false
        };
    }

    render() {
        const {
            entityId,
            editMode,
            cancelEntityEdit,
            requestInProgress,
            markEntityForEdit,
            cancelEntityAdd,
            downloadEntity,
            deleteEntity,
            deleteEntityConfirmMessage
        } = this.props

        let cancelButton = null
        let saveButton = null
        let editButton = null
        let deleteButton = null
        let downloadButton = null
        let actions = []

        if (entityId != null) {
            if (editMode) {
                cancelButton = <Button key="cancelButton" style={{marginBottom: 0, marginTop: 3, marginRight: 10}} onClick={() => cancelEntityEdit(entityId)} disabled={requestInProgress}>Cancel</Button>
                saveButton = <Button key="saveButton" type="submit" style={{marginBottom: 0, marginTop: 3}} bsStyle="success" disabled={requestInProgress}>Save</Button>
                actions.push(cancelButton)
                actions.push(saveButton)
            } else {
                editButton = <Button key="editButton" bsStyle="primary" style={{marginBottom: 0, marginTop: 3, marginRight: 10}} onClick={() => markEntityForEdit(entityId)}>Edit</Button>
                downloadButton = <Button key="downloadButton" bsStyle="primary" style={{marginBottom: 0, marginTop: 3, marginRight: 10}} onClick={() => downloadEntity(entityId)}>Refresh</Button>
                actions.push(editButton)
                actions.push(downloadButton)
                if (deleteEntity != null) {
                    deleteButton = <Button key="deleteButton" bsStyle="danger" style={{marginBottom: 0, marginTop: 3}} onClick={() => { toastr.clean(); this.setState({showConfirmModal: true}) }}>Delete</Button>
                    actions.push(deleteButton)
                }
            }
        } else {
            cancelButton = <Button key="cancelButton" style={{marginBottom: 0, marginTop: 3, marginRight: 10}} onClick={cancelEntityAdd} disabled={requestInProgress}>Cancel</Button>
            saveButton = <Button key="saveButton" type="submit" style={{marginBottom: 0, marginTop: 3}} bsStyle="success" disabled={requestInProgress}>Save</Button>
            actions.push(cancelButton)
            actions.push(saveButton)
        }
        return (
                <div>
                    <ConfirmModal
                        show={this.state.showConfirmModal}
                        onHide={() => this.setState({ showConfirmModal: false })}
                        noCancelButtonTitle="Nah, forget it"
                        yesDoItButtonStyle="danger"
                        yesDoItButtonTitle="Yes, delete it"
                        yesDoIt={() => {
                                this.setState({ showConfirmModal: false })
                                deleteEntity(entityId)
                            }}
                        title="You sure?"
                        content={deleteEntityConfirmMessage} />
                    {actions}
                </div>
        )
    }
}
