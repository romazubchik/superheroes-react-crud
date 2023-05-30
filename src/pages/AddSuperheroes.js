import { Container, Col, Row, Form, } from "react-bootstrap";
import { useForm, Controller } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNewSuperheroAPI, getLoading } from "../features/superheroes/superheroSlice";

const AddSuperheroes = () => {

    const apiStatus = useSelector(getLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            nickname: '',
            real_name: '',
            origin_description: '',
            superpowers: '',
            catch_phrase: '',
            images: '',
        },
    });

    const createNewSuperheroForm = (data) => {
        let payload = {
            nickname: data.nickname,
            real_name: data.real_name,
            origin_description: data.origin_description,
            superpowers: data.superpowers,
            catch_phrase: data.catch_phrase,
            images: data.images,
        }

        dispatch(createNewSuperheroAPI(payload))
            .unwrap()
            .then(() => {
                navigate('/');
            });
    };

    const isPending = apiStatus === "pending";

    return <>
        <Container className="mt-2">
            <Row>
                <Col className="col-md-8 offset-md-2">
                    <legend>Create A New Superhero</legend>
                    <Form onSubmit={handleSubmit(createNewSuperheroForm)}>
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
                            <Form.Label>ImageURL (To add multiple photos, insert the URLs, separating them with commas)</Form.Label>
                            <Controller
                                name="images"
                                control={control}
                                render={({ field }) => <Form.Control {...field} type="text" />}
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit" disabled={isPending}>
                            {isPending ? "Create..." : "Create"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
}

export default AddSuperheroes;