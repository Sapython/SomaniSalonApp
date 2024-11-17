import { authentication } from "./firebaseConfig";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ToastAndroid } from "react-native";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const isSignIn = false;
export let UserData = {};
export let Auth = "";

const showToast = async (text) => {
  ToastAndroid.showWithGravityAndOffset(
    text,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};

export const getServicePrice = async (serviceId) => {
  let price = 0;
  const docRef = doc(db, "servicePrice", serviceId);
  const docSnap = await getDoc(docRef);
  // docSnap.data();
  return (price = docSnap.data().price);
};

export const stylistFn = async () => {
  let stylist = [];
  const querySnapshot = await getDocs(collection(db, "stylists"));
  querySnapshot.forEach((doc) => {

    stylist.push(...doc.data().allStylist);
  });
  return stylist;
};

export const getServiceData = async (serviceId) => {
  let serviceData = [];

  try {
    const docRef = doc(db, "service", serviceId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      serviceData = docSnap.data().data;
      return serviceData;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveAddress = async (address) => {
  console.log("🙏🙏🙏🙏🙏");
  console.log(address);
  const dbRef = collection(db, "address");
  addDoc(dbRef, {
    fname: address.fname,
    lname: address.lname,
    address: address.Address,
    landmark: address.landmark,
    pinCode: address.pinCode,
    phoneNumber: address.phoneNumber,
    AlternativePhone: address.AlternativePhone,
    uid: address.userId,
  })
    .then((docRef) => {
      showToast("Address Saved");
    })
    .catch((error) => {
      showToast("Error" + error);
      console.log(error);
    });
};

export const getAddress = async () => {
  let address = [];
  try {
    const q = query(collection(db, "address"), where("uid", "==", UserData.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      address.push({ ...doc.data(), id: doc.id });
    });
    if (address.length > 0) {
      return address;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const servicesFn = async () => {
  let service = [];
  const querySnapshot = await getDocs(collection(db, "services"));
  querySnapshot.forEach((doc) => {
    service.push(...doc.data().all_services);
  });
  return service;
};

export const authenticationServices = async () => {
  authentication.onAuthStateChanged(async (user) => {
    if (user) {
      console.log("user is logged in");
      showToast("user is logged in");
      await getUser(user.uid).then((res) => {
        UserData = res;
      });
    } else {
      console.log("user is not logged out");
      showToast("user is logged out");
    }
  });
  return UserData;
};

updateUser = async (userId) => {
  await getUser(user.uid)
    .then((res) => {
      UserData = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export async function updateUserData(userId, data) {
  try {
    console.log("🙏🙏🙏🙏🙏");
    console.log("user id is", userId);
    console.log("🙏🙏🙏🙏🙏");
    console.log("data is", data);
    const docRef = doc(db, "users", userId);

    setDoc(docRef, data, {
      merge: true,
    })
      .then(() => {
        updateUser(userId);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

export const getPackageData=async (id)=>{
  const docRef = doc(db, "comoPackages", `${id}`);
  const docSnap = await getDoc(docRef);
  return   docSnap.data();
}

async function getUser(userId) {
  UserData = [];
  console.log("user id is", userId);
  console.log("🙏🙏🙏🙏🙏");

  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    UserData = { ...doc.data(), id: doc.id };
  });
  return UserData;
}

////login
export const login = (loginUser) => {
  console.log(loginUser);
  if (loginUser.email && loginUser.password) {
    signInWithEmailAndPassword(
      authentication,
      loginUser.email,
      loginUser.password
    )
      .then(async (user) => {
        showToast("Login Successful");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          console.log("That email address is not registered!");
          showToast("That email address is not registered!");
        } else if (error.code === "auth/wrong-password") {
          showToast("Password is incorrect!");
        } else {
          console.log(error);
        }
      });
  } else {
    return console.log("Please enter email and password");
  }
};
///signUp
export const signUp = (user) => {
  console.log(user);
  const data = createUserWithEmailAndPassword(
    authentication,
    user.email,
    user.password
  )
    .then(async (rel) => {
      console.log(rel);

      try {
        const docRef = await addDoc(collection(db, "users"), {
          first: user.fname,
          last: user.lname,
          email: user.email,
          mobileNumber: rel.user.phoneNumber,
          uid: rel.user.uid,
          photoURL: rel.user.photoURL,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    .catch((err) => {
      // console.log(err);
    });
  return data;
};
export const logOut = async () => {
  await signOut(authentication)
    .then(() => {
      navigation.navigate("start");
    })
    .catch((err) => {
      console.log(err);
    });
};

export class FirebaseServices {
  // addGuest(guest: Guest) {
  //   updateDoc(doc(this.fs, 'siteData/counters'), {
  //     totalGuests: increment(1),
  //   });
  //   return addDoc(collection(this.fs, 'guests'), guest);
  // }

  // getFirstGuests(length: number) {
  //   return getDocs(
  //     query(collection(this.fs, 'guests'), orderBy('name'), limit(length))
  //   );
  // }

  getAllOffers() {
    return getDocs(query(collection(this.fs, "offers")));
  }

  // getNextGuests(length: number, lastDocument: DocumentSnapshot) {
  //   return getDocs(
  //     query(
  //       collection(this.fs, 'guests'),
  //       orderBy('name'),
  //       limit(length),
  //       startAfter(lastDocument)
  //     )
  //   );
  // }

  // getPreviousGuests(length: number, firstDocument: DocumentSnapshot) {
  //   return getDocs(
  //     query(
  //       collection(this.fs, 'guests'),
  //       orderBy('name'),
  //       limitToLast(length),
  //       endAt(firstDocument)
  //     )
  //   );
  // }

  // editGuest(guestId: string, guest: Guest) {
  //   return updateDoc(doc(this.fs, 'guests/' + guestId), guest);
  // }

  // deleteGuest(guestId: string) {
  //   updateDoc(doc(this.fs, 'siteData/counters'), {
  //     totalGuests: increment(-1),
  //   });
  //   return deleteDoc(doc(this.fs, 'guests/' + guestId));
  // }
  //
}

export const SignInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
