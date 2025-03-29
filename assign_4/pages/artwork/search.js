import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, Col, Spinner, Form, Button } from "react-bootstrap";
import ArtworkCard from "../../components/ArtworkCard";
import Link from "next/link";

const ArtworkSearch = () => {
  const router = useRouter();
  const { q = "", page = 1 } = router.query;
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [searchField, setSearchField] = useState(q || "");
  const resultsPerPage = 20;

  useEffect(() => {
    if (q) {
      const fetchArtworks = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${q}&hasImages=true&page=${page}`
          );
          const data = await response.json();
          setTotalResults(data.total || 0);
          // Fetching detailed artwork data for each objectID
          if (data.objectIDs) {
            const artworkDetails = await Promise.all(
              data.objectIDs.slice(0, resultsPerPage).map(async (id) => {
                if (!id) return null; // Skip if the objectID is invalid or undefined
                const artworkResponse = await fetch(
                  `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
                );
                const artworkData = await artworkResponse.json();
                return artworkData;
              })
            );
            setArtworks(artworkDetails.filter((artwork) => artwork !== null));
          }
        } catch (err) {
          setError("Failed to fetch artworks");
        } finally {
          setLoading(false);
        }
      };
      fetchArtworks();
    }
  }, [q, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchField.trim()) {
      router.push(`/artwork/search?q=${searchField.trim()}&page=1`);
    }
  };

  const handlePagination = (newPage) => {
    router.push(`/artwork/search?q=${q}&page=${newPage}`);
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);

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
    <div>
      <h2>Search Artworks</h2>
      <Form className="d-flex mb-4" onSubmit={handleSearch}>
        <Form.Control
          type="text"
          placeholder="Search by artwork name"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="mr-2"
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <Row>
        {artworks.length === 0 ? (
          <Col className="text-center mt-5">No artworks found for {q}</Col>
        ) : (
          artworks.map((artwork) => (
            <Col key={artwork.objectID} xs={12} md={4} lg={3}>
              <ArtworkCard artwork={artwork} />
              <Link href={`/artwork/${artwork.objectID}`}>
                <Button variant="link">View Details</Button>
              </Link>
            </Col>
          ))
        )}
      </Row>

      <div className="pagination mt-4 d-flex justify-content-center">
        <Button
          variant="secondary"
          onClick={() => handlePagination(Number(page) - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <span className="mx-3">{`Page ${page} of ${totalPages}`}</span>
        <Button
          variant="secondary"
          onClick={() => handlePagination(Number(page) + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ArtworkSearch;
