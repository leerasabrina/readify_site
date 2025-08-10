import  { useState } from "react";
import './page.css'

const fallbackPosts = [
  {
    _id: "1",
    title: "How to Finish Books Faster",
    excerpt: "Small habits that help you read more consistently and finish books without losing interest.",
    cover_photo: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1000&q=80",
    url: "https://www.wikihow.com/Read-Faster"
  },
  {
    _id: "2",
    title: "Build a Daily Reading Habit",
    excerpt: "Simple steps to add reading to your daily routine — even if you're busy.This habit is essential for improvement.",
    cover_photo: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1000&q=80",
    url: "https://medium.com/the-ascent/how-to-develop-a-reading-habit-88c31460d7ff"
  },
  {
    _id: "3",
    title: "Best Skimming Techniques",
    excerpt: "Learn how to skim effectively so you can quickly find the ideas that matter.",
    cover_photo: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&q=80",
    url: "https://www.reddit.com/r/GradSchool/comments/19c4rov/best_methods_for_skimming_articles"
  },
  {
  _id: "4",
  title: "5 Tips to Improve Reading Focus",
  excerpt: "Learn simple techniques to minimize distractions and increase your reading concentration.",
  cover_photo: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1000&q=80",
  url: "https://www.waterford.org/blog/tips-to-improve-reading-skills"
}
];

const NewBooks = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Reading Tips & Highlights</h2>
        <p className="text-center text-gray-500">Loading articles...</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Reading Tips & Highlights</h2>
     

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        { fallbackPosts.map((post) => (
          <article
            key={post._id}
            className="bg-base-100 border border-base-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-250 p-4"
          >
            <a href={post.url || "#"} target="_blank" className="block">
              <div className="h-32 w-full overflow-hidden">
                <img
                  src={post.cover_photo}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </a>

            <div className="p-4">
              <h3 className=" font-semibold mb-2">
                <a href={post.url || "#"} className="hover:underline">
                  {post.title}
                </a>
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>

              <div className="mt-4 flex items-center justify-between">
                <a
                  href={post.url || "#"}
                  target="_blank"
                  className="text-sm custom-link  btn  p-2"
                >
                  Read more
                </a>
                <span className="text-xs text-gray-400">{/* optional meta (e.g. 3 min read) */}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewBooks;
