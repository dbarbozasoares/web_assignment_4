import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

function ArtworkCardDetail({ objectID }) {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
        const data = await response.json();
        setArtwork(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load artwork details");
        setLoading(false);
      }
    };

    if (objectID) {
      fetchArtwork();
    }
  }, [objectID]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-5">{error}</div>;
  }

  return (
    <Card>
      <Card.Img
        variant="top"
        src={artwork.primaryImage || "/default-image.jpg"}
        alt={artwork.title || "No image available"}
      />
      <Card.Body>
        <Card.Title>{artwork.title || "Untitled"}</Card.Title>
        <Card.Text>
          <strong>Artist:</strong>{" "}
          {artwork.artistDisplayName || "Unknown Artist"}
        </Card.Text>
        <Card.Text>
          <strong>Creation Date:</strong> {artwork.objectDate || "Unknown Date"}
        </Card.Text>
        <Card.Text>
          <strong>Medium:</strong> {artwork.medium || "Unknown Medium"}
        </Card.Text>
        <Card.Text>
          <strong>Dimensions:</strong>{" "}
          {artwork.dimensions || "Unknown Dimensions"}
        </Card.Text>
        <Card.Text>
          <strong>Classification:</strong>{" "}
          {artwork.classification || "Unknown Classification"}
        </Card.Text>
        <Card.Text>
          <strong>Credit Line:</strong>{" "}
          {artwork.creditLine || "No credit line available"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ArtworkCardDetail;
