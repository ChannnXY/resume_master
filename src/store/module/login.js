export default {
    state:{
        token:localStorage.token?localStorage.token:'',
    },
    getter:{
        token:state=>{
            return state.token;
        }
    },
    mutations:{
        changeToken:(state,token)=>{
            window.console.log(token)
            state.token = token;
            localStorage.token = token;
        },
        clearToken:state=>{
            state.token = '';
            localStorage.token =""
        }
    }
}