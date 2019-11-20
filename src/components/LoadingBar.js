import * as React from 'react';
import { Modal } from "react-bootstrap";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Loader } from 'rsuite';


export default class LoadingProgressBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hideDialog: true
        }
    }

    show = () => {
        this.setState({ hideDialog: false });
    }

    hide = () => {
        this.setState({ hideDialog: true });
    }

    render() {
        const { hideDialog } = this.state;

        return (
            <React.Fragment>
                <Modal centered show={!hideDialog}>
                    <Modal.Header>
                        <Modal.Title>Logging in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="loadingbar">
                        <Loader size="md" content="Logging in..." />
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        )
    }
}