"use client";
console.log("Cloud name:",process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>تجربة رفع الصور إلى Cloudinary</h1>

<CldUploadWidget 
  uploadPreset="aQskblef"
  onSuccess={(result) => {
    setImageUrl(result.info.secure_url);
  }}
>
  {({ open }) => (
    <button 
      type="button"
      onClick={() => open()} 
      style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', borderRadius: '5px' }}
    >
      اضغط هنا لرفع صورة
    </button>
  )}
</CldUploadWidget>
      {imageUrl && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'green', marginBottom: '10px' }}>تم الرفع بنجاح!</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: '300px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
        </div>
      )}
    </main>
  );
}
