import React from "react"
import { Label } from "react-bootstrap"
import _ from "lodash"

export default class ErrorMessages extends React.Component {
    render() {
        const { errorMask, errors, marginTop } = this.props
        if (errorMask != null) {
            const numErrors = _.size(errors)
            let computedErrMessages = []
            for (let i = 0; i < numErrors; i++) {
                const { flag, message } = errors[i]
                if (errorMask & flag) {
                    computedErrMessages.push(
                        <h4 key={i} style={{marginTop: 0, marginBottom: 10}}>
                            <Label key={i} bsStyle="danger">{message}</Label>
                        </h4>
                    )
                }
            }
            return (<div style={{marginTop: marginTop}}>{computedErrMessages}</div>)
        } else {
            return <div />
        }
    }
}
