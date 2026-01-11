import TopBar from "../components/TopBar";

export default function LandingPage() {
  return (
    <>
      <TopBar />

      {/* HERO SECTION */}
      <section className="px-16 py-28 bg-gradient-to-br from-indigo-50 to-blue-500">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

          {/* TEXT */}
          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              AI-Powered Assignment <br /> Evaluation Platform
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Smarter learning. Faster evaluation. Transparent academic insights
              for modern education systems.
            </p>

            <p className="text-gray-500 text-sm">
              Trusted by students, faculty & institutions.
            </p>
          </div>

          {/* IMAGE */}
          <img
            src="https://img.freepik.com/free-vector/online-education-concept_52683-37480.jpg"
            alt="Education AI"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-14 bg-py-24 #2c3e50">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why EduAI?
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          <Feature
            title="AI Evaluation"
            desc="Instant scoring, feedback, and plagiarism insights."
          />
          <Feature
            title="Faculty Control"
            desc="Override grades, add remarks, manage submissions."
          />
          <Feature
            title="Academic Analytics"
            desc="Track performance by subject, year & department."
          />
        </div>
      </section>

      {/* USE CASES */}
      <section className="px-14 py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-4xl font-bold text-center mb-16">
          Built for Everyone in Education
        </h3>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

          <UseCard
            img="https://t3.ftcdn.net/jpg/09/74/15/92/240_F_974159215_0oTA1yTHG8aVVjNyhsh1lgGHtHzrUhqw.jpg"
            title="Students"
            points={[
              "Upload assignments (PDF, JPG, TXT)",
              "Instant AI feedback & scores",
              "Track progress across semesters"
            ]}
          />

          <UseCard
            img="https://www.whu.edu/fileadmin/_processed_/7/6/csm_2_Header_5c31248a9a.jpg"
            title="Faculty"
            points={[
              "Review student submissions",
              "Override AI grades & remarks",
              "Department & year-wise analytics"
            ]}
          />

          <UseCard
            img="https://oeshighschool.b-cdn.net/wp-content/uploads/2021/12/Dec-Blog-Post-2.png"
            title="Institutions"
            points={[
              "Standardized evaluation",
              "Academic performance insights",
              "Scalable AI-powered assessment"
            ]}
          />
        </div>
      </section>

      {/* QUOTES / TRUST */}
      <section className="px-14 py-24 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">
          What Educators Say
        </h3>

        <div className="max-w-4xl mx-auto text-center italic text-gray-600">
          “EduAI reduces evaluation time by over 60% while improving
          transparency and academic quality.”
          <p className="mt-4 font-semibold text-gray-800">
            — University Faculty Member
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 px-14 py-16">
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          
          <div>
            <h4 className="text-xl font-bold text-white mb-4">EduAI</h4>
            <p className="text-sm">
              AI-powered academic evaluation platform for modern education.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>Assignments</li>
              <li>Analytics</li>
              <li>Faculty Tools</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm mt-10 text-gray-500">
          © 2026 EduAI. All rights reserved.
        </p>
      </footer>
    </>
  );
}

/* ---------- Helpers ---------- */

function Feature({ title, desc }) {
  return (
    <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function UseCard({ img, title, points }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img src={img} alt={title} className="h-48 w-full object-cover" />
      <div className="p-6">
        <h4 className="text-xl font-bold mb-4">{title}</h4>
        <ul className="space-y-2 text-gray-600 text-sm">
          {points.map((p, i) => (
            <li key={i}>• {p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
