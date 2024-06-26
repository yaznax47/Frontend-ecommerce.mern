import { Container, Card, Spinner } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { useNavigate, useParams } from "react-router-dom"
import CategoryForm from "./category-form.component"
import { useEffect, useState } from "react"
import categorySvc from "./category.service"
import { toast } from "react-toastify"

const CategoryEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()
    const [detail, setDetail] = useState()
    
    const editCategory = async (data) => {
        try {
            setLoading(true);
            let response = await categorySvc.updateCategory(params.id, data)
            toast.success("Category updated successfully.")
            navigate("/admin/category")
        } catch(exception) {
            toast.error("Category cannot be editd at this moment.")
            console.log(exception)

        } finally{
            setLoading(false)
        }
    }

    const getById = async () => {
        try {
            setLoading(true)
            const response = await categorySvc.getCategoryById(params.id)
            setDetail({
                title: response.result.title, 
                description: response.result.description, 
                status: response.result.status, 
                image: response.result.image
            })
        } catch(exception) {
            toast.error("Category cannot be fetched at this moment")
            navigate("/admin/category")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getById()
    }, [params])

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Category Edit"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Category List", link: "/admin/category"},
            {title: "Category Edit", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Category Edit Form"}></Heading>
            </Card.Header>
            <Card.Body>
                
                {
                    loading ? <><Spinner variant="dark"/></> : 
                    <CategoryForm 
                        submitEvent={editCategory}
                        loading={loading}
                        detail={detail}
                    />
                }

            </Card.Body>
              
          </Card>
        </Container>
    </>)
}

export default CategoryEdit