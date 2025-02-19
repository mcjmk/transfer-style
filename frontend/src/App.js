import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";

function App() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [imageUrl1, setImageUrl1] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e, setFile, setImageUrl) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
      setError("");
    } else {
      setFile(null);
      setImageUrl(null);
      setError("Please select a file of type JPG or PNG.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file1 || !file2) {
      setError("Please select both images.");
      return;
    }
    setError("");
    setLoading(true);
    setResultImage(null);

    const formData = new FormData();
    formData.append("content_image", file1);
    formData.append("style_image", file2);

    try {
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8000' 
        : '';
      
      const response = await fetch(`${baseUrl}/style-transfer`, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json, image/jpeg',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK:', response.status, errorText);
        throw new Error(`Server error: ${response.status} ${errorText}`);
      }
  
      const blob = await response.blob();
      const resultImageUrl = URL.createObjectURL(blob);
      setResultImage(resultImageUrl);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Style Transfer</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col md={6} lg={5} className="mb-3">
            <Form.Group controlId="formFile1">
              <Form.Label>Select the first image (JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => handleFileChange(e, setFile1, setImageUrl1)}
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={5} className="mb-3">
            <Form.Group controlId="formFile2">
              <Form.Label>Select the second image (JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => handleFileChange(e, setFile2, setImageUrl2)}
              />
            </Form.Group>
          </Col>
          <Col
            md={12}
            lg={2}
            className="d-flex align-items-center"
            style={{ paddingTop: "1rem" }}
          >
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100"
            >
              {loading ? "Processing..." : "Process"}
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col md={4} className="text-center mb-4">
          <h5>Content image</h5>
          {imageUrl1 ? (
            <Image
              className="image"
              src={imageUrl1}
              alt="Image 1"
              fluid
            />
          ) : (
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "20px",
                minHeight: "200px",
                maxHeight: "360px",
              }}
            >
              No image
            </div>
          )}
        </Col>

        <Col md={4} className="text-center mb-4">
          <h5>Style Image</h5>
          {imageUrl2 ? (
            <Image
              className="image"
              src={imageUrl2}
              alt="Image 2"
              fluid
            />
          ) : (
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "20px",
                minHeight: "200px",
                maxHeight: "360px",
              }}
            >
              No image
            </div>
          )}
        </Col>

        <Col md={4} className="text-center mb-4">
          <h5>Result</h5>
          {loading ? (
            <div className="d-flex flex-column align-items-center">
              <Spinner animation="border" role="status" />
              <span className="mt-2">Loading...</span>
            </div>
          ) : (
            <>
              {resultImage ? (
                <Image
                  className="image"
                  src={resultImage}
                  alt="Result"
                  fluid
                />
              ) : (
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "20px",
                    minHeight: "200px",
                    maxHeight: "360px",
                  }}
                >
                  No result
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
