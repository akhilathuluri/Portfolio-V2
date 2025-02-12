import { useNavigate } from 'react-router-dom';
import { SketchButton } from '@/components/ui/sketch-button';
import { signOut } from '@/lib/auth';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <SketchButton
      variant="outline"
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </SketchButton>
  );
}