import { Col, Card } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const ProductSingleGrid = ({prod}) => {
    return (<>
    <Col sm={6} md={4} lg={3}>
        <Card >
            <Card.Img style={{aspectRatio: "3/2",objectFit: "contain"}} variant="top" src={import.meta.env.VITE_IMAGE_URL+"product/"+prod.images[0]} />
            <Card.Body as={"div"}>
                <Card.Title>{prod.title}</Card.Title>
                <Card.Text>
                    {prod.summary}
                </Card.Text>
                <p>
                    {
                        new Intl.NumberFormat('en-np', {style:"currency", currency: "npr"}).format(prod.afterDiscount)
                    }
                </p>
                <NavLink className="btn btn-sm btn-warning" to={'/product/'+prod.slug}>
                    View Detail
                </NavLink>
            </Card.Body>
            </Card>
    </Col>
    
    </>)
}

export default ProductSingleGrid