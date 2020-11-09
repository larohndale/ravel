import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserInterface } from "./interface";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { take } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class UserService {
  static user: BehaviorSubject<UserInterface> = new BehaviorSubject(null);

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async getCurrentUser() {
    this.auth.authState.subscribe((user) => {
      this.parseUserData(user);
    });
  }

  async signOut() {
    await this.auth.signOut();
  }

  async signIn() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.auth.signInWithPopup(provider);
    return this.parseUserData(credentials.user);
  }

  async parseUserData(user: firebase.User) {
    if (!user) return;
    console.log("Fgfg");
    const cloudUser: UserInterface = ((await this.firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .pipe(take(1))
      .toPromise()) as any).data() as UserInterface;
    const currentUser: UserInterface = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      profileImg: user.photoURL,
      dateJoined: new Date(),
      ladoo: 0,
    };

    if (!cloudUser) {
      await this.firestore
        .collection("users")
        .doc(currentUser.id)
        .set(currentUser);
      UserService.user.next(currentUser);
    } else {
      UserService.user.next(cloudUser);
    }

    this.firestore
      .collection("users")
      .doc(user.uid)
      .snapshotChanges()
      .subscribe((user) => {
        UserService.user.next(user.payload.data() as UserInterface);
      });
  }
}
