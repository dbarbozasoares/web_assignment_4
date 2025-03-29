/********************************************************************************
 * WEB422 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Diego B Soares Student ID: ____145820239____ Date: __mar - 28 - 2025_______
 * Published URL: _________________https://github.com/dbarbozasoares/Assignment_3_fixed__________________________________________
 ********************************************************************************/

import { Card } from "react-bootstrap";
import Image from "next/image";

const ArtworkCard = ({ artwork }) => {
  return (
    <Card className="mb-4">
      {artwork.primaryImage && (
        <Card.Img
          variant="top"
          src={artwork.primaryImage}
          alt={artwork.title}
          width={300}
          height={300}
        />
      )}
      <Card.Body>
        <Card.Title>{artwork.title}</Card.Title>
        <Card.Text>{artwork.artistDisplayName}</Card.Text>
        <Card.Text>{artwork.objectDate}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
