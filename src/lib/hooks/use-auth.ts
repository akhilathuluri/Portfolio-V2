import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
    checkAuth();
  }, []);

  return { user, loading };
}