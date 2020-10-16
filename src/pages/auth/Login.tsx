import {
  IonContent,
  IonPage,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonLoading,
} from "@ionic/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { showToast } from "../../components/Toast";
import { setUserState } from "../../config/action";
import { loginUser } from "../../config/firebaseConfig";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const doLogin = async () => {
    setBusy(true);
    const res: any = await loginUser(username, password);
    if (res) {
      dispatch(setUserState(res.user));
      history.replace("/home");
      showToast("You have login in!");
    }
    setBusy(false);
  };

  return (
    <IonPage>
      <IonLoading isOpen={busy} message={"Logging in..."} duration={0} />
      <IonContent className="ion-padding" fullscreen>
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            value={username}
            onIonChange={(e: any) => setUsername(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            value={password}
            type="password"
            onIonChange={(e: any) => setPassword(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonButton onClick={doLogin}>Login</IonButton>
        <p>
          Dont have an account? <Link to="/register">Register Here!</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
