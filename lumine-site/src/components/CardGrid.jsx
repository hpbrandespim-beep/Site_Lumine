import { Link } from 'react-router-dom';

export default function CardGrid({ className = '', items }) {
  return (
    <section className={`cards ${className}`}>
      {items.map((item, index) => {
        const content = (
          <>
            {item.image && <img src={item.image} alt={item.alt} />}
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </>
        );

        return item.href.startsWith('/') ? (
          <Link key={`${item.href}-${index}`} to={item.href}>{content}</Link>
        ) : (
          <a key={`${item.href}-${index}`} href={item.href}>{content}</a>
        );
      })}
    </section>
  );
}
