function VideoSection() {
  return (
    <section className="no-top no-bottom section-dark" aria-label="section">
      <a className="d-block hover popup-youtube" href="https://www.youtube.com/watch?v=C6rf51uHWJg">
        <div className="relative overflow-hidden">
          <div className="absolute start-0 w-100 abs-middle fs-36 text-white text-center z-2">
            <div className="player">
              <span />
            </div>
          </div>
          <div className="absolute w-100 h-100 top-0 bg-dark hover-op-05" />
          <img src="/images/background/2.webp" className="img-fluid" alt="Hotel preview" />
        </div>
      </a>
    </section>
  );
}

export default VideoSection;
