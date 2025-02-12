import { useState } from 'react';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { sendEmail } from '@/lib/email-service';
import type { EmailData } from '@/lib/email-service';

export function ContactPage() {
  const [formData, setFormData] = useState<EmailData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: null, message: '' });

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: 'Failed to send message. Please try again later.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <SketchContainer className="transform -rotate-1">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <SketchText as="h1" className="text-4xl mb-6 font-sketch">
                  Let's Connect!
                </SketchText>
                <SketchText as="p" className="text-lg text-gray-600 dark:text-gray-400 font-sketch">
                  Have a question or want to work together? Drop me a message!
                </SketchText>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 transform hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center rotate-3">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <SketchText className="font-sketch">Email  </SketchText>
                    <SketchText className="text-gray-600 dark:text-gray-400 font-sketch">
                        8309889800a@gmail.com
                    </SketchText>
                  </div>
                </div>

                {/* <div className="flex items-center gap-4 transform hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center -rotate-3">
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <SketchText className="font-sketch">Phone</SketchText>
                    <SketchText className="text-gray-600 dark:text-gray-400 font-sketch">
                      +1 (555) 123-4567
                    </SketchText>
                  </div>
                </div> */}

                <div className="flex items-center gap-4 transform hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center rotate-3">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <SketchText className="font-sketch">Location  </SketchText>
                    <SketchText className="text-gray-600 dark:text-gray-400 font-sketch">
                        Hyderabad, IN
                    </SketchText>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.type && (
                <div
                  className={`p-4 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  } font-sketch`}
                >
                  {status.message}
                </div>
              )}

              <div>
                <SketchText as="label" htmlFor="name" className="block mb-2 font-sketch">
                  Name
                </SketchText>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent font-sketch"
                  required
                  disabled={sending}
                />
              </div>

              <div>
                <SketchText as="label" htmlFor="email" className="block mb-2 font-sketch">
                  Email
                </SketchText>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent font-sketch"
                  required
                  disabled={sending}
                />
              </div>

              <div>
                <SketchText as="label" htmlFor="subject" className="block mb-2 font-sketch">
                  Subject
                </SketchText>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent font-sketch"
                  required
                  disabled={sending}
                />
              </div>

              <div>
                <SketchText as="label" htmlFor="message" className="block mb-2 font-sketch">
                  Message
                </SketchText>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent font-sketch"
                  required
                  disabled={sending}
                />
              </div>

              <SketchButton 
                type="submit" 
                className="w-full font-sketch"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </SketchButton>
            </form>
          </div>
        </SketchContainer>
      </div>
    </div>
  );
}