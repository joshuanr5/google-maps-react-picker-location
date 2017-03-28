import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if(JSON.stringify(prevProps.pos) !== JSON.stringify(this.props.pos)) {
            this.loadMap();
        }
    }

    loadMap() {
        if(this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            let zoom = 14;            
            if(this.map) {
                zoom = this.map.zoom;
            }
            
            
            const { lat, lng } = this.props.pos;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            });
            this.map = new maps.Map(node, mapConfig);

            this.map.addListener('dragend', e => {
                this.props.onDragend(this.map);
            })
        }
    }

    render() {
        const style = {
            width: '500px',
            height: '500px'
        }
        return (
            <div ref='map' style={style}>
                Loading map...
            </div>
        );

    }
}

export default Map;