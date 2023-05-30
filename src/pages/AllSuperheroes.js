import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";
import DeleteConfirmation from "../components/DeleteConfirmation";
import PaginationMenu from "../components/PaginationMenu";
import { usePagination } from "../hooks/usePagintion";
import {
    getAllSuperheroes,
    getLoading,
    fetchAllSuperheroesAPI,
    deleteSuperheroAPI,
} from '../features/superheroes/superheroSlice';

const AllSuperheroes = () => {
    const allSuperheroesData = useSelector(getAllSuperheroes);
    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    let contentToRender = null;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(0);

    useEffect(() => {
        dispatch(fetchAllSuperheroesAPI());
    }, [dispatch]);

    const openDeleteModelHandler = (id) => {
        setShowModal(true);
        setItemToDelete(id);
    };

    const closeDeleteModalHandler = () => {
        setShowModal(false);
        setItemToDelete(0);
    }

    const confirmDeleteHandler = () => {
        dispatch(deleteSuperheroAPI(itemToDelete))
            .unwrap()
            .then(() => {
                setShowModal(false);
                setItemToDelete(0);
            })
    }

    //pagination
    // const [currentPage, setCurrentPage] = useState(1);
    // const [superheroesPerPage] = useState(5);

    // const lastSuperheroesIndex = currentPage * superheroesPerPage
    // const firstSuperheroesIndex = lastSuperheroesIndex - superheroesPerPage

    // const currentCourse = allSuperheroesData.slice(firstSuperheroesIndex, lastSuperheroesIndex);

    // const paginate = (pageNumber) => {
    //     window.scrollTo(0,0)
    //     setCurrentPage(pageNumber)
    // };

    const { currentCourse, paginate } = usePagination(allSuperheroesData)

    contentToRender = apiStatus === 'pending'
        ? (<>
            <div className="d-flex align-item-center justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </>)
        : (<>
            <Row xs={1} md={3} className="g-2">
                {currentCourse.map((superhero) => (
                    <Col key={superhero.id}>
                        <Card>
                            <Card.Img variant="top" src={superhero.images?.split(", ")[0]} />
                            <Card.Body>
                                <Card.Title>{superhero.nickname}</Card.Title>
                            </Card.Body>
                            <Button variant="info" type="button" onClick={() => navigate(`/details-superhero/${superhero.id}`)}>
                                Details
                            </Button>
                            <Button variant="dark" type="button" onClick={() => navigate(`/edit-superhero/${superhero.id}`)}>
                                Edit
                            </Button>
                            <Button variant="danger" type="button" onClick={() => openDeleteModelHandler(superhero.id)}>
                                Delete
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>)

    return <>
        <DeleteConfirmation
            showModal={showModal}
            title="Delete Confirmation"
            body="Are you sure to delete item?"
            apiStatus={apiStatus}
            closeDeleteModalHandler={closeDeleteModalHandler}
            confirmDeleteHandler={confirmDeleteHandler}>
        </DeleteConfirmation>
        <Container className="mt-2">
            <Row>
                <Col className="col-md-4 offset-md-4 d-flex justify-content-center my-3">
                    <Button variant="dark" type="button" onClick={() => navigate("/add-superhero")}>
                        Add A New Superhero
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>{contentToRender}</Col>
            </Row>
            <Row>
                <PaginationMenu
                    totalSuperheroes={allSuperheroesData.length}
                    paginate={paginate}
                />
            </Row>
        </Container>
    </>
}

export default AllSuperheroes;
