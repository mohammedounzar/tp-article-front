import React, { useState } from 'react';
import { Search, Trash2, Edit } from 'lucide-react';

const ArticleManager = () => {
  // Sample initial data
  const initialArticles = [
    { id: 1, titre: "First Article", contenu: "This is the first article content" },
    { id: 2, titre: "Second Article", contenu: "This is the second article content" },
    { id: 3, titre: "Third Article", contenu: "This is the third article content" },
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);

  // Filter articles based on search term
  const filteredArticles = articles.filter(article =>
    article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.contenu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const handleUpdate = (article) => {
    setEditingArticle(article);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setArticles(articles.map(article =>
      article.id === editingArticle.id ? editingArticle : article
    ));
    setEditingArticle(null);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Articles Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArticles.map(article => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.titre}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{article.contenu}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(article)}
                        className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="inline-flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editingArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <input
                  value={editingArticle.titre}
                  onChange={(e) => setEditingArticle({
                    ...editingArticle,
                    titre: e.target.value
                  })}
                  placeholder="Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  value={editingArticle.contenu}
                  onChange={(e) => setEditingArticle({
                    ...editingArticle,
                    contenu: e.target.value
                  })}
                  placeholder="Content"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingArticle(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleManager;