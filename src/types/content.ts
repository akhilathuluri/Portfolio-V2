export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at?: string;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  icon?: string;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  created_at?: string;
}