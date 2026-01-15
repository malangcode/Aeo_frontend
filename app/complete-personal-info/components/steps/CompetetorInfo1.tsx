import { Profile } from "../../page";

interface Props {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

export default function Competitor1InfoStep({ profile, setProfile }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">competitor's Information 1</h2>

      <input
        type="text"
        placeholder="competitor's Brand Name *"
        value={profile.competitor1_brand_name}
        onChange={e =>
          setProfile(prev => ({ ...prev, competitor1_brand_name: e.target.value }))
        }
        className="w-full p-4 border shadow border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-transparent transition-all"
      />

      <input
        type="text"
        placeholder="competitor's Domain Name * : eg. https://xyz.com"
        value={profile.competitor1_domain_name}
        onChange={e =>
          setProfile(prev => ({ ...prev, competitor1_domain_name: e.target.value }))
        }
        className="w-full p-4 border shadow border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-transparent transition-all"
      />
    </div>
  );
}
