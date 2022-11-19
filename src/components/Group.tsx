import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { chevronForward, musicalNotes } from "ionicons/icons";
import Services from '../util/service';


export interface IGroup {
  name: string;
  items: number;
  time: number;
  playing?: boolean;
  background?: string;
  onClick?: any;
}
export const Group: React.FC<IGroup> = ({ name, items, time, background, playing = false, onClick = () => { } }) => {  

  return (<IonItem className={playing ? 'play' : ''} onClick={onClick} lines="full">
    <IonLabel className='ion-text-capitalize'>{name}</IonLabel>
    <IonLabel slot="end">{items} songs</IonLabel>
    {playing ?
      <IonIcon icon={musicalNotes} slot="end"></IonIcon> :
      <IonIcon icon={chevronForward} slot="end"></IonIcon>}
  </IonItem>)
}
