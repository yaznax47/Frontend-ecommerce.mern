import { Card, Container, Table, Pagination, Spinner, Badge, Image } from "react-bootstrap"
import { Heading } from "../../../component/common/heading/heading.component"
import Breadcrumb from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import categorySvc from "./category.service"
import TablePagination from "../../../component/common/pagination/pagination.component"

import Swal from 'sweetalert2'
import { TableActionButtons } from "../../../component/common/button/button.component"

const CategoryList = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState()

  const listCategories = async ({page=1,search="", limit=10}) => {
    try {
      setLoading(true)
      const response = await categorySvc.categoryLists({page, search, limit})
      setData(response.result)
      setPagination({
        ...response.meta,
        pages: (Math.ceil(response.meta.total/response.meta.limit))
      })
    } catch(exception) {
      console.log(exception)
      toast.error(exception.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // api consume 
      listCategories({page: 1})
  }, [])

  const handleDelete = async(id) => {
    try{
      setLoading(true)
      let response = await categorySvc.deleteById(id)
      toast.success("Category deleted Successfully")
      listCategories({page: 1})
    } catch(exception) {
      toast.error("Category cannot be deleted or already deleted.")
    } finally{
      setLoading(false)
    }
  }

    return (<>
        <Container fluid className="px-4">
          <Heading type={"h1"} className="mt-4" value={"Category List"}></Heading>
          <Breadcrumb data={[
            {title: "Dashboard", link: "/admin"},
            {title: "Category List", link: null}
          ]}/>
          <Card className="mb-4">
            <Card.Header>
              <Heading type={"h4"} className={"float-start"} value={"Category List"}></Heading>
              <NavLink className={"btn btn-sm btn-success float-end"} to="/admin/category/create">
                <i className="fa fa-plus"></i>&nbsp;Add Category
              </NavLink>
            </Card.Header>
            <Card.Body>
              <Table size="sm" bordered hover striped>
                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Parent</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    loading ? <tr>
                    <td colSpan={5}  className="text-center">
                      <Spinner variant="dark"></Spinner>
                    </td>
                  </tr> : (
                    
                      data ? <>
                        {
                          data.map((row, ind) => (
                            <tr key={ind}>
                              <td>{row.title}</td>
                              <td>
                                {row.description}
                              </td>
                              <td>
                                {
                                  row.parentId ? row.parentId.title : "-"
                                }
                              </td>
                              <td>
                                <Image onError={(e) => {
                                  e.target.src="https://dummyimage.com/50x30/f2f2f2/000000&text=No+image+found"
                                }} style={{maxWidth: "50px"}} fluid src={import.meta.env.VITE_IMAGE_URL+'/category/'+row.image} />
                              </td>
                              <td>
                                <Badge bg={`${row.status === 'active'? 'success' : 'danger'}`}>
                                  {row.status}
                                </Badge>
                              </td>
                              <td>
                                <TableActionButtons 
                                  editUrl={"/admin/category/"+row._id}
                                  deleteAction={handleDelete}
                                  id={row._id}
                                />
                              </td>
                            </tr>
                          ))
                        }
                      </> : <tr>
                      <td colSpan={5}  className="text-center">
                        No data found
                      </td>
                    </tr>                    
                  )
                  }
                </tbody>
              </Table>
              
              <TablePagination 
                pagination={pagination}
                dataFetch={listCategories}
              />

            </Card.Body>
              
          </Card>
        </Container>
        
    </>)
}
export default CategoryList