import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { pause, play, playSkipForward } from "ionicons/icons";

export interface ISong {
  title: string;
  status: string;
  author: string;
  onStatus?: any;
}
export const Song: React.FC<ISong> = ({ title, author, status, onStatus }) => <IonItem lines='none' className='ion-text-center' color="primary">
  {status == "play" && <IonButton slot="start" onClick={() => onStatus('pause')} fill="clear" color="light"><IonIcon slot="icon-only" icon={pause}></IonIcon></IonButton>}
  {status == "pause" && <IonButton slot="start" onClick={() => onStatus('play')} fill="clear" color="light"><IonIcon slot="icon-only" icon={play}></IonIcon></IonButton>}
  <IonLabel onClick={() => onStatus(status == 'pause' ? 'play' : 'pause')}>{title}<h4>{author}</h4></IonLabel>
  <IonButton slot="end" onClick={() => onStatus('pause')} fill="clear" color="light"><IonIcon slot="icon-only" icon={playSkipForward}></IonIcon></IonButton>
</IonItem>;
