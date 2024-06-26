import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { ErrorMessage } from "../../../component/common/validation-message/validation-message.component";
import { ImageUploader } from "../../../component/common/form/input.component";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../component/common/button/button.component";
import placeholder from "../../../assets/image/placeholder.webp"
import categorySvc from "./category.service";

const CategoryForm = ({submitEvent, loading=false, detail=null}) => {
    const [thumb, setThumb] = useState()
    const [cats, setCats] =useState()

    const [showParent, setShowParent] = useState(false)

    const categorySchema = Yup.object({
        title: Yup.string().min(3).required(),
        description: Yup.string().optional(),
        parentId: Yup.string().optional().nullable(),
        status: Yup.string().matches(/^(active|inactive)$/, {message: "Status can only be active or inactive"})
    })
    const {register,setValue, handleSubmit, setError, formState: {errors}} =useForm({
        resolver: yupResolver(categorySchema)
    })

    const submitForm =(data) => {
        // mapping 
        submitEvent(data)
    }

    useEffect(() => {
        if(detail) {
            (Object.keys(detail)).map((field, ind) => {
                if(field !== 'image') {
                    setValue(field, detail[field])
                }
            })
            setThumb(detail.image)
        }
    }, [detail])


    const fetchAllCats = async() => {
        try {
            const allData = await categorySvc.categoryLists({page: 1, limit: 100})
            setCats(allData.result)
        } catch(exception) {

        }
    }

    useEffect(() => {
        // if(showParent) {
            fetchAllCats()
        // }
    }, [])

    return (<>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Title: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="text"
                        placeholder="Enter Category Title..."
                        size="sm"
                        {...register('title', {required: true})}
                    />
                    <ErrorMessage message={errors?.title?.message}/>
                </Col>
            </Form.Group>


            {/* <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Show Cat List: </Form.Label>
                <Col sm={9}>
                    <Form.Check 
                        size={'sm'}
                        onChange={(e) => {
                            setShowParent(!showParent)
                        }}
                    />
                    <ErrorMessage message={errors?.title?.message}/>
                </Col>
            </Form.Group> */}

            
                
                <Form.Group className="row mb-3">
                    <Form.Label className="col-sm-3">Sub-category Of: </Form.Label>
                    <Col sm={9}>
                        <Form.Select size="sm" {...register("parentId")}>
                            <option value="">--Select Any one--</option>
                            {
                                cats && cats.map((row, ind) =>(
                                    <option key={ind} value={row._id}>
                                        {row.title}
                                    </option>
                                ))
                            }
                        </Form.Select>
                        <ErrorMessage message={errors?.parentId?.message}/>
                    </Col>
                </Form.Group>
               

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Description: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        as={"textarea"}
                        placeholder="Enter Category Descritpion..."
                        size="sm"
                        rows={5}
                        style={{resize: "none"}}
                        {...register('description', {required: false})}
                    />
                    <ErrorMessage message={errors?.description?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Status: </Form.Label>
                <Col sm={9}>
                    <Form.Select size="sm" {...register("status")}>
                        <option value="">--Select Any one--</option>
                        <option value="active">Publish</option>
                        <option value="inactive">Un-Publish</option>
                    </Form.Select>
                    <ErrorMessage message={errors?.status?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Image: </Form.Label>
                <Col sm={7}>
                    <ImageUploader 
                        setThumb={setThumb}
                        setValue={setValue}
                        setError={setError}
                    />
                    <ErrorMessage message={errors?.image?.message} />
                </Col>
                <Col sm={2}>
                    <Image src={
                        thumb 
                            ? 
                                (typeof thumb === 'string') ? import.meta.env.VITE_IMAGE_URL+"category/"+thumb : URL.createObjectURL(thumb) 
                            : 
                        placeholder
                    } fluid alt="" />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Col sm={{offset: 3, span: 9}}>
                    <ButtonComponent label="Cancel" type="reset" className="btn-danger me-3" loading={loading} />
                    <ButtonComponent label="Submit" type="submit" className="btn-success" loading={loading} />
                </Col>
            </Form.Group>

            
        </Form>
    </>)
}

export default CategoryForm;