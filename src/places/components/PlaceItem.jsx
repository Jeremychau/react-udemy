import React, {useState, useContext} from "react";

import Card from '../../shared/components/UIElements/Card'
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map"

import { AuthContext } from '../../shared/context/auth-context';

import "./PlaceItem.css";

const PlaceItem = props => {
    const auth = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const mapHandler = ( action ) => {
        setShowMap( action? true : false )
    }

    const showWarningHandler = ( action ) => {
        setShowConfirmModal( action? true : false )
    }

    const confirmDeletHandler = () => {
        setShowConfirmModal( false )
    }
    console.log(props);
  return (
    <React.Fragment>
        <Modal show={showMap} onCancel={ () => mapHandler()} header={props.address} contentClass="place-item__modal-content" footrtClass="plac-item__modal-actions" footer={<Button onClick={ () => mapHandler()} >Close</Button>}>
            <div className="map-container">
                <h2>The Map!</h2>
                <Map center={props.coordinates}/>
            </div>
        </Modal>

        <Modal
            show={showConfirmModal}
            onCancel={ () => showWarningHandler(false)}
            header="Are you sure?"
            footerClass="plac-item__modal-actions"
            footer={
                <React.Fragment>
                    <Button inverse onClick={ () => showWarningHandler(false)} >Cancel</Button>
                    <Button danger onClick={confirmDeletHandler} >Delete</Button>
                </React.Fragment>
            }
        >
            <p>Do you want to proceed and delete this place?</p>
        </Modal>

        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={`${process.env.REACT_APP_ASSET_URL_PATH + props.image}`} alt={props.title} />
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={ () => mapHandler(true)} >View On Map</Button>
                    {auth.userId === props.creatorId && <Button to={`/places/${props.id}`} >Edit</Button>}
                    {auth.userId === props.creatorId && <Button danger onClick={ () => showWarningHandler(true)} >Delete</Button>}
                </div>
            </Card>
        </li>
    </React.Fragment>
  );
};

export default PlaceItem;
