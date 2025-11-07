import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-1/2 bg-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-1/2 bg-purple-400/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-md w-full">
        {/* Animated Logo */}
        <div className="relative mx-auto w-28 h-28 mb-6">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-spin duration-3000"></div>

          {/* Middle ring */}
          <div className="absolute inset-3 border-4 border-white/40 rounded-full animate-spin duration-2000 reverse"></div>

          {/* Inner core with book icon */}
          <div className="absolute inset-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="text-white text-center">
              {/* Book icon */}
              <div className="relative w-10 h-12 mx-auto mb-1">
                <div className="absolute inset-0 bg-white/30 rounded transform rotate-6 animate-pulse"></div>
                <div className="absolute inset-1 bg-white/60 rounded transform -rotate-3 animate-pulse delay-300"></div>
                <div className="absolute inset-2 bg-white rounded animate-pulse delay-500 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">R</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating dots */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            <span className="block bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent bg-size-200 animate-gradient">
              Rehbar Online
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-base sm:text-lg font-light tracking-wide">
            Your Educational Guide
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mx-auto max-w-xs">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full animate-loading-progress"></div>
          </div>

          {/* Loading Text */}
          <p className="text-white/60 text-sm font-medium animate-pulse">
            Preparing your learning environment...
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 pt-4">
          <div className="w-2 h-2 bg-white rounded-full animate-loading-dot"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-loading-dot animation-delay-150"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-loading-dot animation-delay-300"></div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-white/40 text-xs font-light">
          Empowering Education in Jammu & Kashmir
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
