import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8">Welcome to Lovable App</h1>
        <div className="space-y-4">
          <Link 
            to="/simulator" 
            className="block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-xl transition"
          >
            Go to Simulator
          </Link>
          <Link 
            to="/learning" 
            className="block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-xl transition"
          >
            Go to Learning
          </Link>
          <Link 
            to="/login" 
            className="block bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-xl transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;