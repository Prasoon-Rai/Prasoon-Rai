
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  updated_at: string;
}

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pinned repositories from GitHub API
    const fetchPinnedRepos = async () => {
      try {
        // Note: GitHub doesn't have a direct API for pinned repos, so we'll use regular repos
        // In a real implementation, you might want to use GitHub GraphQL API for pinned repos
        const response = await fetch('https://api.github.com/users/Prasoon-Rai/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        const formattedProjects = repos.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "A project built with passion and code.",
          html_url: repo.html_url,
          topics: repo.topics || [],
          language: repo.language || "JavaScript",
          stargazers_count: repo.stargazers_count,
          updated_at: repo.updated_at
        }));
        
        setProjects(formattedProjects);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        // Fallback to mock data if API fails
        setProjects([
          {
            id: 1,
            name: "Portfolio-Website",
            description: "A brutalist-inspired personal portfolio showcasing projects and skills with interactive 3D elements.",
            html_url: "https://github.com/Prasoon-Rai/portfolio",
            topics: ["react", "threejs", "tailwindcss", "typescript"],
            language: "TypeScript",
            stargazers_count: 12,
            updated_at: "2024-01-15T10:30:00Z"
          },
          {
            id: 2,
            name: "AI-Chat-Bot",
            description: "An intelligent chatbot built with machine learning capabilities for natural language processing.",
            html_url: "https://github.com/Prasoon-Rai/ai-chatbot",
            topics: ["python", "ai", "machine-learning", "nlp"],
            language: "Python",
            stargazers_count: 8,
            updated_at: "2024-01-10T14:20:00Z"
          },
          {
            id: 3,
            name: "Task-Manager-App",
            description: "A modern task management application with real-time collaboration and deadline tracking.",
            html_url: "https://github.com/Prasoon-Rai/task-manager",
            topics: ["react", "nodejs", "mongodb", "socket.io"],
            language: "JavaScript",
            stargazers_count: 15,
            updated_at: "2024-01-08T09:15:00Z"
          },
          {
            id: 4,
            name: "Weather-Dashboard",
            description: "A comprehensive weather dashboard with detailed forecasts and interactive maps.",
            html_url: "https://github.com/Prasoon-Rai/weather-dashboard",
            topics: ["vue", "api", "charts", "responsive"],
            language: "Vue",
            stargazers_count: 6,
            updated_at: "2024-01-05T16:45:00Z"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <motion.div
      className="group relative bg-white border-4 border-black hover:border-electric transition-all duration-300 transform hover:-translate-y-2"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Project card content */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="brutalist-mono text-xl font-bold text-black group-hover:text-electric transition-colors duration-300">
            {project.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>★ {project.stargazers_count}</span>
            <span className="font-jetbrains text-xs">{project.language}</span>
          </div>
        </div>

        <p className="font-space text-gray-700 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="bg-black text-white px-3 py-1 font-jetbrains text-xs font-bold tracking-wider"
            >
              {topic.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t-2 border-gray-200">
          <motion.a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-neon text-black px-6 py-3 font-space font-bold text-sm tracking-widest hover:bg-electric transition-colors duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW PROJECT →
          </motion.a>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-neon transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-electric transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );

  return (
    <section id="projects" ref={ref} className="py-20 bg-gray-100 grid-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="brutalist-heading text-5xl md:text-6xl text-black mb-8">
            MY
            <br />
            <span className="text-electric">PROJECTS</span>
          </h2>
          <div className="bg-black text-white px-8 py-4 inline-block transform -skew-x-3">
            <p className="brutalist-mono text-lg">
              SOME OF MY BEST PROJECTS
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border-4 border-gray-300 p-6 animate-pulse">
                <div className="h-6 bg-gray-300 mb-4"></div>
                <div className="h-4 bg-gray-300 mb-2"></div>
                <div className="h-4 bg-gray-300 mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-300"></div>
                  <div className="h-6 w-20 bg-gray-300"></div>
                </div>
                <div className="h-10 w-32 bg-gray-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="https://github.com/Prasoon-Rai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-4 border-black bg-white text-black px-8 py-4 font-space font-bold text-lg tracking-wider hover:bg-black hover:text-white transition-all duration-300"
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW ALL ON GITHUB
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
