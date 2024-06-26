import HttpService from "../../../repository/http.service";

class UserService extends HttpService{
    listOfUsers = async({role, page=1, limit=1000}) => {
        try {
            let response = await this.getRequest(
                '/v1/user/by-role/'+role+'?page='+page+'&limit='+limit,
                {auth:true}
            )
            return response;
        } catch(exception) {
            throw exception
        }
    }
}

export default new UserService()