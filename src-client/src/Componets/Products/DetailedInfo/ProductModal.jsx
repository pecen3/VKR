
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/esm/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from './ProductChart';
import '../../../App.css'
import ReprisingRules from './ReprisingRules';
import ProductCompetitors from './Competitors/ProductCompetitors';
import PriceInputs from './Competitors/PriceInput';
function ProductModal({ productInfo, show, onHide, modalChange, setModalChange}) {

  
  return (
    <Modal
      show={show}
      // size="xl"
      onHide={onHide}
      dialogClassName="product-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
 
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {productInfo.title ? (productInfo.title.slice(0,40)+ '...') : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {/* <Stack></Stack> style={{width:"1400px", height:"1000px"}} */}
        <Container >
          <Row>
            <Col xs={8} style={{zIndex:2}}> <LineChart productId={productInfo.id} modalChange={modalChange}/> </Col>
            <Col ><PriceInputs productId={productInfo.id} modalChange={modalChange} setModalChange={setModalChange} productInfo={productInfo}/></Col>
            
          </Row>
          <Row>
            <Col style={{zIndex:1}}><ReprisingRules rule_id={productInfo.rule_id} rule_description={productInfo.rule_description} rule_rule={productInfo.rule_rule} productId={productInfo.id} modalChage={modalChange} setModalChage={setModalChange}  /></Col>
            <Col xs={7} > <ProductCompetitors productId={productInfo.id} modalChange={modalChange} setModalChange={setModalChange}/></Col>
          </Row>
        </Container>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal