import { IonCol, IonGrid, IonIcon, IonList, IonRow } from '@ionic/react';
import { chevronBackCircle, chevronForwardCircle } from "ionicons/icons";
import { useState } from 'react';
import { IGroup, Group } from "./Group";

interface IGroups {
  items: IGroup[];
  onClick?: any;
}
const defBackground = 'https://www.crushpixel.com/big-static16/preview4/seamless-pattern-with-falling-music-2407703.jpg';
export const Groups: React.FC<IGroups> = ({ items, onClick }) => {
  var [page, setPage] = useState(0);
  return (<IonGrid className='ion-no-padding '>
    <IonRow className="ion-align-items-center groups">
      {page > 0 ?
        <IonCol size='1' className='ion-text-center' onClick={() => setPage(page - 1)}><IonIcon icon={chevronBackCircle} size="large" color="primary" /></IonCol> :
        <IonCol size='1' className='ion-text-center'></IonCol>}
      <IonCol size='10'>

        <IonList className="list">
          {items.slice(4 * page, (4 * page) + 4).map(group => <Group key={group.name} {...group} onClick={() => onClick(group)} />
          )}
        </IonList>

      </IonCol>
      {(page + 1) <= (items.length / 4) ?
        <IonCol size='1' className='ion-text-center' onClick={() => setPage(page + 1)}><IonIcon icon={chevronForwardCircle} size="large" color="primary" /></IonCol> :
        <IonCol size='1' className='ion-text-center'></IonCol>}
    </IonRow>
  </IonGrid>);
};
