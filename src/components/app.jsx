import Navbar from "./common/navbar.jsx"
import React, { createClass } from "react"

export default createClass({
    render() {
        return (
            <div>
                <div class="container">
                    <Navbar />
                </div>
                <div class="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
