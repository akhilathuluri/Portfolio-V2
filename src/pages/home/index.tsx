// import { SketchContainer } from '@/components/ui/sketch-container';
// import { SketchText } from '@/components/ui/sketch-text';
// import { SketchImage } from '@/components/ui/sketch-image';
// import { SketchButton } from '@/components/ui/sketch-button';
// import { motion } from 'framer-motion';
// import { Palette, Code, Sparkles, Github, Youtube, Linkedin, Package, FileText, Mail } from 'lucide-react';
// import { useTypingAnimation } from '@/lib/hooks/use-typing-animation';
// import { FloatingTech } from '@/components/home/floating-tech';
// import { LatestPosts } from '@/components/home/latest-posts';
// import { LatestProjects } from '@/components/home/latest-projects';

// export function HomePage() {
//   const typedText = useTypingAnimation([
//     'Software Developer',
//     'Student Ambassador',
//     'Tech Enthusiast',
//     'Content Creator'
//   ], 100, 50, 2000);

//   const socialLinks = [
//     { icon: Github, href: 'https://github.com/akhilathuluri', label: 'GitHub' },
//     { icon: Youtube, href: 'https://www.youtube.com/c/Akhiltechchannel89131', label: 'YouTube' },
//     { icon: Linkedin, href: 'https://www.linkedin.com/in/athuluriakhil/', label: 'LinkedIn' },
//     { icon: Package, href: 'https://www.npmjs.com/~athuluriakhil', label: 'NPM' }
//   ];

//   const openResume = () => {
//     window.open('https://athuluri-akhil.vercel.app/assets/Akhil_Resume.pdf', '_blank');
//   };

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="max-w-6xl mx-auto space-y-16">
//         {/* Hero Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <SketchContainer className="order-2 md:order-1 transform -rotate-1">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <SketchText as="h1" className="text-5xl mb-6 font-sketch">
//                 Hello! I'm a{' '}
//                 <span className="text-blue-600 dark:text-blue-400 inline-block min-w-[12ch]">
//                   {typedText}
//                   <span className="animate-pulse">|</span>
//                 </span>
//               </SketchText>
//               <SketchText as="p" className="text-xl mb-8 font-sketch">
//                 Building seamless digital experiences with innovation and code 🚀
//               </SketchText>
//               <div className="flex gap-4 mb-8">
//                 <SketchButton onClick={() => window.location.href = '/projects'}>
//                   View My Work
//                 </SketchButton>
//                 <SketchButton variant="outline" onClick={() => window.location.href = '/contact'}>
//                   Get in Touch
//                 </SketchButton>
//               </div>
//               <div className="flex items-center gap-6">
//                 {socialLinks.map(({ icon: Icon, href, label }) => (
//                   <motion.a
//                     key={label}
//                     href={href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                     title={label}
//                   >
//                     <Icon className="w-6 h-6" />
//                   </motion.a>
//                 ))}
//               </div>
//             </motion.div>
//           </SketchContainer>
          
//           <div className="order-1 md:order-2 transform rotate-2">
//             <SketchImage
//               // src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
//               src="https://avatars.githubusercontent.com/u/89147384?v=4"
//               alt="Creative Workspace"
//               className="w-[400px] h-[400px] mx-auto"
//               isCircle={true}
//             />
//           </div>
//         </div>

//         {/* About Section */}
//         <SketchContainer className="transform rotate-1">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div className="order-2 md:order-1">
//               <SketchText as="h2" className="text-3xl mb-6">About Me</SketchText>
//               <SketchText as="p" className="text-lg mb-6">
//                 I am a passionate software developer skilled in Java, Angular, and Node.js, focused on building scalable and user-friendly applications. From AI-powered web scrapers to secure file management systems, I love solving complex problems and blending innovation with usability.
//               </SketchText>
//               <SketchText as="p" className="text-lg mb-8">
//                 As a Microsoft Learn Student Ambassador and community lead, I mentor developers and conduct workshops, fostering collaboration and continuous learning. With expertise in frontend design and backend development, I strive to create seamless digital experiences. Always exploring new technologies, I push boundaries to craft solutions that are both efficient and impactful. 🚀
//               </SketchText>
//               <div className="flex gap-4">
//                 <SketchButton onClick={openResume} className="flex items-center gap-2">
//                   <FileText className="w-4 h-4" />
//                   View Resume
//                 </SketchButton>
//                 <SketchButton 
//                   variant="outline" 
//                   onClick={() => window.location.href = '/contact'}
//                   className="flex items-center gap-2"
//                 >
//                   <Mail className="w-4 h-4" />
//                   Contact Me
//                 </SketchButton>
//               </div>
//             </div>
//             <div className="order-1 md:order-2">
//               <SketchImage
//                 src="https://athuluri-akhil.vercel.app/assets/profile-photo%20(Large).png"
//                 alt="Creative Process"
//                 className="w-[400px] h-[400px] mx-auto"
//                 isCircle={true}
//               />
//             </div>
//           </div>
//         </SketchContainer>

//         {/* Features Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <SketchContainer className="transform rotate-1">
//             <div className="text-center p-6">
//               <div className="mb-4 flex justify-center">
//                 <Palette className="w-12 h-12 text-blue-600 dark:text-blue-400" />
//               </div>
//               <SketchText as="h3" className="text-2xl mb-4 font-sketch">
//                 Intuitive Development
//               </SketchText>
//               <SketchText as="p" className="font-sketch">
//                 Building seamless digital experiences with a perfect blend of creativity and functionality
//               </SketchText>
//             </div>
//           </SketchContainer>

