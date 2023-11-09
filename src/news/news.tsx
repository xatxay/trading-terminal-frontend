import "../news/newsContainer.css";
import bluelock from "./bluelock.jpg";

function NewsHeadline() {
  return (
    <div className="news-container">
      <img src={bluelock} alt="News" className="news-image" />
      <div className="news-text">
        <p className="news-headline">News article headlines</p>
        <p className="news-body">
          SCOOP: Crypto exchange @krakenfx is considering bids to build its own
          layer-2 blockchain, in talks with @0xPolygonLabs, @the_matter_labs
          @nil_foundation, sources tell @cryptauxmargaux
        </p>
      </div>
    </div>
  );
}

export default NewsHeadline;
