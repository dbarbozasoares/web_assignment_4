import { Navbar, Nav, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const MainNav = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchField = e.target.searchField.value;
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  return (
    <Navbar className="fixed-top" bg="primary" variant="dark">
      <Navbar.Brand>Diego B Soares</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} href="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} href="/artwork/search">
          Advanced Search
        </Nav.Link>
      </Nav>
      <Form className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Search Artwork"
          className="mr-2"
          name="searchField"
        />
        <Button variant="outline-light" type="submit">
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

export default MainNav;
