import { useCallback, useEffect, useState } from "react"
import { Col, Container, Row, Spinner, Card, Button } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import categorySvc from "../../cms/category/category.service";
import ProductSingleGrid from "../../../component/home/product/prod-single-grid.component";

const CategoryDetailPage = () => {
    const params = useParams();

    const [detail, setDetail] = useState()
    const [loading, setLoading] = useState(true)

    const getCategoryDetail = useCallback(async() => {
        try {
            let result = await categorySvc.getCategoryBySlug(params.slug)
            if(result.result) {
                setDetail(result.result)
            }
        } catch(exception) {
            toast.error("Category does not exists")
        } finally {
            setLoading(false)
        }
    }, [params.slug])

    useEffect(() => {
        getCategoryDetail()
    }, [params])
    console.log(detail)
    return (<>
        <Container fluid className="my-5 bg-light">
            {
                loading ? <Row><Col><Spinner /></Col></Row>  : (
                    detail ? <>
                        <Row>
                            <Col>
                                <h4 className="text-center">Category Detail of {detail.detail.title}</h4>
                            </Col>
                        </Row>
                        <Row>
                            {
                                detail.products && detail.products.map((prod, ind) => (
                                    <ProductSingleGrid key={ind} prod={prod} />
                                ))
                            }
                        </Row>
                    </> : <Row><Col><p className="text-center text-danger">Category does not exists</p></Col></Row>
                )
            }
        </Container>
    </>)
}

export default CategoryDetailPage