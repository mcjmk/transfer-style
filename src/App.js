import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Image,
  Alert,
} from 'react-bootstrap';

function App() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [imageUrl1, setImageUrl1] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState('');


  const handleFileChange = (e, setFile, setImageUrl) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));
      setError('');
    } else {
      setFile(null);
      setImageUrl(null);
      setError('Proszę wybrać plik typu JPG lub PNG.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file1 || !file2) {
      setError('Proszę wybrać oba pliki.');
      return;
    }
    setError('');
    setLoading(true);
    setResultImage(null);

    setTimeout(() => {
      setLoading(false);
      setResultImage(process.env.PUBLIC_URL + '/result.jpg');
    }, 10000);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Transfer-Style</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col md={6} lg={5} className="mb-3">
            <Form.Group controlId="formFile1">
              <Form.Label>Wybierz pierwszy obrazek (JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => handleFileChange(e, setFile1, setImageUrl1)}
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={5} className="mb-3">
            <Form.Group controlId="formFile2">
              <Form.Label>Wybierz drugi obrazek (JPG/PNG)</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => handleFileChange(e, setFile2, setImageUrl2)}
              />
            </Form.Group>
          </Col>
          <Col md={12} lg={2} className="d-flex align-items-end">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100"
            >
              {loading ? 'Przetwarzanie...' : 'Przetwórz'}
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col md={4} className="text-center mb-4">
          <h5>Obrazek 1</h5>
          {imageUrl1 ? (
            <Image src={imageUrl1} alt="Obrazek 1" fluid />
          ) : (
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '20px',
                minHeight: '200px',
              }}
            >
              Brak obrazu
            </div>
          )}
        </Col>

        <Col md={4} className="text-center mb-4">
          <h5>Obrazek 2</h5>
          {imageUrl2 ? (
            <Image src={imageUrl2} alt="Obrazek 2" fluid />
          ) : (
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '20px',
                minHeight: '200px',
              }}
            >
              Brak obrazu
            </div>
          )}
        </Col>

        <Col md={4} className="text-center mb-4">
          <h5>Wynik</h5>
          {loading ? (
            <div className="d-flex flex-column align-items-center">
              <Spinner animation="border" role="status" />
              <span className="mt-2">Ładowanie...</span>
            </div>
          ) : (
            <>
              {resultImage ? (
                <Image src={resultImage} alt="Wynik" fluid />
              ) : (
                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '20px',
                    minHeight: '200px',
                  }}
                >
                  Brak wyniku
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
