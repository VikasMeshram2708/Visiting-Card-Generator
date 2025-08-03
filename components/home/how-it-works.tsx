export default function HowItWorks() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-indigo-200 text-center max-w-2xl mx-auto mb-16">
          Get professional visiting cards in just three simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-indigo-50 p-8 rounded-2xl">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-indigo-600">1</span>
            </div>
            <h3 className="text-xl font-bold text-indigo-900 mb-3">
              Describe Your Card
            </h3>
            <p className="text-gray-700">
              Tell our AI about your profession, style preferences, and
              information you want to include.
            </p>
          </div>

          <div className="bg-indigo-50 p-8 rounded-2xl">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-indigo-600">2</span>
            </div>
            <h3 className="text-xl font-bold text-indigo-900 mb-3">
              Customize the Design
            </h3>
            <p className="text-gray-700">
              Review the AI-generated designs and make any adjustments with our
              easy-to-use editor.
            </p>
          </div>

          <div className="bg-indigo-50 p-8 rounded-2xl">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl font-bold text-indigo-600">3</span>
            </div>
            <h3 className="text-xl font-bold text-indigo-900 mb-3">
              Order Prints
            </h3>
            <p className="text-gray-700">
              Choose your paper quality and quantity, then get your cards
              delivered to your door.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
