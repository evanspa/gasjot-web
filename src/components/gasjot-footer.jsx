import React from "react"
import ReactDOM from "react-dom"
import { Row, Col } from "react-bootstrap";

export default class GasJotFooter extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={12}>
                    <div>
                        <footer className="footer" style={{marginTop: 35}}>
                            <hr />
                            <div>
                                <em>&copy; 2015 Gas Jot, Inc.</em>
                                <em className="pull-right">Version: {process.env.GASJOT_VERSION}</em>
                            </div>
                        </footer>
                    </div>
                </Col>
            </Row>
        )
    }
}
