import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import HomePage from "../pages/home/landing/home.page"
import { Error404 } from "../pages/common/error.page";

import CategoryDetailPage from "../pages/home/category/category-detail.page";
import CategoryDetailLayout from "../pages/home/category/category-detail.layout.page";
import AdminDashboard from "../pages/cms/dashboard/dashboard.page";
import PermissionCheck from "../pages/common/checkPermission.page";

import {LoginPage, ForgetPassword, SetPasswordPage, RegistrationPage} from "../pages/home/auth"
import * as Layout from "../pages/layouts"
import { BannerList, BannerLayout, BannerCreate, BannerEdit } from "../pages/cms/banner";
import { BrandList, BrandLayout, BrandCreate, BrandEdit } from "../pages/cms/brand";
import { ProductList, ProductLayout, ProductCreate, ProductEdit } from "../pages/cms/product";
import { CategoryList, CategoryLayout, CategoryCreate, CategoryEdit } from "../pages/cms/category";

const Routing = () => {
    return (<>
        <ToastContainer />

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout.HomeLayout />}>
                    <Route index element={<HomePage />} />
                    
                    <Route path="register" element={<RegistrationPage />} />
                    <Route path="activate/:token" element={<SetPasswordPage />} />
                    <Route path="forget-password" element={<ForgetPassword />} />
                    
                    <Route path="login" element={<LoginPage />} />

                    <Route path="category/:slug" element={<CategoryDetailLayout />} >
                        <Route index element={<CategoryDetailPage />}></Route>
                        <Route path=":childCat" element={<CategoryDetailPage />}></Route>
                    </Route>
                    <Route path="*" element={<Error404 />}/>
                </Route>

                <Route path="/admin" element={<PermissionCheck accessBy={"admin"} Component={<Layout.CMSLayout />}>Content</PermissionCheck>}>
                    
                    <Route index element={<AdminDashboard />}></Route>
                    
                    <Route path="banner" element={<BannerLayout />}>
                        <Route index element={<BannerList />}></Route>
                        <Route path="create" element={<BannerCreate />}></Route>
                        <Route path=":id" element={<BannerEdit />}></Route>
                    </Route>

                    <Route path="brand" element={<BrandLayout />}>
                        <Route index element={<BrandList />}></Route>
                        <Route path="create" element={<BrandCreate />}></Route>
                        <Route path=":id" element={<BrandEdit />}></Route>
                    </Route>

                    <Route path="category" element={<CategoryLayout />}>
                        <Route index element={<CategoryList />}></Route>
                        <Route path="create" element={<CategoryCreate />}></Route>
                        <Route path=":id" element={<CategoryEdit />}></Route>
                    </Route>

                    <Route path="product" element={<ProductLayout />}>
                        <Route index element={<ProductList />}></Route>
                        <Route path="create" element={<ProductCreate />}></Route>
                        <Route path=":id" element={<ProductEdit />}></Route>
                    </Route>

                    <Route path="*" element={<Error404 />}/>
                </Route>
                
            </Routes>
                
        </BrowserRouter>
    </>)
}

export default Routing;