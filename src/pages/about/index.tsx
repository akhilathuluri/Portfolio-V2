import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchImage } from '@/components/ui/sketch-image';
import { SketchButton } from '@/components/ui/sketch-button';
import { FileText, Mail } from 'lucide-react';

export function AboutPage() {
  const openResume = () => {
    window.open('https://athuluri-akhil.vercel.app/assets/Akhil_Resume.pdf', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <SketchContainer className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SketchText as="h1" className="text-4xl mb-6 font-sketch">
                About Me
              </SketchText>
              <SketchText as="p" className="text-xl mb-6 font-sketch">
                I am a passionate software developer skilled in Java, Angular, Node.js, and AI-driven solutions, with a focus on building scalable, user-friendly applications. From developing AI web scrapers to creating secure file management systems, I thrive on solving complex problems with innovative approaches.
              </SketchText>
              <SketchText as="p" className="text-lg mb-8 font-sketch">
                As a Microsoft Learn Student Ambassador and community lead, I mentor developers and lead workshops to foster growth and collaboration. Always exploring cutting-edge technologies, I aim to craft impactful digital experiences that balance functionality, aesthetics, and performance. 🚀
              </SketchText>
              <div className="flex gap-4">
                <SketchButton onClick={openResume} className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Resume
                </SketchButton>
                <SketchButton 
                  variant="outline" 
                  onClick={() => window.location.href = '/contact'}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </SketchButton>
              </div>
            </div>
            {/* <div className="transform rotate-2">
              <SketchImage
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
                alt="Creative Process"
                className="w-full"
              />
            </div> */}
            <div className="order-1 md:order-2">
              <SketchImage
                 src="https://athuluri-akhil.vercel.app/assets/profile-photo%20(Large).png"
                 alt="Creative Process"
                 className="w-[400px] h-[400px] mx-auto"
                 isCircle={true}
               />
            </div>
          </div>
        </SketchContainer>
      </div>
    </div>
  );
}