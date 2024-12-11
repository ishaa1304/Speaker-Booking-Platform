import { Link } from "react-router-dom";
import { Mic, Users, Calendar, Star } from "lucide-react";

export function Home() {
  const features = [
    {
      icon: <Mic className="w-8 h-8 text-blue-600" />,
      title: "Expert Speakers",
      description:
        "Connect with industry-leading speakers across various domains.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Flexible Scheduling",
      description:
        "Book sessions at your convenience with our easy scheduling system.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Interactive Sessions",
      description:
        "Engage in meaningful conversations and learn from the best.",
    },
    {
      icon: <Star className="w-8 h-8 text-blue-600" />,
      title: "Quality Assurance",
      description: "All speakers are verified and rated by our community.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Learn from the Best</span>
              <span className="block text-blue-600">Book Expert Speakers</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect with industry-leading speakers for personalized sessions.
              Enhance your knowledge and skills through one-on-one interactions.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/speakers"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Browse Speakers
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/signup-as-speaker"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Join as Speaker
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-md">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
