import { useState, useEffect, useRef } from 'react';
import { cn } from '@utils/cn';

interface FormState {
  name: string;
  email: string;
  phone: string;
  investmentAmount: string;
  message: string;
  investorType: 'retail' | 'nri' | 'founder' | 'hni' | '';
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  investmentAmount: '',
  message: '',
  investorType: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [form, setForm]     = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.name.trim())  next.name  = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (form.phone && !/^[+\d\s\-()]{7,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Network error');
      setStatus('success');
      setForm(INITIAL_STATE);
    } catch {
      setStatus('error');
    }
  }

  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus();
    }
  }, [status]);

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        className="contact-form-success"
        role="alert"
        aria-live="polite"
        tabIndex={-1}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="24" fill="var(--color-primary-100)" />
          <path d="M14 24l7 7 13-13" stroke="var(--color-primary-700)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3>Thank you!</h3>
        <p>We've received your message and will get back to you within 1–2 business days.</p>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact CapitalMind"
    >
      {status === 'error' && (
        <div className="contact-form__error-banner" role="alert" aria-live="assertive">
          Something went wrong. Please try again or email us at{' '}
          <a href="mailto:hello@capitalmind.in">hello@capitalmind.in</a>.
        </div>
      )}

      <div className="contact-form__row">
        <div className="form-field">
          <label htmlFor="cf-name" className="form-label">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            className={cn('form-input', errors.name && 'form-input--error')}
            value={form.name}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            disabled={status === 'submitting'}
          />
          {errors.name && (
            <p id="cf-name-error" className="form-error" role="alert">{errors.name}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="cf-email" className="form-label">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            className={cn('form-input', errors.email && 'form-input--error')}
            value={form.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            disabled={status === 'submitting'}
          />
          {errors.email && (
            <p id="cf-email-error" className="form-error" role="alert">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="contact-form__row">
        <div className="form-field">
          <label htmlFor="cf-phone" className="form-label">Phone (optional)</label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={cn('form-input', errors.phone && 'form-input--error')}
            value={form.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
            disabled={status === 'submitting'}
          />
          {errors.phone && (
            <p id="cf-phone-error" className="form-error" role="alert">{errors.phone}</p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="cf-investor-type" className="form-label">I am a...</label>
          <select
            id="cf-investor-type"
            name="investorType"
            className="form-input form-select"
            value={form.investorType}
            onChange={handleChange}
            disabled={status === 'submitting'}
          >
            <option value="">Select investor type</option>
            <option value="retail">Retail Investor</option>
            <option value="nri">NRI Investor</option>
            <option value="founder">Founder / Entrepreneur</option>
            <option value="hni">HNI / Family Office</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="cf-message" className="form-label">Message</label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          className="form-input form-textarea"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your investment goals..."
          disabled={status === 'submitting'}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg contact-form__submit"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <svg className="contact-form__spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            Sending…
          </>
        ) : 'Send Message'}
      </button>

      <style>{`
        .contact-form { display: flex; flex-direction: column; gap: var(--space-md); }

        .contact-form__error-banner {
          padding: var(--space-sm) var(--space-md);
          background-color: #fef2f2;
          border: 1px solid #fca5a5;
          border-radius: var(--radius-md);
          font-size: var(--fs-text-sm);
          color: #b91c1c;
        }

        .contact-form__row {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-md);
        }

        @media (min-width: 640px) {
          .contact-form__row { grid-template-columns: 1fr 1fr; }
        }

        .form-field { display: flex; flex-direction: column; gap: var(--space-3xs); }

        .form-label {
          font-size: var(--fs-text-sm);
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .form-label span { color: #dc2626; }

        .form-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-md);
          background-color: var(--color-surface);
          font-family: var(--font-sans);
          font-size: var(--fs-text-md);
          color: var(--color-text-primary);
          transition: border-color 150ms, box-shadow 150ms;
        }

        .form-input:focus-visible {
          outline: none;
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.12);
        }

        .form-input--error { border-color: #ef4444; }
        .form-input--error:focus-visible { box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12); }

        .form-input:disabled {
          background-color: var(--color-surface-raised);
          cursor: not-allowed;
          opacity: 0.7;
        }

        .form-select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); background-position: right 0.75rem center; background-repeat: no-repeat; background-size: 1.25rem; padding-right: 2.5rem; }

        .form-textarea { resize: vertical; min-height: 100px; }

        .form-error { font-size: var(--fs-text-xs); color: #dc2626; margin: 0; }

        .contact-form__submit { width: 100%; }

        @media (min-width: 480px) { .contact-form__submit { width: auto; } }

        .contact-form__spinner {
          animation: spin 800ms linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .contact-form-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-md);
          padding: var(--space-2xl);
        }

        .contact-form-success h3 {
          font-size: var(--fs-display-sm);
          margin: 0;
        }

        .contact-form-success p {
          color: var(--color-text-secondary);
          margin: 0;
          max-width: 40ch;
        }
      `}</style>
    </form>
  );
}
