import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLoading,
} from "@ionic/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logoutUser } from "../config/firebaseConfig";

const Home: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const history = useHistory();
  const [busy, setBusy] = useState(false);

  const doLogout = async () => {
    setBusy(true);
    await logoutUser();
    history.replace("/");
    setBusy(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading isOpen={busy} message={"Logging out..."} duration={0} />
      <IonContent className="ion-padding" fullscreen>
        <IonTitle>Hello {user.username}</IonTitle>
        <IonButton onClick={doLogout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
