import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { Profile } from "../../page";

export default function BasicInfoStep({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: any;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handlePhoto = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile((p: Profile) => ({ ...p, photo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* <div className="flex justify-center mb-6">
        <div
          onClick={() => fileRef.current?.click()}
          className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center border-4 border-dashed border-indigo-300 hover:border-indigo-500 transition-colors"
        >
          {preview ? (
            <img src={preview} className="w-full h-full rounded-full object-cover" />
          ) : (
            <Camera className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          )}
        </div>
        <input ref={fileRef} type="file" hidden onChange={handlePhoto} />
      </div> */}

      <div className="space-y-6">

        <h2 className="text-xl font-semibold text-center">
          Your Brand Information
        </h2>

        <input
          placeholder="Brand Name * : eg. xyz"
          value={profile.brand_name}
          onChange={(e) =>
            setProfile({ ...profile, brand_name: e.target.value })
          }
          className="w-full p-4 border shadow border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-transparent transition-all"
        />
        <input
          placeholder="Domain Name * : eg. https://xyz.com"
          value={profile.domain_name}
          onChange={(e) =>
            setProfile({ ...profile, domain_name: e.target.value })
          }
          className="w-full p-4 border shadow border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-transparent transition-all"
        />
      </div>
    </>
  );
}
