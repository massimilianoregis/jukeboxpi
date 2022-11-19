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
    static async pause(){
        return (await services.get(`/jukebox/pause`)).data
    }
    static async continue(){
        return (await services.get(`/jukebox/play`)).data
    }
    static async next(){
        return (await services.get(`/jukebox/next`)).data
    }
}