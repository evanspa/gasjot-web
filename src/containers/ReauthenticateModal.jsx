import React from "react"
import { Modal, Label, Button, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import LoginForm from "../components/LoginForm.jsx";
import { makeLoginHandler } from "../utils"
import { attemptLightLogin, presentedLightLoginForm, logoutRequestDone } from "../actions/actionCreators"

class ReauthenticateModal extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: this.props.showModal
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({showModal: nextProps.showModal})
    }

    render() {
        const { handleSubmit, handleCancel, responseStatus, requestInProgress } = this.props
        const cancel = () => {
            this.setState({showModal: false})
            handleCancel()
        }
        return (
            <Modal show={this.state.showModal} onHide={cancel}>
                <Modal.Body>
                    {/*<h4>For you security, please re-authenticate.</h4>*/}
                    <h4>{this.props.message}</h4>
                    <LoginForm
                        onSubmit={handleSubmit}
                        requestInProgress={requestInProgress}
                        responseStatus={responseStatus} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={cancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
ReauthenticateModal.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleCancel: () => {
            dispatch(logoutRequestDone())
            dispatch(push("/login"))
        },
        handleSubmit: () => { dispatch(attemptLightLogin(ownProps.operationOnLightLoginSuccess)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReauthenticateModal)
