import React from "react"
import { Modal, Button } from "react-bootstrap";

export default class ConfirmModal extends React.Component {
    render() {
        return (
            <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.content}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.onHide}
                        style={{paddingRight: 10}}>{this.props.noCancelButtonTitle}</Button>
                    <Button
                        bsStyle={this.props.yesDoItButtonStyle}
                        onClick={this.props.yesDoIt}>{this.props.yesDoItButtonTitle}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
