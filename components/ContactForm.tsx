import React, { useCallback, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { validateContactForm, ContactFormData } from '../lib/validation';
import { TH_PROVINCES } from '../lib/constants';

export default function ContactForm(){
  const [status, setStatus] = React.useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [generalError, setGeneralError] = React.useState<string | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const endpoint = process.env.NEXT_PUBLIC_FIREBASE_FUNCTION_URL || '/api/submitContact';
  const [touched, setTouched] = React.useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [formData, setFormData] = React.useState<Partial<ContactFormData>>({});

  // Reset form state when unmounting
  useEffect(() => {
    return () => {
      setStatus('idle');
      setErrors({});
      setGeneralError(null);
      setTouched({});
      setFormData({});
    };
  }, []);

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleRetry = useCallback(() => {
    setStatus('idle');
    setGeneralError(null);
    setRetryCount(prev => prev + 1);
  }, []);

  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    const validationErrors = validateContactForm(data);
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce<Partial<Record<keyof ContactFormData, string>>>((acc, {field, message}) => ({
        ...acc,
        [field]: message
      }), {});
      setErrors(errorMap);
      setTouched(Object.keys(errorMap).reduce((acc, field) => ({
        ...acc,
        [field]: true
      }), {}));
      return;
    }

    setStatus('submitting');
    try {
      // Add retry and timeout logic
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Retry-Count': retryCount.toString()
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if(res.ok){
        setStatus('success');
        form.reset();
        setTouched({});
      } else {
        let detail = '';
        try {
          const j = await res.json();
          if (j?.errors) {
            detail = Array.isArray(j.errors) ? j.errors.map((x:any)=>x.message).join(', ') : String(j.errors);
          } else if (j?.error) {
            detail = typeof j.error === 'string' ? j.error : JSON.stringify(j.error);
          }
        } catch {}
        setGeneralError(`${res.status} ${res.statusText}${detail ? ' — ' + detail : ''}`);
        setStatus('error');
      }
    } catch(err:any) {
      setGeneralError(err?.message || 'Network error');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 grid gap-4" noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="small" htmlFor="name">Name</label>
          <input 
            id="name" 
            name="name" 
            required 
            className={`w-full mt-1 rounded-xl border px-3 py-2 ${
              touched.name && errors.name 
                ? 'border-rose-500 bg-rose-50' 
                : 'border-neutral-300'
            }`}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            value={formData.name || ''}
          />
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-rose-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="small" htmlFor="organization">Organization</label>
          <input 
            id="organization" 
            name="organization" 
            className="w-full mt-1 rounded-xl border border-neutral-300 px-3 py-2" 
            onChange={handleChange}
            onBlur={() => handleBlur('organization')}
            value={formData.organization || ''}
          />
        </div>

        <div>
          <label htmlFor="role" className="small">Role</label>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className={`w-full mt-1 rounded-xl border px-3 py-2 bg-white ${
              touched.role && errors.role 
                ? 'border-rose-500 bg-rose-50' 
                : 'border-neutral-300'
            }`}
            onBlur={() => handleBlur('role')}
          >
            <option value="" disabled>Choose a role</option>
            <option value="FARMER">Farmer</option>
            <option value="PACKHOUSE">Packhouse</option>
            <option value="BUYER">Buyer</option>
            <option value="CONSUMER">Consumer</option>
            <option value="AUDITOR">Auditor / Inspector</option>
            <option value="TRANSPORT">Transport / Logistics</option>
            <option value="ADMIN">Admin</option>
            <option value="OTHER">Other</option>
          </select>
          {touched.role && errors.role && (
            <p className="mt-1 text-sm text-rose-600">{errors.role}</p>
          )}
        </div>

        <div>
          <label className="small" htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            required 
            className={`w-full mt-1 rounded-xl border px-3 py-2 ${
              touched.email && errors.email 
                ? 'border-rose-500 bg-rose-50' 
                : 'border-neutral-300'
            }`}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            value={formData.email || ''}
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-rose-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="province" className="small">Province (จังหวัด)</label>
          <select
            id="province"
            name="province"
            required
            defaultValue=""
            className={`w-full mt-1 rounded-xl border px-3 py-2 bg-white ${
              touched.province && errors.province 
                ? 'border-rose-500 bg-rose-50' 
                : 'border-neutral-300'
            }`}
            onBlur={() => handleBlur('province')}
          >
            <option value="" disabled>เลือกจังหวัด</option>
            {TH_PROVINCES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {touched.province && errors.province && (
            <p className="mt-1 text-sm text-rose-600">{errors.province}</p>
          )}
        </div>

        <div>
          <label className="small" htmlFor="volume">Monthly Volume</label>
          <input 
            id="volume" 
            name="volume" 
            className={`w-full mt-1 rounded-xl border px-3 py-2 ${
              touched.volume && errors.volume 
                ? 'border-rose-500 bg-rose-50' 
                : 'border-neutral-300'
            }`}
            onBlur={() => handleBlur('volume')}
          />
          {touched.volume && errors.volume && (
            <p className="mt-1 text-sm text-rose-600">{errors.volume}</p>
          )}
        </div>
      </div>

      <div>
        <label className="small" htmlFor="message">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows={4} 
          className={`w-full mt-1 rounded-xl border px-3 py-2 ${
            touched.message && errors.message 
              ? 'border-rose-500 bg-rose-50' 
              : 'border-neutral-300'
          }`}
          onBlur={() => handleBlur('message')}
        />
        {touched.message && errors.message && (
          <p className="mt-1 text-sm text-rose-600">{errors.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button 
          type="submit"
          className="btn btn-primary inline-flex items-center gap-2" 
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
        >
          {status === 'submitting' && <LoadingSpinner />}
          Request Pilot Access
        </button>

        {status === 'success' && (
          <div className="flex items-center gap-2 text-emerald-700" role="status">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="small">Thanks! We review weekly.</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-2" role="alert">
            <div className="text-rose-700">
              <span className="small">Something went wrong. </span>
              {generalError && (
                <span className="small italic">({generalError})</span>
              )}
              <button 
                type="button"
                onClick={handleRetry}
                className="ml-2 text-rose-800 hover:text-rose-900 underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="small text-neutral-500">
        We respect privacy. We only use your data for pilot review.
      </p>
    </form>
  );
}
