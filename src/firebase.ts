import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';
import { BirthdayPerson, FormSubmissionRecord } from './types';
import { INITIAL_BIRTHDAYS } from './data/initialBirthdays';

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID if configured
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Auth and sign in anonymously in background
export const auth = getAuth(app);
signInAnonymously(auth).catch((err) => {
  console.log('Firebase Anonymous Auth status:', err.message);
});

// Test connection as required by Firestore integration
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore client is offline.');
    }
  }
}
testConnection();

const BIRTHDAYS_COLLECTION = 'birthdays';
const SUBMISSIONS_COLLECTION = 'form_submissions';

/**
 * Real-time listener for birthdays across all devices.
 * Directly propagates cloud additions, edits, and deletions.
 */
export function subscribeToBirthdays(
  onUpdate: (birthdays: BirthdayPerson[]) => void,
  onError?: (error: Error) => void
): () => void {
  const birthdaysRef = collection(db, BIRTHDAYS_COLLECTION);
  const q = query(birthdaysRef);

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const list: BirthdayPerson[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          name: data.name,
          month: Number(data.month),
          day: Number(data.day),
          phone: data.phone || undefined,
          alias: data.alias || undefined,
          customNote: data.customNote || undefined,
          isRegisteredViaForm: Boolean(data.isRegisteredViaForm),
          createdAt: data.createdAt || undefined,
        });
      });

      // Update state whenever Firestore emits
      onUpdate(list);
    },
    (err) => {
      console.error('Error in birthdays real-time snapshot:', err);
      if (onError) onError(err);
    }
  );

  return unsubscribe;
}

/**
 * Seed initial 46 members into Firestore cleanly
 */
export async function seedInitialBirthdays(): Promise<void> {
  const batch = writeBatch(db);
  INITIAL_BIRTHDAYS.forEach((person) => {
    const docRef = doc(db, BIRTHDAYS_COLLECTION, person.id);
    const data: Record<string, any> = {
      id: person.id,
      name: person.name,
      month: person.month,
      day: person.day,
      isRegisteredViaForm: false,
      createdAt: new Date().toISOString(),
    };
    if (person.phone) data.phone = person.phone;
    if (person.alias) data.alias = person.alias;
    if (person.customNote) data.customNote = person.customNote;
    batch.set(docRef, data);
  });
  await batch.commit();
}

/**
 * Add or update a birthday record in Firestore (syncs instantly to all devices)
 */
export async function saveBirthdayToFirestore(person: BirthdayPerson): Promise<void> {
  const docRef = doc(db, BIRTHDAYS_COLLECTION, person.id);
  const cleanData: Record<string, any> = {
    id: person.id,
    name: person.name.trim(),
    month: Number(person.month),
    day: Number(person.day),
    isRegisteredViaForm: Boolean(person.isRegisteredViaForm),
    createdAt: person.createdAt || new Date().toISOString(),
  };
  if (person.phone) cleanData.phone = person.phone.trim();
  if (person.alias) cleanData.alias = person.alias.trim();
  if (person.customNote) cleanData.customNote = person.customNote.trim();

  await setDoc(docRef, cleanData);
}

/**
 * Delete a birthday record from Firestore (syncs instantly to all devices)
 */
export async function deleteBirthdayFromFirestore(personId: string): Promise<void> {
  const docRef = doc(db, BIRTHDAYS_COLLECTION, personId);
  await deleteDoc(docRef);
}

/**
 * Reset Firestore collection back to the default members
 */
export async function resetBirthdaysInFirestore(): Promise<void> {
  const birthdaysRef = collection(db, BIRTHDAYS_COLLECTION);
  const snap = await getDocs(birthdaysRef);

  // Delete all existing documents in batches
  const deleteBatch = writeBatch(db);
  snap.forEach((d) => {
    deleteBatch.delete(d.ref);
  });
  await deleteBatch.commit();

  // Re-seed with initial members
  await seedInitialBirthdays();
}

/**
 * Store a submission record into Firestore
 */
export async function saveSubmissionToFirestore(submission: FormSubmissionRecord): Promise<void> {
  try {
    const docRef = doc(db, SUBMISSIONS_COLLECTION, submission.id);
    await setDoc(docRef, {
      ...submission,
      timestamp: submission.timestamp || new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Could not record submission to Firestore:', err);
  }
}
