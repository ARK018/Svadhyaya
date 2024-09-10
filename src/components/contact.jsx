import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Navbar from "./navbar";
import { Navigate, useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const googleFormURL =
      "https://docs.google.com/forms/d/e/1FAIpQLScBPufLUptOzTh7zXNh_v0_QMN7GQ0NQonOUYUfOkLM8he4Yw/formResponse";

    const formBody = new URLSearchParams({
      "entry.404813931": formData.name,
      "entry.1043142005": formData.email,
      "entry.658864774": formData.feedback,
    });

    try {
      const response = await fetch(googleFormURL, {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        setSubmissionStatus("Thank you for your feedback!");
        setFormData({ name: "", email: "", feedback: "" });
        navigate("/success");
      } else {
        setSubmissionStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmissionStatus("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh_-_80px)]">
        <Card className="mx-auto max-w-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl">Contact Us</CardTitle>
              <CardDescription>
                Enter your email below to send your feedback to us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 pb-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Type your message here."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
              {submissionStatus && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  {submissionStatus}
                </div>
              )}
            </CardContent>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Contact;
