import axios from 'axios';

var services = axios.create();
export default class Services{
    static async info(){
        return (await services.get("/jukebox")).data
    }
    static async play(name:string){
        return (await services.get(`/jukebox/playlist/${name}/play`)).data
    }
    static async volume(value:number){
        return (await services.get(`/jukebox/volume/${value}`)).data
    }
    
}