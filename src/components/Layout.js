import { Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';

const Layout = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-center mb-3">
        <Navbar.Brand href="#home" className="fs-2">Superheroes</Navbar.Brand>
      </Navbar>
      <Container>{props.children}</Container>
    </>
  );
};
export default Layout;