import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, app, googleProvider } from "../firebase"; // adjust path as needed
import {getDatabase, set, ref} from 'firebase/database';
 // adjust path as needed
const database = getDatabase(app);

function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token and the user info
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user); // User is now signed in
      // You can redirect or update state here
      const displayName = user.displayName; // User's full name
      const email = user.email; // User's email address
      const photoURL = user.photoURL; // User's profile picture URL
      const uid = user.uid; // User's unique ID in Firebase

      const reference = ref(database, 'users/' + uid);
      set(reference, {
        name: displayName,
        email: email,
      });

      console.log("User signed in:", {
        name: displayName,
        email: email,
        photo: photoURL,
        uid: uid
      });
    } catch (error) {
      console.error(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // Handle errors here
    }
  };

  return (
    <button 
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
    >
      <img 
        src="https://static.vecteezy.com/system/resources/previews/011/598/471/original/google-logo-icon-illustration-free-vector.jpg" 
        alt="Google logo" 
        className="w-5 h-5 mr-2"
      />
      Sign in with Google
    </button>
  );
}

export default GoogleSignInButton;