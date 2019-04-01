const API_ROOT = process.env.API_ROOT || "http://localhost:3000/";

export const Globals = {
    user: null
}

export function login(){
    Globals.user = {name: "Bernie"};
}

// fetch function wrapper; holds HTTP message that contains JSON function
// calling 'then' is resolving the promise
//export function api(url, data){
//    return fetch(API_ROOT + url).then(x => x.json);
//}

export function api(url, data){
    if(!data){
    return fetch(API_ROOT + url).then(x => x.json);
    }else{
        return fetch(url, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json());
    }
}