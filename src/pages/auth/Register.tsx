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
import { Link } from "react-router-dom";
import { showToast } from "../../components/Toast";
import { registerUser } from "../../config/firebaseConfig";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const doRegister = async () => {
    setBusy(true);
    if (password !== confirmPassword) {
      return showToast("Password do not match!");
    }
    if (username.trim() === "" || password.trim() === "") {
      showToast("Username and Password are required!");
    }

    const res = await registerUser(username, password);
    if (res) {
      showToast("You have registered successfully!");
    }
    setBusy(false);
  };

  return (
    <IonPage>
      <IonLoading isOpen={busy} message={"Please wait..."} duration={0} />
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
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput
            value={confirmPassword}
            type="password"
            onIonChange={(e: any) => setConfirm(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonButton onClick={doRegister}>Register</IonButton>
        <p>
          Already have an account? <Link to="/">Login Here!</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
