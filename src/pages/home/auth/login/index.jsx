import { Container, Row, Col, Form } from "react-bootstrap";
import "./index.css"


import { ButtonComponent } from "../../../../component/common/button/button.component";

import { Title, Divider } from "../../../../component/common/heading/heading.component";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import authSvc from "../auth.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const LoginPage = () => {
    const storeData = useSelector((root) => {
        return root.User.testMsg
    })

    console.log({storeData})

    const navigate = useNavigate()

    const loginSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })
    const {register,handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginSchema)
    });

    const loginSubmit = async (data) => {
        try{
            let response = await authSvc.loginUser(data);
            const userDetail = response.userDetail;
            console.log(response);

            // const loggedInUser = await authSvc.getLoggedInUser()
            localStorage.setItem("_user", JSON.stringify({
                ...userDetail
            }))
            toast.success(`${userDetail.name}!! Welcome to ${userDetail.role} panel!!!`)
            navigate("/"+userDetail.role)
        } catch(exception) {
            toast.error(exception.message)
        }
    }

    useEffect(()=>{
        let token = localStorage.getItem('_au')
        let user = JSON.parse(localStorage.getItem("_user"));
        if(token && user) {
            toast.info("You are already logged In")
            navigate('/'+user.role)
        }
    },[])

    return (<>
        
        <Container className="login-wrapper my-5">
            <Row>
                <Col sm={12} md={{offset: 3, span:6}}>
                    <Title>Login Page</Title>
                </Col>
            </Row>
            <Divider />
            <Row className="my-3 pb-5">
                <Col sm={12} md={{offset: 3, span:6}}>
                    <Form onSubmit={handleSubmit(loginSubmit)}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Username: </Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="email"
                                    size="sm"
                                    {...register("email", {required: true})}
                                    placeholder="Enter your username"
                                />
                                <span className="text-danger">
                                    <em>{errors?.email?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Password: </Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="password"
                                    size="sm"
                                    {...register("password", {required: true})}
                                    placeholder="Enter your Password"
                                />
                                <span className="text-danger">
                                    <em>{errors?.password?.message}</em>
                                </span>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{offset: 3,span: 9}}>
                                Or&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="/forget-password">
                                    Forget Password?
                                </a>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{offset: 3,span: 9}}>
                                <ButtonComponent className="btn-danger me-3" type="reset" label="Cancel"></ButtonComponent>
                                <ButtonComponent type="submit" label="Login"></ButtonComponent>
                            </Col>
                        </Form.Group>
                    </Form>

                    Or&nbsp;&nbsp;&nbsp;&nbsp; <a href="/register">Create an Account</a>
                </Col>
            </Row>
        </Container>
    
    </>)
}

export default LoginPage;