import React, { useState } from 'react';
import { 
  Download, 
  GitBranch, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  FolderArchive, 
  ShieldCheck, 
  FileCode2, 
  Sparkles,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ExportGitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportGitHubModal: React.FC<ExportGitHubModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);
  const [repoName, setRepoName] = useState('barangay-bugo-system');
  const [githubUser, setGithubUser] = useState('YOUR-GITHUB-USERNAME');

  if (!isOpen) return null;

  const handleCopy = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2500);
  };

  const gitCliCommands = `# 1. Extract the downloaded archive and open the directory
unzip barangay-bugo-system.zip -d ${repoName}
cd ${repoName}

# 2. Initialize git and commit files
git init
git add .
git commit -m "Initial commit: Barangay Bugo Resident Assistance Management System"
git branch -M main

# 3. Connect to your GitHub repository and push
git remote add origin https://github.com/${githubUser}/${repoName}.git
git push -u origin main`;

  const npmCommands = `# Install all project dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1e40af] text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-blue-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <GitBranch className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                Export System to GitHub
                <span className="text-xs bg-yellow-400 text-blue-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Ready
                </span>
              </h2>
              <p className="text-blue-100 text-sm mt-0.5">
                Download the complete codebase archive and push to your GitHub repository
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-gray-700">
          
          {/* Main Download Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-lg shadow-sm">
                <FolderArchive className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Project Archive Package (.ZIP)</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Contains all 44+ source files, configs, Vite setup, Tailwind CSS v4, icons, and detailed documentation.
                </p>
                <div className="flex items-center gap-3 text-xs text-blue-700 font-medium mt-2">
                  <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-600" /> Clean & Verified</span>
                  <span>•</span>
                  <span>Zero node_modules bloat</span>
                  <span>•</span>
                  <span>Includes README.md</span>
                </div>
              </div>
            </div>
            <a
              href="/barangay-bugo-system.zip"
              download="barangay-bugo-system.zip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1E3A8A] hover:bg-[#172554] text-white font-medium rounded-xl shadow-md transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={18} />
              <span>Download ZIP</span>
            </a>
          </div>

          {/* Quick Config for Commands */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Customize Your GitHub Push Commands
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">GitHub Username / Org</label>
                <input 
                  type="text"
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value.trim() || 'YOUR-GITHUB-USERNAME')}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. johnpaul16"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Repository Name</label>
                <input 
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value.trim() || 'barangay-bugo-system')}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  placeholder="e.g. barangay-bugo-system"
                />
              </div>
            </div>
          </div>

          {/* Step 1: GitHub Instructions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">1</span>
                <h4 className="font-semibold text-gray-900 text-sm">Create an empty repository on GitHub</h4>
              </div>
              <a 
                href="https://github.com/new" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
              >
                Open github.com/new <ExternalLink size={12} />
              </a>
            </div>
            <p className="text-xs text-gray-500 pl-8">
              Name your repository (e.g. <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">{repoName}</code>). Leave it empty without initializing README or .gitignore.
            </p>
          </div>

          {/* Step 2: Push Commands */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">2</span>
                <h4 className="font-semibold text-gray-900 text-sm">Push Code to GitHub via Terminal</h4>
              </div>
              <button
                onClick={() => handleCopy(gitCliCommands, 'git')}
                className="text-xs inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-medium px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                {copiedStep === 'git' ? (
                  <>
                    <Check size={13} className="text-green-600" />
                    <span className="text-green-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative pl-8">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-gray-800 shadow-inner">
                {gitCliCommands}
              </pre>
            </div>
          </div>

          {/* Step 3: Run Locally */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">3</span>
                <h4 className="font-semibold text-gray-900 text-sm">Local Development Commands</h4>
              </div>
              <button
                onClick={() => handleCopy(npmCommands, 'npm')}
                className="text-xs inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-medium px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                {copiedStep === 'npm' ? (
                  <>
                    <Check size={13} className="text-green-600" />
                    <span className="text-green-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative pl-8">
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-xl text-xs font-mono overflow-x-auto border border-gray-800">
                {npmCommands}
              </pre>
            </div>
          </div>

          {/* Alternative GUI / GitHub Desktop Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Prefer a graphical interface? </span>
              You can extract the ZIP file, open <strong>GitHub Desktop</strong>, click <em>File → Add Local Repository</em>, and click <em>Publish Repository</em> directly to GitHub without using the command line!
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Archive location: <code className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-700 font-mono">/barangay-bugo-system.zip</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
