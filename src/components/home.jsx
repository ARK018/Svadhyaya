import React from "react";
import Navbar from "./navbar.jsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BookOpen, Brain, Award, ArrowRight } from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gray-100 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              {/* Left side: Title, content, and button */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-5xl font-bold mb-4 text-gray-800 leading-normal">
                  Welcome to Svadhyaya : <br />A Self Learning Platform
                </h1>
                <p className="text-xl mb-6 text-gray-600">
                  Your personalized platform for mastering engineering <br />
                  subjects through quizzes tailored to your syllabus.
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Get Started
                </button>
              </div>

              {/* Right side: Image */}
              <div className="md:w-1/2">
                <img
                  src="/hero.jpg"
                  alt="Hero Image"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16 h-[600px] flex">
          <div className="container mx-auto px-4 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Svadhyaya?
            </h2>
            <div className="grid grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Comprehensive Syllabus</CardTitle>
                  <CardDescription>
                    Covers a wide range of engineering subjects
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Brain className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>AI-Generated Questions</CardTitle>
                  <CardDescription>
                    Powered by Gemini for high-quality MCQs
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Track Your Progress</CardTitle>
                  <CardDescription>
                    Monitor your improvement over time
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Boost Your Engineering Knowledge?
            </h2>
            <p className="text-xl mb-8">
              Join Svadhyaya today and start acing your exams!
            </p>
            <Button size="lg">
              Sign Up Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-black/20 border py-6">
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Left Section: Text */}
            <h2 className="text-lg font-bold">Svadhyaya</h2>

            {/* Right Section: Social Icons */}
            <div className="flex space-x-6">
              <a href="#" className="hover:text-gray-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
