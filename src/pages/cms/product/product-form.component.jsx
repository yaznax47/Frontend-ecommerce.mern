import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { ErrorMessage } from "../../../component/common/validation-message/validation-message.component";
import { MultipleImageUploader } from "../../../component/common/form/input.component";
import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../component/common/button/button.component";
import placeholder from "../../../assets/image/placeholder.webp"

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

import categorySvc from "../category/category.service"
import brandSvc from "../brand/brand.service"
import userSvc from "../user/user.service";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const ProductForm = ({submitEvent, loading=false, detail=null}) => {
    const [thumb, setThumb] = useState()
    const [cats, setCats] = useState()
    const [brands, setBrands] = useState()
    const [sellers, setSellers] = useState()
    let [attributes, setAttributes] = useState([{
        key: null, 
        value: []
    }])

    const loadCats = async() => {
        try {
            let response = await categorySvc.categoryLists({page:1, limit: 100})
            if(response.result.length) {
                let data = []
                response.result.map((item) => {
                    data.push({
                        value: item._id, 
                        label: item.title
                    })
                })
                setCats(data);                
            }
        } catch(exception) {

        }
    }

    const loadBrands = async() => {
        try {
            let response = await brandSvc.brandLists({page:1, limit: 300})
            if(response.result.length) {
                let data = []
                response.result.map((item) => {
                    data.push({
                        value: item._id, 
                        label: item.title
                    })
                })
                setBrands(data);                
            }
        } catch(exception) {

        }
    }

    const loadSellers = async() => {
        try {
            const response = await userSvc.listOfUsers({role: "seller"})
            setSellers(response.result)
        } catch(exception) {

        }
    }

    useEffect(() => {
        loadCats()
        loadBrands()
        loadSellers()
    }, [])
    

    const productSchema = Yup.object({
        title: Yup.string().min(3).required(),
        summary: Yup.string().required(),
        description: Yup.string().optional(),
        category: Yup.array(Yup.object(
            {
                label: Yup.string(),
                value: Yup.string()
            }
        )),
        brand: Yup.object(
            {
                label: Yup.string(),
                value: Yup.string()
            }
        ).optional(),
        price: Yup.number().min(1).required(),
        discount: Yup.number().min(0).default(0).max(100).optional(),
        tag: Yup.array(Yup.object(
            {
                label: Yup.string(),
                value: Yup.string(),
                __isNew__: Yup.boolean()
            }
        )),
        sellerId: Yup.string(),
        attributes: Yup.array(
            Yup.object({
                key: Yup.string(),
                value: Yup.array(Yup.object(
                    {
                        label: Yup.string(),
                        value: Yup.string(),
                        __isNew__: Yup.boolean()
                    }
                ))
            })
        ).nullable().optional(),
        status: Yup.string().matches(/^(active|inactive)$/, {message: "Status can only be active or inactive"})
    })
    const {register,setValue, handleSubmit, setError, formState: {errors}} =useForm({
        resolver: yupResolver(productSchema)
    })

    const submitForm =(data) => {
        // mapping 
        const sendAttribute = [];
        attributes.map((singAttr) => {
            sendAttribute.push({
                key: singAttr.key,
                value: singAttr.value.map((val) => val.value)
            })
        })

        // const mappedData = {
        //     title: data.title,
        //     summary: data.summary,
        //     description: data.description,
        //     category: (data.category.map((cat) => cat.value)).join(","),
        //     brand: data.brand.value,
        //     price: data.price,
        //     discount: data.discount,
        //     tag: (data.tag.map((tag) => tag.value)).join(","),
        //     sellerId: data.sellerId,
        //     status: data.status,
        //     attributes: sendAttribute,
        //     images: data.images
        // }
        // formData 
        // multipart/form-data  ===> multiple files
        const catsStr = (data.category.map((cat) => cat.value)).join(",");
        const tags = (data.tag.map((tag) => tag.value)).join(",")

        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("summary", data.summary)
        formData.append("description", data.description)
        formData.append("category", catsStr)
        formData.append("brand", data.brand.value)
        formData.append("price", data.price)
        formData.append("discount", data.discount)
        formData.append("tag", tags)
        formData.append("sellerId", data.sellerId)
        formData.append("status", data.status)
        
        
        sendAttribute.map((attr, ind) => {
            formData.append(`attributes[${ind}][key]`, attr['key'])
            attr.value.map((val, indx) => {
                formData.append(`attributes[${ind}][value][${indx}]`, val)
            })
        })
        data.images.map((img) => {
            formData.append("images", img, img.filename)
        })

        submitEvent(formData)
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

    const addAttributes = (e) => {
        // old value 
        attributes.push({
            key: null, 
            value: []
        })
        setAttributes([
            ...attributes
        ])

    }

    const deleteAttribute =(ind) => {
        attributes.splice(ind, 1)
        setAttributes([
            ...attributes
        ])
    }

    console.log(errors)
    return (<>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Title: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="text"
                        placeholder="Enter Product Title..."
                        size="sm"
                        {...register('title', {required: true})}
                    />
                    <ErrorMessage message={errors?.title?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Summary: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        as={"textarea"}
                        placeholder="Enter Product summary..."
                        size="sm"
                        rows={5}
                        style={{resize: "none"}}
                        {...register('summary', {required: true})}
                    />
                    <ErrorMessage message={errors?.summary?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Description: </Form.Label>
                <Col sm={9}>
                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle("height","200px",editor.editing.view.document.getRoot());
                            });
                        }}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData()
                            setValue("description", data)
                        } }                      
                    />
                    <ErrorMessage message={errors?.description?.message}/>
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Cateogry: </Form.Label>
                <Col sm={9}>
                    <Select 
                        options={cats} 
                        isMulti 
                        onChange={(selcCats) => {
                            setValue("category", selcCats)
                        }}
                    />
                    <ErrorMessage message={errors?.category?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Brand: </Form.Label>
                <Col sm={9}>
                    <Select 
                        options={brands}  
                        onChange={(selcBrands) => {
                            setValue("brand", selcBrands)
                        }}
                    />
                    <ErrorMessage message={errors?.brand?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Price: </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="number"
                        placeholder="Enter Product Price..."
                        size="sm"
                        {...register('price', {required: true, min: 1})}
                    />
                    <ErrorMessage message={errors?.title?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Discount(%): </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type="number"
                        placeholder="Enter Product Discount..."
                        size="sm"
                        {...register('price', {required: false, min: 0, max: 100})}
                    />
                    <ErrorMessage message={errors?.discount?.message}/>
                </Col>
            </Form.Group>
            
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Tag: </Form.Label>
                <Col sm={9}>
                    <CreatableSelect isMulti isClearable options={[]} onChange={(e) => {
                        setValue("tag", e)
                    }} />
                    <ErrorMessage message={errors?.tag?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Seller: </Form.Label>
                <Col sm={9}>
                    <Form.Select size="sm" {...register("sellerId")}>
                        <option value="">--Select Any one--</option>
                        {
                            sellers && sellers.length && sellers.map((row, ind) => (
                                <option value={row._id} key={ind}>
                                    {row.name}
                                </option>
                            ))
                        }
                    </Form.Select>
                    <ErrorMessage message={errors?.sellerId?.message}/>
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Attributes: </Form.Label>
                <Col sm={9}>
                    {
                        attributes && attributes.length && attributes.map((row, ind) => (
                            <Row className="mb-3" key={ind}>
                                <Col sm={5}>
                                    <Form.Control 
                                        type="text"
                                        onChange={(e)=> {
                                            const value = e.target.value;
                                            attributes[ind]['key'] = value
                                            setAttributes([
                                                ...attributes
                                            ])
                                        }}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <CreatableSelect isMulti isClearable options={[]} onChange={(newContent) => {
                                         attributes[ind]['value'] = newContent
                                         setAttributes([
                                             ...attributes
                                         ])
                                    }} />
                                </Col>
                                <Col sm={1}>
                                    {
                                        ind !== 0 && <Button onClick={(e) => {
                                            e.preventDefault()
                                            deleteAttribute(ind)
                                        }} type="button" variant="danger">
                                                    <i className="fa fa-trash"></i>
                                                </Button>
                                    }
                                </Col>
                            </Row>
                        ))
                    }

                    <Row>
                        <Col sm={{offset: 9, span: 3}}>
                            <Button 
                                onClick={addAttributes}
                                type="button" size="sm" variant="success" className="float-end">
                                    <i className="fa fa-plus"></i> Add More
                            </Button>
                        </Col>
                    </Row>
                    
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
                <Col sm={3}>
                    <MultipleImageUploader 
                        setThumb={setThumb}
                        setValue={setValue}
                        setError={setError}
                    />
                    <ErrorMessage message={errors?.image?.message} />
                </Col>
                <Col sm={6}>
                    <Row>
                        {
                            thumb && thumb.length && thumb.map((image, ind) => (
                                <Col sm={2} key={ind}>
                                    <Image src={
                                        image 
                                            ? 
                                                (typeof image === 'string') 
                                                    ? import.meta.env.VITE_IMAGE_URL+"product/"+image 
                                                    : URL.createObjectURL(image) 
                                            : 
                                        placeholder
                                    } fluid alt="" />
                                </Col>
                            ))
                        }
                    </Row>
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

export default ProductForm;