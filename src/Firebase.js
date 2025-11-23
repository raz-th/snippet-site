import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDmKqFdu3qNoNYHrIDLekISUDpq1nnuow8",

  authDomain: "snippet-bd609.firebaseapp.com",

  projectId: "snippet-bd609",

  storageBucket: "snippet-bd609.firebasestorage.app",

  messagingSenderId: "199616564560",

  appId: "1:199616564560:web:320f3910b228e8ee14f055",

  measurementId: "G-2EGMFZ9F04"

};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function storeCodeAndGetId(codeString) {
  try {
    const codesCollectionRef = collection(db, "codes");
    const docRef = await addDoc(codesCollectionRef, {
      code: codeString,
      createdAt: new Date(),
    
    });

    const documentId = docRef.id;

    console.log("Document successfully written with ID: ", documentId);
    
    return documentId;

  } catch (e) {
    console.error("Error adding document: ", e);
   
    throw e; 
  }
}

export async function getCodeById(documentId) {
  try {
    // 1. Get a reference to the specific document
    // doc(db, collectionPath, documentId)
    const docRef = doc(db, "codes", documentId);

    // 2. Fetch the document snapshot
    const docSnap = await getDoc(docRef);

    // 3. Check if the document exists
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      // 4. Extract the 'code' field from the document data
      const documentData = docSnap.data();
      const codeString = documentData.code;
      
      return codeString;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document found with ID:", documentId);
      return null;
    }

  } catch (e) {
    console.error("Error getting document:", e);
    // Re-throw the error for the calling function to handle
    throw e; 
  }
}