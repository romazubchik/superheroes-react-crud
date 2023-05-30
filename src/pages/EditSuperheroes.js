import { Container, Col, Row, Form, } from "react-bootstrap";
import { useForm, Controller } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateSuperheroAPI, getLoading, getSuperheroesById } from "../features/superheroes/superheroSlice";

const EditSuperheroes = () => {

    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const itemToEdit = useSelector(getSuperheroesById(Number(id)))

    const { control, handleSubmit } = useForm({
        defaultValues: {
            nickname: itemToEdit.nickname,
            real_name: itemToEdit.real_name,
            origin_description: itemToEdit.origin_description,
            superpowers: itemToEdit.superpowers,
            catch_phrase: itemToEdit.catch_phrase,
            images: itemToEdit.images,
        },
    });

    const updateSuperheroForm = (data) => {
        let payload = {
            id: Number(id),
            nickname: data.nickname,
            real_name: data.real_name,
            origin_description: data.origin_description,
            superpowers: data.superpowers,
            catch_phrase: data.catch_phrase,
            images: data.images,
        }

        dispatch(updateSuperheroAPI(payload))
            .unwrap()
            .then(() => {
                navigate('/');
            });
    };

    return <>
        <Container className="mt-2">
            <Row>
                <Col className="col-md-8 offset-md-2">
                    <legend>Update A Superhero</legend>
                    <Form onSubmit={handleSubmit(updateSuperheroForm)}>
                        <Form.Group className="mb-3" controlId="formNickName">
                            <Form.Label>Nickname</Form.Label>
                            <Controller
                                name="nickname"
                                control={control}
                                render={({ field }) => <Form.Control {...field} type="text" />}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formRealName">
                            <Form.Label>Real Name</Form.Label>
                            <Controller
                                name="real_name"
                                control={control}
                                render={({ field }) => <Form.Control {...field} type="text" />}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formOriginDescription">
                            <Form.Label>Origin Description</Form.Label>
                            <Controller
                                name="origin_description"
                                control={control}
                                render={({ field }) => <Form.Control {...field} type="text" />}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSuperpowers">
                            <Form.Label>Superpowers</Form.Label>
                            <Controller
                                name="superpowers"
                                control={control}
                                render={({ field }) => <Form.Control {...field} type="text" />}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCatchPhrase">
                            <Form.Label>Catchphrase</Form.Label>
                            <Controller
                                name="catch_phrase"
                                control={control}
                                render={({ field }) => <Form.Control {...field} type="text" />}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImages">
                            <Form.Label>ImageURL (Add a square image)</Form.Label>
                            <Controller
                                name="images"
                                control={control}
                                render={({ field }) => <Form.Control {...field} type="text" />}
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit" disabled={apiStatus === "pending"}>
                            {apiStatus === "pending" ? "Updating..." : "Update"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
}

export default EditSuperheroes;