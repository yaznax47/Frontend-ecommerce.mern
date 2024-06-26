
import { Container, Row, Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export const Error404 = () => {
    
    return (<>
        <Container className="my-5" style={{background: "#ff000029"}}>
            <Row>
                <Col sm={12} className="text-center p-3">
                    <p className="text-danger">Oops! Your requested page does not exists.</p>
                    <p className="text-danger">Redirect 
                        &nbsp;&nbsp;
                        <NavLink to={"/"} className="text-decoration-none">Back to Home</NavLink>
                    </p>
                </Col>
            </Row>
        </Container>
    </>)
}