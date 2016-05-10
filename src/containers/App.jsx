import React from "react"

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div class="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
