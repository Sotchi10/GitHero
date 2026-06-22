import Description from "./../components/Description";
import { useAuth } from "../../../context/AuthContext";

const Profile = () => {
  const { profile, error } = useAuth();

  return (
    <section className="py-18 px-10">
      <h4>{profile?.username || "Profile"}'s Profile</h4>

      {error && <p className="mt-3 text-red-400">{error}</p>}

      <Description />
    </section>
  );
};

export default Profile;
