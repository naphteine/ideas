import Container from "./container";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-10 flex flex-col items-center">
          Generated using Next.js, Markdown and ❤️.
          <a href="https://gokaygultekin.dev">GG</a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
