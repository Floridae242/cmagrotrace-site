import React from 'react';

export default function ContactForm(){
  const [status, setStatus] = React.useState<'idle'|'submitting'|'success'|'error'>('idle');
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || 'https://formspree.io/f/mwkzorzn'; // placeholder
  const TH_PROVINCES: string[] = [
  "กรุงเทพมหานคร",
  "กระบี่","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร","ขอนแก่น",
  "จันทบุรี","ฉะเชิงเทรา","ชลบุรี","ชัยนาท","ชัยภูมิ","ชุมพร",
  "เชียงราย","เชียงใหม่","ตรัง","ตราด","ตาก",
  "นครนายก","นครปฐม","นครพนม","นครราชสีมา","นครศรีธรรมราช","นครสวรรค์",
  "นนทบุรี","นราธิวาส","น่าน","บึงกาฬ","บุรีรัมย์","ปทุมธานี",
  "ประจวบคีรีขันธ์","ปราจีนบุรี","ปัตตานี","พระนครศรีอยุธยา",
  "พังงา","พัทลุง","พิจิตร","พิษณุโลก","เพชรบุรี","เพชรบูรณ์",
  "แพร่","พะเยา","ภูเก็ต","มหาสารคาม","มุกดาหาร","แม่ฮ่องสอน",
  "ยโสธร","ยะลา","ร้อยเอ็ด","ระนอง","ระยอง","ราชบุรี",
  "ลพบุรี","ลำปาง","ลำพูน","เลย","ศรีสะเกษ","สกลนคร",
  "สงขลา","สตูล","สมุทรปราการ","สมุทรสงคราม","สมุทรสาคร",
  "สระแก้ว","สระบุรี","สิงห์บุรี","สุโขทัย","สุพรรณบุรี",
  "สุราษฎร์ธานี","สุรินทร์","หนองคาย","หนองบัวลำภู",
  "อ่างทอง","อุดรธานี","อุตรดิตถ์","อุทัยธานี","อุบลราชธานี","อำนาจเจริญ"
  ];


  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('submitting');
    try{
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(res.ok){
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    }catch{
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="small">Name</label>
          <input name="name" required className="w-full mt-1 rounded-xl border border-neutral-300 px-3 py-2" />
        </div>
        <div>
          <label className="small">Organization</label>
          <input name="organization" className="w-full mt-1 rounded-xl border border-neutral-300 px-3 py-2" />
        </div>
        <div>
            <label htmlFor="role" className="small">Role</label>
            <select id="role"name="role"required defaultValue=""className="w-full mt-1 rounded-xl border border-neutral-300 px-3 py-2 bg-white">
                <option value="" disabled>Choose a role</option>
                <option value="FARMER">Farmer</option>
                <option value="PACKHOUSE">Packhouse</option>
                <option value="BUYER">Buyer</option>
                <option value="CONSUMER">Consumer</option>
                <option value="AUDITOR">Auditor / Inspector</option>
                <option value="TRANSPORT">Transport / Logistics</option>
                <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="small">Email</label>
          <input type="email" name="email" required className="w-full mt-1 rounded-xl border border-neutral-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="province" className="small"> Province (จังหวัด) </label>
            <select id ="province" name="province" required defaultValue="" className="w-full mt-1 rounded-xl border border-neutral-300 px-3 py-2 bg-white">
              <option value="" disabled>เลือกจังหวัด</option>
               {TH_PROVINCES.map(p => (<option key={p} value={p}>{p}</option> ))}
            </select>
        </div>

        <div>
          <label className="small">Monthly Volume</label>
          <input name="volume" className="w-full mt-1 rounded-xl border border-neutral-300 px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="small">Message</label>
        <textarea name="message" rows={4} className="w-full mt-1 rounded-xl border border-neutral-300 px-3 py-2"></textarea>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary" disabled={status==='submitting'}>Request Pilot Access</button>
        {status === 'success' && <span className="small text-emerald-700">Thanks! We review weekly.</span>}
        {status === 'error' && <span className="small text-rose-700">Something went wrong. Try again.</span>}
      </div>
      <p className="small text-neutral-500">We respect privacy. We only use your data for pilot review.</p>
    </form>
  );
}
