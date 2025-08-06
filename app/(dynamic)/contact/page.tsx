"use client";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import ContactForm from "@/components/contact/contact-form";

export default function ContactPage() {
  // Using randomuser.me API for placeholder leader images
  const teamMembers = [
    {
      name: "Rahul Sharma",
      role: "CEO & Founder",
      email: "rahul@visitingcard.com",
      phone: "+91 98765 43210",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Patel",
      role: "Head of Design",
      email: "priya@visitingcard.com",
      phone: "+91 98765 43211",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Arjun Mehta",
      role: "CTO",
      email: "arjun@visitingcard.com",
      phone: "+91 98765 43212",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {"We'd"} love to hear from you! Reach out for inquiries, support, or
            partnership opportunities.
          </p>
        </div>

        {/* Contact Form + Info Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Company Information */}
          <div className="space-y-8">
            <Card className="bg-background">
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl font-bold text-foreground">
                  VisitingCard Headquarters
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        Our Office
                      </h3>
                      <p className="text-muted-foreground">
                        123 Business Park Avenue
                        <br />
                        Suite 450
                        <br />
                        Mumbai, Maharashtra 400001
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Phone</h3>
                      <p className="text-muted-foreground">
                        +91 22 1234 5678 (Office)
                        <br />
                        +91 98765 43210 (Support)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Email</h3>
                      <p className="text-muted-foreground">
                        hello@visitingcard.com (General)
                        <br />
                        support@visitingcard.com (Support)
                        <br />
                        sales@visitingcard.com (Sales)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        Business Hours
                      </h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM IST
                        <br />
                        Saturday: 10:00 AM - 4:00 PM IST
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-background">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl font-bold text-foreground">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/*contact form*/}
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Our Location
          </h2>
          <div className="rounded-xl overflow-hidden border h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.715096055512!2d72.8246093149006!3d19.0529876871111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c96a34dc4401%3A0x3ffc07e83942b13f!2s123%20Business%20Park%20Ave%2C%20Mumbai%2C%20Maharashtra%20400001!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Our Leadership Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((person, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-32 w-32 rounded-full mx-auto overflow-hidden border-4 border-primary">
                      <Image
                        src={person.image}
                        alt={person.name}
                        width={128}
                        height={128}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-foreground">
                        {person.name}
                      </h3>
                      <p className="text-primary">{person.role}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {person.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {person.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
