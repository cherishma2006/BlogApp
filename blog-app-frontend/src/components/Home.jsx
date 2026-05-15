import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/user-api/articles`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setArticles((res.data.payload || []).slice(0, 4));
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const openArticle = (article) => {
    if (!article?._id) return;
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const goToAllArticles = () => {
    navigate("/user-profile");
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 py-10">Loading...</p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-10">{error}</p>
    );

  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-200 via-orange-200 to-sky-200">

    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* HERO */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-pink-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
            MyBlog
          </span>
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto">
          Discover insightful articles on technology, programming, AI, and more.
        </p>

        <button
          onClick={goToAllArticles}
          className="mt-6 bg-gradient-to-r from-pink-300 via-orange-300 to-sky-300 text-gray-800 px-6 py-2 rounded-full hover:scale-105 transition duration-300 shadow-md hover:shadow-lg"
        >
          Explore Articles
        </button>
      </div>

      {/* ARTICLES */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Latest Articles
          </h2>

          <button
            onClick={goToAllArticles}
            className="text-sm text-pink-500 hover:text-orange-400 transition"
          >
            View All →
          </button>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">📭 No articles yet</p>
            <p className="text-sm">Be the first to explore content</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {articles.map((article) => (
              <div
                key={article._id}
                className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-5 border border-pink-100 hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">

                  {/* CATEGORY */}
                  <p className="text-xs text-orange-400 mb-1 capitalize font-medium">
                    {article.category}
                  </p>

                  {/* TITLE */}
                  <p className="text-lg font-semibold text-gray-800 hover:text-pink-500 transition">
                    {article.title}
                  </p>

                  {/* CONTENT */}
                  <p className="text-sm text-gray-500 mt-2">
                    {article.content?.slice(0, 80) || "No content"}...
                  </p>

                  {/* ACTION */}
                  <button
                    className="text-sky-500 hover:text-pink-500 text-sm font-medium mt-auto pt-4 transition"
                    onClick={() => openArticle(article)}
                  >
                    Read →
                  </button>

                </div>
              </div>
        
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;