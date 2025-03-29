import { useRouter } from "next/router";
import { Row, Col, Spinner } from "react-bootstrap";
import ArtworkCardDetail from "../../components/ArtworkCardDetail";

function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  if (!objectID) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}

export default ArtworkById;
