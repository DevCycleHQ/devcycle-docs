import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { LightningBoltIcon, CubeIcon, ChipIcon } from "@heroicons/react/outline";

const sections = [
  {
    name: "Getting Started",
    link: "/home",
    description:
      "Find everything you need to get up and running with DevCycle here. From creating your account to getting your first Feature live in production this is your end-to-end guide to getting started.",
    icon: LightningBoltIcon,
    cta: "Get Started Now",
  },
  {
    name: "Using Our SDKs",
    link: "/sdk",
    description:
      "Find the right SDK for your codebase and the best way to implement it for your needs. These docs include our supported functions as well as unique behaviors on different platforms.",
    icon: CubeIcon,
    cta: "Explore Our SDKs",
  },
  {
    name: "Using Our Management APIs",
    link: "/management-api/",
    description:
      "A complete reference guide to our Management APIs. If you prefer controlling your whole feature management program in code, this is the place for you to go deep into our end-to-end APIs.",
    icon: ChipIcon,
    cta: "Explore Our APIs",
  },
];

const Welcome = () => {
  return (
    <div className="bg-blue-100 dark:bg-gray-900">
      <header>
        <div>
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Coming Soon!</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-blue-200">
                    At DevCycle we're not just creating tools for better feature management, we're living it. We use our
                    own tools day-in and day-out to improve our own processes and help us to be a better engineering
                    organization.
                  </p>
                  <p className="mt-4 text-lg leading-6 text-blue-200">
                    This section will be devoted to helping you go beyond understanding how to use DevCycle, and learn
                    how to get the most out of it. Our goal is to help Feature Development teams achieve their goals and
                    perform at an Elite level.
                  </p>
                  <p className="mt-4 text-lg leading-6 text-blue-200">So check back soon for some great content!</p>
                </div>
              </div>
              <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                <img
                  className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-6 lg:translate-y-20"
                  src="Coming-Soon-Image.png"
                  alt="Coming Soon"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="mt-5">
        <section className="max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8" aria-labelledby="get-started">
          <h2 className="sr-only" id="get-started">
            Get Started
          </h2>
          <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
            {sections.map((section) => (
              <div key={section.name} className="flex flex-col bg-white rounded-2xl shadow-xl">
                <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                  <div className="flex absolute top-0 p-5 align-center bg-blue-700 rounded-xl shadow-lg transform -translate-y-1/2 h-16 w-16">
                    <section.icon className="w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">{section.name}</h3>
                  <p className="mt-4 text-base text-gray-500">{section.description}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                  <Link href={section.link} className="text-base font-medium text-blue-700 hover:text-blue-600">
                    {section.cta}
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

function Docs() {
  return (
    <Layout
      title="Welcome to the DevCycle Best Practice Guides"
      description="Find answers to all your DevCycle implementation questions, and learn more about how to start using our management dashboard, APIs, SDKs, and more."
    >
      <Welcome />
    </Layout>
  );
}

export default Docs;
