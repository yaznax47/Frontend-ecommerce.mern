import HttpService from "../../../repository/http.service";

class CategoryService extends HttpService {
    categoryLists = async({page=1,limit=10,search=""}) => {
        try {
            let data = await this.getRequest(
                '/v1/category?page='+page+'&limit='+limit+'&search='+search,
                {auth: true}
            )
            return data;
        } catch(exception) {
            throw exception;
        }
    }

    storeCategory = async(data) => {
        try {
            let response = await this.postRequest(
                '/v1/category',
                data,
                {file: true, auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    deleteById = async(id) => {
        try{
            let response = await this.deleteRequest(
                '/v1/category/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    updateCategory = async(id, data) => {
        try {
            let response = await this.putRequest(
                '/v1/category/'+id,
                data,
                {file: true, auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getCategoryById = async(id) => {
        try{
            let response = await this.getRequest(
                '/v1/category/'+id,
                {auth: true}
            )
            return response;
        } catch(exception) {
            throw exception;
        }
    }

    getCategoryBySlug = async(slug) => {
        try{
            let response = await this.getRequest('/v1/category/'+slug+"/slug")
            return response;
        } catch(exception) {
            throw exception
        }
    }

    getCategoryForMenu = async() => {
        try{
            let response = await this.getRequest('/v1/category/home')
            return response;
        } catch(exception) {
            throw exception
        }
    }
}

const categorySvc = new CategoryService()
export default categorySvc