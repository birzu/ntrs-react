import React from 'react';
import mapboxgl from 'mapbox-gl';

// IMPORTANT (this component requires the _mapboxgl.scss file to load)
import '../../sass/vendor/_mapboxgl.external.scss';
/**
 * IMPORTANT
 * The node that holds the map need to have inline styles { position: absolute, top: 0, left: 0, right: 0, bottom: 0}
 * to work properly
 */

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
        <div
          ref={this.mapContainer}
          className="tour-map-container"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        ></div>
      </section>
    );
  }
}

export default TourMapBox;
