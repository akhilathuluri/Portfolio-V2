import { useState, useEffect, useRef } from 'react';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { supabase } from '@/lib/supabase';
import { Upload, Image as ImageIcon } from 'lucide-react';
import type { Link } from '@/types/content';

interface LinkFormProps {
  onSuccess: () => void;
  editingLink: Link | null;
  onCancel: () => void;
}

export function LinkForm({ onSuccess, editingLink, onCancel }: LinkFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setDescription(editingLink.description || '');
      setIcon(editingLink.icon || '');
    }
  }, [editingLink]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const uploadIcon = async (file: File) => {
    try {
      setUploading(true);
      setUploadError('');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('icons')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('icons')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Error uploading file');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadError('');
    
    try {
      let iconUrl = icon;
      if (iconFile) {
        iconUrl = await uploadIcon(iconFile);
      }
      
      if (editingLink) {
        const { error } = await supabase
          .from('links')
          .update({ title, url, description, icon: iconUrl })
          .eq('id', editingLink.id);

        if (error) throw error;
        onSuccess();
        onCancel();
      } else {
        const { error } = await supabase
          .from('links')
          .insert([{ title, url, description, icon: iconUrl }]);
        
        if (error) throw error;
        setTitle('');
        setUrl('');
        setDescription('');
        setIcon('');
        setIconFile(null);
        onSuccess();
      }
    } catch (error: any) {
      setUploadError(error.message || 'Error saving link');
    } finally {
      setUploading(false);
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Please upload an image file');
        return;
      }
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('File size must be less than 2MB');
        return;
      }

      setIconFile(file);
      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setIcon(previewUrl);
      setUploadError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SketchText as="h2" className="text-2xl mb-6">
        {editingLink ? 'Edit Link' : 'Add New Link'}
      </SketchText>
      
      <div>
        <SketchText as="label" className="block mb-2">Title</SketchText>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          required
        />
      </div>
      
      <div>
        <SketchText as="label" className="block mb-2">URL</SketchText>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          required
        />
      </div>
      
      <div>
        <SketchText as="label" className="block mb-2">Description</SketchText>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border-2 border-black dark:border-gray-300 rounded-lg bg-transparent"
          required
        />
      </div>
      
      <div>
        <SketchText as="label" className="block mb-2">Icon</SketchText>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 border-2 border-black dark:border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
            {icon ? (
              <img 
                src={icon} 
                alt="Link icon" 
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              style={{ display: 'none' }}
            />
            <SketchButton 
              type="button" 
              variant="outline"
              onClick={handleUploadClick}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Icon
            </SketchButton>
          </div>
        </div>
        {uploadError && (
          <p className="text-red-500 text-sm mt-2">{uploadError}</p>
        )}
      </div>
      
      <div className="flex space-x-4">
        <SketchButton 
          type="submit"
          disabled={uploading}
        >
          {uploading ? 'Saving...' : editingLink ? 'Update Link' : 'Add Link'}
        </SketchButton>
        {editingLink && (
          <SketchButton type="button" variant="outline" onClick={onCancel}>
            Cancel
          </SketchButton>
        )}
      </div>
    </form>
  );
}