import PageHead from '../components/PageHead.jsx';
import { asset } from '../data/site.js';
import { useSiteContent } from '../hooks/useSiteContent.js';

const blogPostMeta = [
  {
    image: 'testimonial-quiet.png',
    href: 'https://instagram.com/lumineclub_',
  },
  {
    image: 'photo-luna-outdoor.png',
    href: 'https://instagram.com/lumineclub_',
  },
  {
    image: 'photo-meditation.png',
    href: 'https://tiktok.com/@ilumine.luna',
  },
  {
    image: 'photo-vivencia.png',
    href: 'https://www.youtube.com/@lunabmachado',
  },
  {
    image: 'photo-retiro.png',
    href: 'https://instagram.com/lumineclub_',
  },
  {
    image: 'testimonial-art.png',
    href: 'https://tiktok.com/@ilumine.luna',
  },
];

export default function Conteudo() {
  const { blog } = useSiteContent();
  const blogPosts = blog.posts.map((post, index) => ({
    ...blogPostMeta[index % blogPostMeta.length],
    ...post,
  }));

  return (
    <main className="content-page blog-page refined-page">
      <PageHead className="black clean-head content-refined-head" title={blog.hero.title}>
        {blog.hero.body}
      </PageHead>

      <section className="blog-shell">
        <header className="blog-shell-head">
          <p>{blog.sectionLabel}</p>
          <h2>{blog.sectionTitle}</h2>
        </header>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <a key={post.title} className="blog-card" href={post.href} target="_blank" rel="noreferrer">
              <img src={asset(post.image)} alt="" />
              <div className="blog-card-copy">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span>{blog.cta}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
