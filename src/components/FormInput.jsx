import React, { createClass } from "react"
import { Input } from "react-bootstrap";

export default class GasJotInput extends React.Component {
    render() {
        if (this.props.error != null && this.props.error.length > 0) {
            return (
                <div>
                    <Input {...this.props} bsStyle="error" />
                    <span style={{paddingBottom: 10}} className="help-block">{this.props.error}</span>
                </div>
            );
        } else {
            return (
                <Input {...this.props} />
            );
        }
    }
}
