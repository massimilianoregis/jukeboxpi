import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Home.css';
import { IGroup } from '../components/Group';
import { Groups } from '../components/\Groups';
import { Song,ISong } from '../components/Song';
import { Volume } from '../components/Volume';
import Services from '../util/service';


const Home: React.FC = () => {  
  var timer:any=null;
  useEffect(()=>{if(timer==null) timer=setInterval(load,2000);},[])  
  var [groups,setGroups]=useState<IGroup[]>([])
  const setStatus=(value:string)=>{
    if(!song)return;
    console.log(value)
    song.status=value;
    setSong(song)    
  }
  var [song,setSong]= useState<ISong|null>(null)
  var [volume,setVolume]=useState<number>(80)
  useEffect(()=>{Services.volume(volume);},[volume])
  var playGroups=(group:IGroup)=>{        
    groups.forEach(group=>group.play=false)
    var gr = groups.find(gr=>gr.name===group.name)
    if(gr) gr.play=true;      
    console.log(groups);
    setGroups(groups.splice(0));

    Services.play(group.name);
  }

  const load =()=>{
    Services.info().then(data=>{
      var {info}=data;
      setSong({
        title:info.title,
        author:info.artist,
        status:info.status
      })

      var {playlist}=data;
      setGroups(
        playlist.map(({name,items}:any)=>({
          name:name,
          items:items,
          time:"unknown",
          play:false
        }))
      )
    })
  }

  return (
    <IonPage>
      <IonHeader>        
          {song&&<Song title={song.title} author={song.author} status={song.status} onStatus={setStatus}></Song>}
      </IonHeader>
      <IonContent fullscreen>
        <Groups items={groups} onClick={playGroups}/>
      </IonContent>
      <IonFooter>        
        <Volume value={volume} onChange={(value:number)=>setVolume(value)}></Volume>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
