import React from "react"
import Helmet from "react-helmet"

export default React.createClass({
    render() {
        return <Helmet {...this.props} title={"Gas Jot - " + this.props.title} />
    }
})
