import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import './Home.css';
import { IGroup } from '../components/Group';
import { Groups } from '../components/\Groups';
import { Song,ISong } from '../components/Song';
import { Volume } from '../components/Volume';
import Services from '../util/service';
import { useSay } from '../hooks/useSay';



const Home: React.FC = () => {  
  const {say} = useSay();

  var timer:any=null;
  useEffect(()=>{if(timer==null) timer=setInterval(load,2000);},[])    

  var [groups,setGroups]=useState<IGroup[]>([])
  const setStatus=(value:string)=>{
    if(!song)return;
    
    song.status=value;
    if(value==="play") {
      say(song.title)
      Services.continue();      
    }
    if(value==="pause") {
      Services.pause();
      say("pause")
    }
    setSong(song)    
  }
  var [song,setSong]= useState<ISong|null>(null)
  
  var [volume,setVolume]=useState<number>(80)
  useEffect(()=>{Services.volume(volume);},[volume])  
  
  var playGroups=(group:IGroup)=>{            
    Services.play(group.name);
  }

  const next =()=>{
    Services.next();
  }
  const load =()=>{    
    
    Services.info().then(data=>{
      var {info}=data;
      setSong({
        title:info.title,
        author:info.artist,
        status:info.status
      })
      setVolume(info.volume)

      var {playlist}=data;
      setGroups(
        playlist.map(({name,items,playing}:any)=>({
          name:name,
          items:items,
          time:"n",
          playing:playing
        }))
      )
    })
  }

  return (
    <IonPage>
      <IonHeader>        
          {song&&<Song title={song.title} author={song.author} status={song.status} onStatus={setStatus} onNext={next}></Song>}
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