//           <SketchContainer className="transform -rotate-1">
//             <div className="text-center p-6">
//               <div className="mb-4 flex justify-center">
//                 <Code className="w-12 h-12 text-blue-600 dark:text-blue-400" />
//               </div>
//               <SketchText as="h3" className="text-2xl mb-4 font-sketch">
//                 Scalable Solutions
//               </SketchText>
//               <SketchText as="p" className="font-sketch">
//                 Writing efficient, maintainable, and high-performance code for real-world applications
//               </SketchText>
//             </div>
//           </SketchContainer>

//           <SketchContainer className="transform rotate-1">
//             <div className="text-center p-6">
//               <div className="mb-4 flex justify-center">
//                 <Sparkles className="w-12 h-12 text-blue-600 dark:text-blue-400" />
//               </div>
//               <SketchText as="h3" className="text-2xl mb-4 font-sketch">
//                 Tech Exploration
//               </SketchText>
//               <SketchText as="p" className="font-sketch">
//                 Leveraging cutting-edge technologies to push boundaries and drive innovation 🚀
//               </SketchText>
//             </div>
//           </SketchContainer>
//         </div>

//         {/* Latest Projects Section */}
//         <LatestProjects />

//         {/* Latest Blog Posts Section */}
//         <LatestPosts />
//       </div>
//       <FloatingTech />
//     </div>
//   );
// }

import { SketchContainer } from '@/components/ui/sketch-container';
import { SketchText } from '@/components/ui/sketch-text';
import { SketchButton } from '@/components/ui/sketch-button';
import { motion } from 'framer-motion';
import { Palette, Code, Sparkles, Github, Youtube, Linkedin, Package, FileText, Mail, ArrowDown } from 'lucide-react';
import { useTypingAnimation } from '@/lib/hooks/use-typing-animation';
import { FloatingTech } from '@/components/home/floating-tech';
import { LatestPosts } from '@/components/home/latest-posts';
import { LatestProjects } from '@/components/home/latest-projects';

export function HomePage() {
  const typedText = useTypingAnimation([
    'Software Developer',
    'Student Ambassador',
    'Tech Enthusiast',
    'Content Creator'
  ], 100, 50, 2000);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/akhilathuluri', label: 'GitHub' },
    { icon: Youtube, href: 'https://www.youtube.com/c/Akhiltechchannel89131', label: 'YouTube' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/athuluriakhil/', label: 'LinkedIn' },
    { icon: Package, href: 'https://www.npmjs.com/~athuluriakhil', label: 'NPM' }
  ];

  const openResume = () => {
    window.open('https://athuluri-akhil.vercel.app/assets/Akhil_Resume.pdf', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="min-h-[90vh] flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <SketchText as="h1" className="text-4xl md:text-6xl mb-6 font-sketch">
            Hello! I'm a{' '}
            <span className="text-blue-600 dark:text-blue-400 block mt-2">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </SketchText>
          
          <SketchText as="p" className="text-xl md:text-2xl mb-8 font-sketch max-w-2xl mx-auto">
            Building seamless digital experiences with innovation and code 🚀
          </SketchText>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <SketchButton 
              onClick={() => window.location.href = '/projects'}
              className="w-full sm:w-auto text-lg py-4"
            >
              View My Work
            </SketchButton>
            <SketchButton 
              variant="outline" 
              onClick={() => window.location.href = '/contact'}
              className="w-full sm:w-auto text-lg py-4"
            >
              Get in Touch
            </SketchButton>
          </div>

          <div className="flex justify-center gap-8">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                title={label}
              >
                <Icon className="w-8 h-8" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <SketchContainer className="h-full transform hover:rotate-1 transition-transform">
                <div className="text-center p-6">
                  <div className="mb-4 flex justify-center">
                    <Palette className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <SketchText as="h3" className="text-2xl mb-4 font-sketch">
                    Intuitive Development
                  </SketchText>
                  <SketchText as="p" className="font-sketch">
                    Building seamless digital experiences with a perfect blend of creativity and functionality
                  </SketchText>
                </div>
              </SketchContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <SketchContainer className="h-full transform hover:-rotate-1 transition-transform">
                <div className="text-center p-6">
                  <div className="mb-4 flex justify-center">
                    <Code className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <SketchText as="h3" className="text-2xl mb-4 font-sketch">
                    Scalable Solutions
                  </SketchText>
                  <SketchText as="p" className="font-sketch">
                    Writing efficient, maintainable, and high-performance code for real-world applications
                  </SketchText>
                </div>
              </SketchContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <SketchContainer className="h-full transform hover:rotate-1 transition-transform">
                <div className="text-center p-6">
                  <div className="mb-4 flex justify-center">
                    <Sparkles className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <SketchText as="h3" className="text-2xl mb-4 font-sketch">
                    Tech Exploration
                  </SketchText>
                  <SketchText as="p" className="font-sketch">
                    Leveraging cutting-edge technologies to push boundaries and drive innovation 🚀
                  </SketchText>
                </div>
              </SketchContainer>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Latest Projects Section */}
      <LatestProjects />

      {/* Latest Blog Posts Section */}
      <LatestPosts />
      
      <FloatingTech />
    </div>
  );
}