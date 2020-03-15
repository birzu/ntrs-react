import React from 'react';
import mapboxgl from 'mapbox-gl';

// IMPORTANT (this component requires the _mapboxgl.scss file to load)
import '../../sass/vendor/_mapboxgl.external.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

class TourMapBox extends React.Component {
  mapContainer = React.createRef();

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/subashmp/ck7sagtnj1o951iqr5h6w7al8',
      scrollZoom: false,
      zoom: 3
    });
  }

  render() {
    return (
      <section className="section-tour-mapbox">
        <div ref={this.mapContainer} className="tour-map-container"></div>
      </section>
    );
  }
}

export default TourMapBox;
