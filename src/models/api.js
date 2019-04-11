const API_ROOT = process.env.API_ROOT || "http://localhost:3000/";

export const Globals = {
    user: null,
    errors: [],
    deleteError(i){
        this.errors.splice(i,1);
    }
}

export function login(){
    Globals.user = {name: "Bernie"};
}

// fetch function wrapper; holds HTTP message that contains JSON function
// calling 'then' is resolving the promise
//export function api(url, data){
//    return fetch(API_ROOT + url).then(x => x.json);
//}

export async function api(url, data){
    let response = null;
    let headers = { "Authorization": `Bearer ${Globals.token}`}
    if(!data){
        response = await fetch(API_ROOT + url, {headers});
    }else{
        response = await fetch(API_ROOT + url, {
            method: "POST",
            cache: "no-cache",
            headers: {
                ...headers, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }
    if(!response.ok){
        throw await response.json();
    }
    return await response.json();
}
