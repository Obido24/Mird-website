"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const initialState = {
  name: '',
  email: '',
  message: ''
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('saving');
    setFeedback('');

    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setFeedback('Please complete all fields before sending.');
      return;
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Unable to save inquiry.');
      }

      setForm(initialState);
      setStatus('success');
      setFeedback("Thanks. Your message has been sent to MIDR.");
    } catch {
      setStatus('error');
      setFeedback("We couldn't send the message right now. Please try again.");
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="label" htmlFor="message">
              Message
            </label>
              <Textarea
              id="message"
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              placeholder="Tell us about your project, training need, or support request."
            />
          </div>
          <Button type="submit" className="w-full" disabled={status === 'saving'}>
            {status === 'saving' ? 'Sending...' : 'Send Inquiry'}
          </Button>
          {feedback ? (
            <p className={status === 'success' ? 'text-sm text-success' : 'text-sm text-danger'}>{feedback}</p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
