
import { useEffect, useRef, useState } from "react";
import { Profile } from "../../page";


export default function BasicInfoStep({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: any;
}) {
 

  useEffect(() => {
    // Update URL whenever domain_name changes
    setProfile((p:any) => ({ ...p, url: `https://${p.domain_name}` }));
  }, [profile.domain_name]);

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
          placeholder="Domain Name * : eg. xyz.com"
          value={profile.domain_name}
          onChange={(e) =>
            setProfile({ ...profile, domain_name: e.target.value })
          }
          className="w-full p-4 border shadow border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-transparent transition-all"
        />
        <div className="flex flex-col gap-2">
          <label>Your site Auto generated URL *</label>
          <input
            readOnly
            value={profile.url || ""}
            className="w-full p-4 border shadow border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-transparent transition-all"
          />
        </div>
      </div>
    </>
  );
}
