import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/lib/auth';
import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin');
    }
  };

  return (
    <SketchContainer className="max-w-md mx-auto p-8">
      <SketchText as="h1" className="text-3xl mb-6 text-center">Admin Login</SketchText>
      {error && (
        <SketchText className="text-red-500 mb-4 text-center">{error}</SketchText>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <SketchText as="label" className="block mb-2">Email</SketchText>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
            required
          />
        </div>
        <div>
          <SketchText as="label" className="block mb-2">Password</SketchText>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
            required
          />
        </div>
        <SketchButton type="submit" className="w-full">Login</SketchButton>
      </form>
    </SketchContainer>
  );
}