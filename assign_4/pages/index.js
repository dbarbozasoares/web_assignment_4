import { Row, Col, Image } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Row>
        <Col>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            alt="Metropolitan Museum of Art"
            fluid
            rounded
          />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p>
            The Metropolitan Museum of Art (The Met) is located in New York City
            and is one of the largest and most prestigious museums in the world.
          </p>
        </Col>
        <Col lg={6}>
          <p>
            It contains over two million works of art from around the world and
            spans 5,000 years of history.
          </p>
          <a
            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
            target="_blank"
            rel="noreferrer"
          >
            Learn more
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
