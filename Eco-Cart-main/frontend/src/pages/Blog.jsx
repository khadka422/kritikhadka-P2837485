import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Leaf,
  Zap,
  TrendingUp,
  Recycle,
} from "lucide-react";
import Navbar from "../components/home/Navbar.jsx";
import Footer from "../components/home/Footer.jsx";

function Blog() {
  const posts = [
    {
      id: 1,
      title: "Understanding Your Carbon Footprint in Online Shopping",
      excerpt:
        "How shipping, packaging, and product choices affect your environmental impact.",
      category: "Sustainability",
      author: "EcoCart Team",
      date: "Jan 15, 2026",
      readTime: "5 min read",
      icon: Leaf,
      color: "from-green-800 to-green-600",
    },
    {
      id: 2,
      title: "The Future of Green E-Commerce in 2026",
      excerpt:
        "Emerging trends in sustainable shopping and what they mean for consumers.",
      category: "Trends",
      author: "Market Insights",
      date: "Jan 10, 2026",
      readTime: "7 min read",
      icon: TrendingUp,
      color: "from-emerald-800 to-emerald-600",
    },
    {
      id: 3,
      title: "AI-Powered Sustainable Shopping",
      excerpt:
        "How artificial intelligence helps identify eco-friendly alternatives.",
      category: "Technology",
      author: "Tech Team",
      date: "Jan 5, 2026",
      readTime: "6 min read",
      icon: Zap,
      color: "from-teal-800 to-teal-600",
    },
    {
      id: 4,
      title: "Circular Economy Made Simple",
      excerpt:
        "Practical ways to participate in sustainable consumption models.",
      category: "Education",
      author: "Sustainability Experts",
      date: "Dec 28, 2025",
      readTime: "8 min read",
      icon: Recycle,
      color: "from-green-700 to-teal-600",
    },
    {
      id: 5,
      title: "Spotting Greenwashing vs. Genuine Sustainability",
      excerpt:
        "Learn to identify authentic eco-friendly brands versus marketing tactics.",
      category: "Tips",
      author: "Consumer Advocacy",
      date: "Dec 20, 2025",
      readTime: "6 min read",
      icon: Leaf,
      color: "from-green-800 to-emerald-600",
    },
    {
      id: 6,
      title: "Sustainable Packaging Innovations",
      excerpt: "New materials and designs reducing waste in e-commerce.",
      category: "Innovation",
      author: "Design Team",
      date: "Dec 15, 2025",
      readTime: "5 min read",
      icon: Recycle,
      color: "from-teal-800 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-green-800/10">
      <Navbar />
      {/* Hero Section */}
      <section className="px-24 py-16">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-2xl bg-green-900/15 w-fit">
            <Leaf className="w-4 h-4" />
            <span>Insights & Education</span>
          </div>
          <h1 className="text-5xl font-semibold font-serif">
            EcoCart{" "}
            <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
              Blog
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl">
            Stay informed with the latest insights on sustainable living,
            eco-friendly shopping, and environmental innovation.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-24 mb-16">
        <div className="bg-linear-to-r from-green-800 to-green-600 rounded-2xl p-8 text-white">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
                Featured
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Jan 20, 2026</span>
              </div>
            </div>
            <h2 className="text-3xl font-semibold font-serif mb-4">
              How EcoCart Calculates Environmental Impact Scores
            </h2>
            <p className="text-green-100 mb-6">
              A deep dive into our methodology for assessing product
              sustainability, from carbon emissions to ethical sourcing. Learn
              how we make complex environmental data simple and actionable.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>EcoCart Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>8 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-24 pb-16">
        <h2 className="text-3xl font-semibold font-serif mb-8">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-green-800/10 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Category Header */}
              <div className={`p-4 bg-linear-to-r ${post.color}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <post.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold font-serif mb-3 hover:text-green-700 cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-linear-to-r from-green-800/10 to-green-600/10 rounded-2xl p-8 text-center border border-green-800/20">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold font-serif mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for weekly insights on sustainable
              living, eco-friendly products, and green technology trends.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-xl border border-green-800/20 focus:outline-none focus:ring-2 focus:ring-green-800/30"
              />
              <button className="px-6 py-3 bg-linear-to-r from-green-800 to-green-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Blog;
