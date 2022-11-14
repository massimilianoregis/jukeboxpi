import { IonIcon, IonItem, IonRange } from '@ionic/react';
import { volumeHigh, volumeMute } from "ionicons/icons";

interface IVolume {
  value: number;
  onChange: any;
}
export const Volume: React.FC<IVolume> = ({ value, onChange }) => <IonItem lines='none' className='ion-text-center' color="primary">
  <IonRange color="secondary" value={value} min={0} max={100} onIonChange={(e: any) => onChange(e.detail.value)}>
    <IonIcon slot="start" icon={volumeMute} onClick={() => onChange(value - 10)}></IonIcon>
    <IonIcon slot="end" icon={volumeHigh} onClick={() => onChange(value + 10)}></IonIcon>
  </IonRange></IonItem>;
