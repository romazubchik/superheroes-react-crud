import { useSelector } from "react-redux";
import { getSuperheroesById } from "../features/superheroes/superheroSlice";
import { useParams } from "react-router";
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

const DetailSuperheroes = () => {

    const { id } = useParams();
    const itemToDetails = useSelector(getSuperheroesById(Number(id)));
    const arrImages = itemToDetails.images.split(", ");

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-center ">
                    <h3>{itemToDetails.nickname}</h3>
                </Card.Header>
                <ListGroup>
                    <ListGroup.Item><b>Real name</b>: {itemToDetails.real_name}</ListGroup.Item>
                    <ListGroup.Item><b>Origin description</b>: {itemToDetails.origin_description}</ListGroup.Item>
                    <ListGroup.Item><b>Superpowers</b>: {itemToDetails.superpowers}</ListGroup.Item>
                    <ListGroup.Item><b>Catch phrase</b>: {itemToDetails.catch_phrase}</ListGroup.Item>
                </ListGroup>
                <Row className="d-flex justify-content-center">
                    {arrImages.map((image) => (
                        <Col key={itemToDetails.id} sm={3} >
                            <Card.Img variant="top" src={image} />
                        </Col>
                    ))}
                </Row>
            </Card>
        </>
    )
}

export default DetailSuperheroes;