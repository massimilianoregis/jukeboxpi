import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonRange, IonRow, IonSlide, IonSlides, IonTitle, IonToolbar } from '@ionic/react';
import { group, groupCollapsed } from 'console';
import { alarm, chevronBack, chevronBackCircle, chevronBackSharp, chevronForward, chevronForwardCircle, musicalNote, musicalNotes, musicalNoteSharp, pause, pin, play, playSkipForward, shuffle, volumeHigh, volumeLow, volumeMute } from "ionicons/icons";
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';


interface IGroup{
  name:string,
  items:number,
  time:number,
  play?:boolean,
  background?:string,
  onClick?:any
}
const Group:React.FC<IGroup>=({name,items,time,background,play=false,onClick=()=>{}})=>
  <IonItem className={play?'play':''} onClick={onClick} lines="full">        
    <IonLabel className='ion-text-capitalize'>{name}</IonLabel>    
    <IonLabel slot="end">{time}' - {items} songs</IonLabel>
    {play?
    <IonIcon icon={musicalNotes} slot="end"></IonIcon>:
    <IonIcon icon={chevronForward} slot="end"></IonIcon>            
    }
  </IonItem>

interface IVolume{
  value:number,
  onChange:any
}
const Volume:React.FC<IVolume>=({value,onChange})=><IonItem lines='none' className='ion-text-center'  color="primary">
  <IonRange color="secondary" value={value} min={0} max={100} onIonChange={(e:any)=>onChange(e.detail.value)}>
    <IonIcon slot="start" icon={volumeMute} onClick={()=>onChange(value-10)}></IonIcon>
    <IonIcon slot="end" icon={volumeHigh} onClick={()=>onChange(value+10)}></IonIcon>
  </IonRange></IonItem>

interface ISong{
  title:string,
  status:string,
  author:string,
  onStatus:any
}
const Song:React.FC<ISong>=({title,author,status,onStatus})=><IonItem lines='none' className='ion-text-center'  color="primary">
  {status=="play"&&<IonButton slot="start" onClick={()=>onStatus('pause')} fill="clear" color="light"><IonIcon slot="icon-only" icon={pause}></IonIcon></IonButton>}
  {status=="pause"&&<IonButton slot="start" onClick={()=>onStatus('play')} fill="clear" color="light"><IonIcon slot="icon-only" icon={play}></IonIcon></IonButton>}
  <IonLabel onClick={()=>onStatus(status=='pause'?'play':'pause')}>{title}<h4>{author}</h4></IonLabel>    
  <IonButton slot="end" onClick={()=>onStatus('pause')} fill="clear" color="light"><IonIcon slot="icon-only" icon={playSkipForward}></IonIcon></IonButton>
  </IonItem>  

interface IGroups{
  items:IGroup[],
  onClick?:any
}
const defBackground='https://www.crushpixel.com/big-static16/preview4/seamless-pattern-with-falling-music-2407703.jpg';
const Groups:React.FC<IGroups>=({items,onClick})=>{
  var [page,setPage] = useState(0);
  return (<IonGrid className='ion-no-padding '>
  <IonRow className="ion-align-items-center groups">
    {page>0?
      <IonCol size='1' className='ion-text-center' onClick={()=>setPage(page-1)}><IonIcon icon={chevronBackCircle} size="large" color="primary"/></IonCol>:
      <IonCol size='1' className='ion-text-center'></IonCol>
    }
    <IonCol size='10'>
        
    <IonList className="list">            
      {items.slice(4*page,(4*page)+4).map(group=>
          <Group {...group} onClick={()=>onClick(group)}/>
        )}      
    </IonList>
    
    </IonCol>
    {(page+1)<=(items.length/4)?
      <IonCol size='1' className='ion-text-center' onClick={()=>setPage(page+1)}><IonIcon icon={chevronForwardCircle} size="large" color="primary"/></IonCol>:
      <IonCol size='1' className='ion-text-center'></IonCol>
      }
  </IonRow>
</IonGrid>)}


const Home: React.FC = () => {
  var [groups,setGroups]=useState<IGroup[]>([
    {
      name:"gloomy",
      items:24,
      time:240,
      background:'//images.ctfassets.net/swt2dsco9mfe/61wqae9Nef8fE00x1QRRdC/dd9495cbec5f4d971cb0c64d5adbb683/767x550-oiwAqx0sa.jpg?h=369&w=369&fit=thumb&fm=avif',
      play:true
    },
    {
      name:"Test",
      items:12,
      time:120,
    },
    {
      name:"Dark",
      items:12,
      time:120,
      background:'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/gothic-dark-angel-with-gargoyle-ravens-black-and-white-photography-gothic-paris-cemetery-angel-kathy-fornal.jpg'
    }, {
      name:"Rock",
      items:12,
      time:120,
    },
    {
      name:"Boom",
      items:12,
      time:120,
    },
    {
      name:"Test2",
      items:12,
      time:120,
      background:'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/gothic-dark-angel-with-gargoyle-ravens-black-and-white-photography-gothic-paris-cemetery-angel-kathy-fornal.jpg'
    }, {
      name:"Bang",
      items:12,
      time:120,
    }
  ])
  var [song,setSong]= useState({
      title:"The Loneliest",
      author:"Maneskin",
      status:"play"
    })
  var [volume,setVolume]=useState<number>(80)
  var playGroups=(group:IGroup)=>{    
    console.log(group)
    groups.forEach(group=>group.play=false)
    var gr = groups.find(gr=>gr.name==group.name)
    if(gr) gr.play=true;      
    console.log(groups);
    setGroups(groups.splice(0));
  }

  return (
    <IonPage>
      <IonHeader>        
          <Song title={song.title} author={song.author} status={song.status} onStatus={(status:string)=>setSong({...song,status:status})}></Song>        
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
